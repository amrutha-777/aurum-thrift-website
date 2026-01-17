# API Design (HLD)

Note: Example REST endpoints for MVP. Auth via Bearer ID token. All `*_id` are server-assigned.

## Users
- **POST /v1/users** — Create user (if not via Auth provider)
  - Request: `{ "displayName": "Jane", "email": "jane@example.com" }`
  - Response: `{ "id": "u_123", "displayName": "Jane", "email": "jane@example.com" }`
- **GET /v1/users/{userId}** — Fetch profile
  - Response: `{ "id": "u_123", "displayName": "Jane", "bio": "...", "badges": [] }`
- **PATCH /v1/users/{userId}** — Update profile
  - Request: `{ "bio": "Upcycling enthusiast", "avatarUrl": "https://..." }`

## Products
- **POST /v1/products** — Create listing
  - Request: `{ "title": "Vintage Jacket", "description": "...", "category": "clothing", "condition": "good", "price": { "amount": 45, "currency": "USD" }, "tags": ["vintage","leather"] }`
  - Response: `{ "id": "p_101", "sellerId": "u_123", "status": "listed" }`
- **GET /v1/products** — List products (filters)
  - Query: `?category=clothing&condition=good&designerAvailable=true&storyType=nostalgic`
  - Response: `{ "items": [{ "id": "p_101", "title": "Vintage Jacket" }], "page": 1, "pageSize": 20 }`
- **GET /v1/products/{productId}** — Product detail
  - Response: `{ "id": "p_101", "title": "Vintage Jacket", "images": ["https://..."], "storyId": "s_5" }`
- **PATCH /v1/products/{productId}** — Update listing
  - Request: `{ "status": "sold" }`

## Stories
- **POST /v1/products/{productId}/stories** — Create/attach story to product
  - Request: `{ "type": "nostalgic", "content": "Worn at my first concert..." }`
  - Response: `{ "id": "s_5", "productId": "p_101" }`
- **POST /v1/stories/{storyId}/comments** — Comment on story
  - Request: `{ "content": "Love this!" }`
  - Response: `{ "id": "c_22", "storyId": "s_5", "authorId": "u_456" }`
- **POST /v1/stories/{storyId}/save** — Save story
  - Response: `{ "saved": true, "savesCount": 12 }`

## Designers & Customizations
- **GET /v1/designers/{designerId}** — Designer profile
  - Response: `{ "id": "d_9", "userId": "u_789", "skills": ["embroidery","patchwork"], "availability": "open" }`
- **POST /v1/customizations** — Create customization request
  - Request: `{ "requesterId": "u_123", "designerId": "d_9", "brief": "Add gold thread patches", "referenceImages": ["https://..."] }`
  - Response: `{ "id": "cr_33", "status": "requested" }`
- **PATCH /v1/customizations/{requestId}** — Update status
  - Request: `{ "status": "accepted", "priceQuote": { "amount": 60, "currency": "USD" } }`

## Timeline
- **GET /v1/products/{productId}/timeline** — Product lifecycle events
  - Response: `{ "productId": "p_101", "events": [{ "type": "listed", "occurredAt": "2026-01-10T12:00:00Z" }] }`
- **POST /v1/timeline/events** — Append event (internal/admin)
  - Request: `{ "productId": "p_101", "type": "redesigned", "details": { "designerId": "d_9" } }`
