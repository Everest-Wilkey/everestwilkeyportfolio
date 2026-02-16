# Full Portfolio Site — Data Model

**Spec**: spec.md
**Date**: 2026-02-09

---

## Entities

### Project

Represents a portfolio project displayed in the Projects section.
Stored as static content files (MDX or JSON).

| Field              | Type       | Required | Notes                                   |
|--------------------|------------|----------|-----------------------------------------|
| title              | string     | Yes      | Display name of the project             |
| slug               | string     | Yes      | URL-safe unique identifier              |
| description        | string     | Yes      | Short summary for card view (≤160 chars)|
| detailedDescription| string     | Yes      | Full description for detail page (MDX)  |
| thumbnail          | ImageAsset | Yes      | Card image (optimized via next/image)   |
| role               | string     | Yes      | Developer's role in the project         |
| challenges         | string     | Yes      | Key challenges faced                    |
| outcomes           | string     | Yes      | Results and impact                      |
| tags               | string[]   | Yes      | Technology tags for filtering           |
| liveUrl            | string     | No       | URL to live deployed project            |
| sourceUrl          | string     | No       | URL to source code repository           |
| featured           | boolean    | Yes      | Whether to highlight this project       |
| displayOrder       | number     | Yes      | Sort order in the grid (ascending)      |

**Identity**: `slug` (unique, used in route `/projects/[slug]`)
**Validation**:
- `slug` must match `/^[a-z0-9-]+$/`
- `description` must be ≤160 characters
- `tags` must contain ≥1 item
- `displayOrder` must be a positive integer

### Skill

Represents a technology or skill displayed in the About section.

| Field           | Type     | Required | Notes                           |
|-----------------|----------|----------|---------------------------------|
| name            | string   | Yes      | Skill display name              |
| category        | enum     | Yes      | Frontend, Backend, Framework, Database, DevOps|

**Identity**: `name` (unique within category)
**Validation**:
- `category` must be one of the defined enum values

### ContactSubmission

Represents a message sent through the contact form. Handled
server-side via Next.js API route → Resend.

| Field          | Type     | Required | Notes                          |
|----------------|----------|----------|--------------------------------|
| senderName     | string   | Yes      | Visitor's name                 |
| senderEmail    | string   | Yes      | Visitor's email address        |
| message        | string   | Yes      | Message body                   |
| turnstileToken | string   | Yes      | Cloudflare Turnstile response  |
| timestamp      | datetime | Auto     | Server-generated on receipt    |
| deliveryStatus | enum     | Auto     | pending, sent, failed          |

**Identity**: Not persisted — fire-and-forget via Resend API.
**Validation**:
- `senderName` must be 1-100 characters
- `senderEmail` must be valid email format
- `message` must be 1-2000 characters
- `turnstileToken` must be verified server-side via Turnstile
  API before processing

**State transitions**:
```
pending → sent     (Resend API returns success)
pending → failed   (Resend API returns error or timeout)
```

### SiteMetadata

Per-page metadata for SEO and social sharing. Defined in page
layouts and generated at build time.

| Field          | Type     | Required | Notes                          |
|----------------|----------|----------|--------------------------------|
| title          | string   | Yes      | Page title (≤60 chars)         |
| description    | string   | Yes      | Meta description (≤160 chars)  |
| ogImage        | string   | Yes      | Open Graph image URL           |
| canonicalUrl   | string   | Yes      | Canonical page URL             |
| structuredData | object   | No       | JSON-LD (Person, Portfolio)    |

**Identity**: One per route (defined in page metadata exports).

---

## Relationships

```
Project ──has many──▸ Skill (via tags[] matching skill names)
SiteMetadata ──one per──▸ Route (/, /projects/[slug])
ContactSubmission ──standalone──▸ (no relationships)
```

---

## Data Storage Strategy

| Entity            | Storage         | Access Pattern              |
|-------------------|-----------------|-----------------------------|
| Project           | `/content/projects/*.mdx` or `data/projects.json` | Build-time SSG via `generateStaticParams` |
| Skill             | `data/skills.json`       | Build-time, imported directly |
| ContactSubmission | Not persisted (Resend API) | Runtime POST to API route  |
| SiteMetadata      | Page-level `metadata` exports | Build-time Next.js metadata API |
