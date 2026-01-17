# AURUM – Low-Level Design (LLD)

## Project Overview
AURUM is a low-level design (LLD) focused project for a story-driven thrift e-commerce platform.  
The objective of this project is to design detailed backend entities, relationships, and workflows that support storytelling, designer customization, and product lifecycle tracking in a thrift marketplace.

This repository contains **only low-level design artifacts**.  
No high-level system design (HLD), frontend, or full backend implementation is included.

---

## Problem Context
Most thrift platforms focus on basic product listings and transactions. They do not model:
- Story-based metadata as a first-class entity
- Designer customization workflows
- Product lifecycle events beyond resale

AURUM addresses these gaps strictly at the **low-level design layer**.

---

## Low-Level Design Scope

### Core Entities

#### User
- userId
- role (buyer / seller / designer)
- profile
- rating

#### Product
- productId
- sellerId
- condition
- price
- availability
- storyId
- timelineId

#### Story
- storyId
- productId
- content
- storyType
- engagementMetrics

#### CustomizationRequest
- requestId
- productId
- designerId
- status
- quotedPrice

#### TimelineEvent
- eventId
- productId
- eventType
- timestamp

---

## Key Workflows

### Product Listing Flow
A seller creates a product listing, optionally attaches a story, and a timeline entry is created to track the product lifecycle.

### Designer Customization Flow
A customization request is created, accepted by a designer, processed through redesign stages, and completed with reviews and rating updates.

### Story Engagement Flow
Users can save or comment on stories independently of product purchases, enabling content-driven engagement.

---

## Design Considerations
- Clear separation of responsibilities at the entity level
- State-based handling of customization requests
- Independent lifecycle tracking for products
- Extensible data models for future features

---

## Aurum Diagrams (LLD-Only)

Basic, unique Mermaid sources created for review and PNG export.

### Files
- `class-diagram.mmd` – Entity relationships and key fields
- `sequence-diagram.mmd` – Designer customization request flow

---

### Quick Preview (No Installation Required)
1. Open https://mermaid.live  
2. Paste the contents of each `.mmd` file
3. Preview the diagram
4. Export as PNG or JPG from the UI

---

### VS Code Preview (Optional)
- Install **Markdown Preview Mermaid Support** or any Mermaid extension
- Create a Markdown wrapper
- Embed Mermaid code blocks to preview diagrams locally

---

### PNG Export via Mermaid CLI (Windows)

1. Install Node.js (if not already installed)
2. Install Mermaid CLI:
   ```powershell
   npm install -g @mermaid-js/mermaid-cli
