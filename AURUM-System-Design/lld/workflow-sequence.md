# Workflow Sequences (LLD)

Precise flows with validations, state changes, and side effects.

## Product Listing Flow
1. **Preconditions:** User authenticated; account not restricted; email verified.
2. **Create draft:** `POST /products` with title, description, category, condition, price → status `listed`.
3. **Upload media:** Client uploads images to Storage (pre-signed or SDK). Server validates type/size; stores URLs.
4. **Optional story:** `POST /products/{id}/stories` to attach narrative. Update `product.storyId` and `Story.counters`.
5. **Timeline:** Append `TimelineEvent { type: 'listed', occurredAt }`.
6. **Validation:**
   - Title length ≤ 120; description ≤ 5000; images ≤ 10.
   - `price.amount > 0` and currency supported.
   - `condition` in allowed enum.
7. **Errors:** Return field-specific messages; do not create timeline on failure.

## Designer Customization Flow
1. **Request create:** Requester submits `CustomizationRequest` with `designerId`, `brief`, optional `productId`.
2. **Notify designer:** (Future) Send email/push. Ensure designer `availability != 'closed'`.
3. **Designer decision:**
   - Accept → status `accepted`; set `priceQuote` and proposed `deadlines.proposedDue`.
   - Decline → status `declined`; optional reason.
4. **Start work:** On acceptance, transition to `in_progress`.
   - Exchange messages; upload WIP media to `deliverables` or `portfolio`.
5. **Complete:** Designer submits final deliverables; status `completed`; set `finalPrice`.
6. **Timeline:** If `productId` present, append `TimelineEvent { type: 'redesigned', details: { designerId } }`.
7. **Validation:**
   - Only `designer` can accept/decline.
   - `finalPrice.amount >= priceQuote.amount` or within agreed bounds.
   - Immutable audit: record status transitions with timestamps.

## Story Engagement Flow
1. **Create story:** Seller or permitted user creates `Story` with `type` and `content` → link to product.
2. **Comment:** Authenticated user posts comment → increment `commentsCount` atomically.
3. **Save/Unsave story:** Toggle save → update `savesCount` and `User.savedStoryIds`.
4. **Moderation:** If story or comment reported, flag for review; optionally set `isDeleted`.
5. **Rate limits:** Per-user write limits (e.g., comments/minute) to prevent spam.
6. **Validation:** Sanitization of content; attachments must be allowed MIME types.

## State Machines
- **Product.status:**
  - `listed` → `reserved` → `sold` → `archived`
  - Allowed: `listed` → `archived`; `reserved` → `listed` (timeout/cancel)
- **CustomizationRequest.status:**
  - `requested` → `accepted` → `in_progress` → `completed`
  - `requested` → `declined`
  - `accepted` → `canceled` (by requester or system)
- **Story.lifecycle:** Active or soft-deleted; counters maintained regardless of visibility for audit.

## Error Handling & Idempotency
- Duplicate uploads: detect by content hash and reuse existing URL.
- Retries on create endpoints: client supplies idempotency key; server ensures single write.
- Partial failures: validate all fields and return per-field errors; avoid side effects unless transaction succeeds.
