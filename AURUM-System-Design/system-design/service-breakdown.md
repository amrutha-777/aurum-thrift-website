# Service Breakdown (HLD)

## User Service
- **Responsibilities:** Authentication, profile management, roles (user/designer/admin), saved stories.
- **Data Model (summary):** `User { id, displayName, email, roles[], bio, avatarUrl, badges[], savedStoryIds[] }`
- **Key Operations:** Register/Login, Get/Update profile, Save/Unsave story, List user activity.
- **Dependencies:** Auth provider, Firestore (users, saved stories).
- **Scaling Notes:** Cache popular profiles; paginate activity; soft-delete.

## Product Service
- **Responsibilities:** Create/update/list/delete products, images, availability, pricing.
- **Data Model (summary):** `Product { id, sellerId, title, description, category, condition, price, images[], status, tags[], storyId?, timelineIds[] }`
- **Key Operations:** Create listing, Upload images, Update status (listed/sold), Filtered search.
- **Dependencies:** Storage for images, Firestore (products), Timeline Service.
- **Scaling Notes:** Media CDN, pre-signed URLs, indexed queries, background image processing.

## Story Service
- **Responsibilities:** Attach stories to products, comments, saves, moderation.
- **Data Model (summary):** `Story { id, productId, authorId, type, content, attachments[], commentsCount, savesCount }`
- **Key Operations:** Create/Update story, Comment, Save, List by product or author.
- **Dependencies:** Firestore (stories, comments), Auth, Notifications (future).
- **Scaling Notes:** Batched counters, rate limits, spam/malicious content filters.

## Designer Service
- **Responsibilities:** Designer profiles, portfolio, availability, customization request lifecycle, reviews/badges.
- **Data Model (summary):** `Designer { id, userId, skills[], portfolio[], availability, rating, badges[] }`
- **Key Operations:** Update availability, Manage portfolio, Accept customization requests, Complete redesigns.
- **Dependencies:** Firestore (designers, requests), Storage (portfolio assets), Payments (future).
- **Scaling Notes:** Queue requests; cap concurrent jobs; badge computation offline.

## Timeline Service
- **Responsibilities:** Append-only product lifecycle events to build trust.
- **Data Model (summary):** `TimelineEvent { id, productId, type, occurredAt, actorId, details }`
- **Key Operations:** Create events (acquired/used/listed/redesigned/sold), Query timeline.
- **Dependencies:** Firestore (timeline), Product Service.
- **Scaling Notes:** Write-heavy friendly; archive old events; precompute summaries.
