# Aurum System Architecture (HLD)

## Problem & Motivation
Most thrift platforms are transactional: list → buy → ship. They miss the emotional value of items and provide no creative space for designers to customize or reuse second-hand goods. Aurum addresses this by blending commerce with storytelling and a designer customization forum to build trust, community, and sustainability.

## Architecture Style
- **MVP approach:** React SPA + serverless backend (Firebase Auth, Firestore, Storage, optional Cloud Functions) for rapid iteration and low ops.
- **Module boundaries:** Clear service boundaries (User, Product, Story, Designer, Timeline) inside a modular monolith/serverless model.
- **Future-ready:** Gradual path to microservices (containerized services behind an API gateway) when traffic and feature complexity grow.

## High-Level Components
- **Client (Web SPA):** React (Vite) frontend that handles navigation, forms, media uploads, and rendering stories/products.
- **Auth:** Firebase Auth (email/password, OAuth providers) issuing ID tokens consumed by the API/services.
- **API Layer:** Cloud Functions or Node/Express service exposing REST endpoints, performing validation, authorization, and orchestration.
- **Core Services:**
  - User Service: profiles, roles, saved stories.
  - Product Service: listings, images, inventory state.
  - Story Service: product stories, comments, saves.
  - Designer Service: profiles, portfolio, customization requests.
  - Timeline Service: lifecycle events for trust/transparency.
- **Data Stores:**
  - Firestore: document storage for users, products, stories, designers, timelines, customization requests.
  - Firebase Storage (or S3): product images, redesign media, attachments.
  - Cache/Index (future): Redis/Elasticsearch for search, counters, and feeds.
- **Notifications (future):** Email/push for comments, request status changes, and order updates.

## Data Flow Summary
1. Client authenticates → receives ID token.
2. Client calls REST endpoints → API validates auth/roles.
3. Services persist/query Firestore; media goes to Storage.
4. Side effects: create `TimelineEvent` for trust; update counters (comments/saves) using transactional or batched writes.

## Key Design Decisions
- **Serverless-first:** Minimizes ops and accelerates delivery.
- **Document models:** Fit well with product/story content and flexible evolution.
- **Idempotent writes:** For uploads and repeated actions.
- **Soft deletes:** Preserve auditability and prevent accidental loss.
- **Event tracking:** `TimelineEvent` as append-only history for each product.

## Scalability & Future Scope
- **Scale reads/writes:** Use collection sharding, composite indexes, pagination, and Cloud Functions for heavy tasks.
- **Search & discovery:** Add Elasticsearch or Algolia for designer availability, story type, and product filters.
- **Microservices path:** Split services behind an API gateway; add CI/CD, observability, and SLOs.
- **Payments:** Integrate Stripe for secure transactions and customization orders.
- **Recommendations & analytics:** Content + commerce signals (saves, comments, purchases) to guide users and empower designers.
