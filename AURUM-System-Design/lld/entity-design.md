# Entity Design (LLD)

Scope: Minimal yet precise definitions for MVP, optimized for Firestore-style document storage and clear relationships. Designer capability is modeled as part of `User`.

## User
- **Fields:**
  - `id: string`
  - `email: string` (unique)
  - `displayName: string`
  - `roles: string[]` (e.g., `user`, `designer`, `admin`)
  - `bio?: string`
  - `avatarUrl?: string`
  - `badges?: string[]`
  - `savedStoryIds?: string[]` (refs `Story.id`)
  - `designerProfile?: { skills: string[], availability: 'open'|'busy'|'closed', portfolio: { title: string, mediaUrl: string }[] }`
  - `createdAt: timestamp`
  - `updatedAt: timestamp`
  - `isDeleted: boolean` (soft delete)
- **Indexes:** `email`, `roles`, `designerProfile.availability`.
- **Constraints:** Unique `email`; `roles` contains known values; `savedStoryIds` must reference existing stories.

## Product
- **Fields:**
  - `id: string`
  - `sellerId: string` (ref `User.id`)
  - `title: string`
  - `description: string`
  - `category: string` (e.g., `clothing`, `accessories`)
  - `condition: 'new'|'excellent'|'good'|'fair'|'poor'`
  - `price: { amount: number, currency: string }`
  - `images: string[]` (URLs)
  - `status: 'listed'|'reserved'|'sold'|'archived'`
  - `tags?: string[]`
  - `storyId?: string` (ref `Story.id`)
  - `createdAt: timestamp`
  - `updatedAt: timestamp`
  - `isDeleted: boolean`
- **Indexes:** `category`, `condition`, `status`, `sellerId`, `tags`.
- **Constraints:** `price.amount > 0`; `images` length capped (e.g., ≤10);
  `status` transitions controlled by workflow.

## Story
- **Fields:**
  - `id: string`
  - `productId: string` (ref `Product.id`)
  - `authorId: string` (ref `User.id`)
  - `type: 'nostalgic'|'sentimental'|'practical'|'other'`
  - `content: string` (length limit, e.g., ≤5000 chars)
  - `attachments?: string[]` (URLs)
  - `commentsCount: number`
  - `savesCount: number`
  - `createdAt: timestamp`
  - `updatedAt: timestamp`
  - `isDeleted: boolean`
- **Indexes:** `productId`, `authorId`, `type`.
- **Constraints:** `productId` must exist; `authorId` must match product seller or be permitted; counters updated via batched writes.

## CustomizationRequest
- **Fields:**
  - `id: string`
  - `requesterId: string` (ref `User.id`)
  - `designerId: string` (ref `User.id`, with role `designer`)
  - `productId?: string` (ref `Product.id`, optional if request is generic)
  - `brief: string`
  - `referenceImages?: string[]`
  - `status: 'requested'|'accepted'|'in_progress'|'completed'|'declined'|'canceled'`
  - `priceQuote?: { amount: number, currency: string }`
  - `finalPrice?: { amount: number, currency: string }`
  - `messages?: { senderId: string, content: string, sentAt: timestamp }[]`
  - `deadlines?: { proposedDue: timestamp, finalDue?: timestamp }`
  - `deliverables?: { title: string, mediaUrl: string, notes?: string }[]`
  - `createdAt: timestamp`
  - `updatedAt: timestamp`
- **Indexes:** `designerId`, `requesterId`, `status`, `productId`.
- **Constraints:** Status machine enforced; `designerId` must be a designer; price numbers positive; immutable history tracked via timeline.

## TimelineEvent
- **Fields:**
  - `id: string`
  - `productId: string` (ref `Product.id`)
  - `type: 'acquired'|'used'|'listed'|'redesigned'|'sold'|'archived'`
  - `occurredAt: timestamp`
  - `actorId?: string` (ref `User.id`)
  - `details?: object` (e.g., `{ designerId, note }`)
- **Indexes:** `productId`, `occurredAt`, `type`.
- **Constraints:** Append-only; no updates (except moderation/admin fixes); use separate collection per product for high write throughput if needed.

## Relationships
- `User (seller)` 1..* → `Product`
- `Product` 0..1 → `Story`
- `User` 0..* ↔ `Story` (comments/saves)
- `User (designer)` 1..* ↔ `CustomizationRequest` (with `User (requester)`)
- `Product` 1..* → `TimelineEvent`

## Sample Shapes (JSON)
- **Product:**
```json
{
  "id": "p_101",
  "sellerId": "u_123",
  "title": "Vintage Jacket",
  "description": "Leather, size M",
  "category": "clothing",
  "condition": "good",
  "price": { "amount": 45, "currency": "USD" },
  "images": ["https://storage/.../p_101_1.jpg"],
  "status": "listed",
  "tags": ["vintage","leather"],
  "storyId": "s_5",
  "createdAt": "2026-01-10T12:00:00Z",
  "updatedAt": "2026-01-10T12:00:00Z",
  "isDeleted": false
}
```
- **CustomizationRequest:**
```json
{
  "id": "cr_33",
  "requesterId": "u_123",
  "designerId": "u_789",
  "productId": "p_101",
  "brief": "Add gold thread patches",
  "referenceImages": ["https://storage/.../ref1.jpg"],
  "status": "requested",
  "priceQuote": null,
  "finalPrice": null,
  "messages": [],
  "deadlines": { "proposedDue": "2026-02-01T00:00:00Z" },
  "deliverables": [],
  "createdAt": "2026-01-12T09:30:00Z",
  "updatedAt": "2026-01-12T09:30:00Z"
}
```

## Validation & Consistency Rules
- **Auth/roles:** Only `designer` can accept requests; only `seller` can list products.
- **State transitions:** Controlled via small state machines and validated server-side.
- **Counters:** `commentsCount`, `savesCount` updated via atomic increments/batched writes.
- **Soft delete:** Mark `isDeleted` instead of hard deletes; hide from queries by default.
- **Idempotency:** Use deterministic IDs for uploads; retries should not duplicate events.
