# Full Portfolio Site — Implementation Plan

**Feature Spec**: spec.md
**Author**: Everest Wilkey
**Date**: 2026-02-09
**Status**: Draft

---

## Overview

Build a complete personal portfolio website using Next.js 15 with
App Router, TypeScript 5, and React 19. The site uses a multi-page
architecture: a main landing page with scrollable sections (Hero,
About, Projects grid, Contact) and separate routed pages for
project detail views (`/projects/[slug]`). All content is
statically generated at build time for optimal performance.

**Cost constraint**: Every tool is free ($0/month), no credit
card required. Self-hosted on Proxmox LXC running Node.js
directly (full Next.js features). See research.md.

---

## Constitution Check

Before implementation, verify alignment with all 7 principles:

- [x] **Type Safety & Code Quality**: All code in strict
      TypeScript; no `any` types; ESLint + Prettier enforced
      via pre-commit hooks. Component props as named interfaces.
- [x] **Testing Discipline**: Vitest + RTL for unit/component
      tests (≥80% branch coverage); Playwright for E2E
      (cross-browser); co-located `*.test.tsx` files.
- [x] **Accessibility**: Semantic HTML throughout; skip-to-content
      link; keyboard navigation; WCAG 2.1 AA contrast; Lighthouse
      a11y = 100; `prefers-reduced-motion` respected.
- [x] **Performance**: CSS Modules (0 KB JS); next/image + next/font;
      SSG via `generateStaticParams`; estimated ~6 KB client JS
      (well under 100 KB limit); LCP <2.5s target.
- [x] **Security**: Cloudflare Turnstile CAPTCHA; server-side
      input validation/sanitization; CSP headers; `.env.local`
      in `.gitignore`; rate limiting on contact API.
- [x] **Observability & SEO**: Umami analytics (cookie-free);
      Next.js metadata API for per-page meta tags; OG/Twitter
      cards; sitemap.xml + robots.txt; JSON-LD structured data;
      error boundaries at layout level.
- [x] **Documentation & Versioning**: Conventional Commits;
      README with setup/scripts/deploy; quickstart.md; ADR
      directory for deviations.

---

## Architecture & Design

### Component Structure

```
app/
├── layout.tsx              # RootLayout: ThemeProvider, Nav,
│                           # Footer, SkipToContent, Analytics,
│                           # ErrorBoundary, metadata
├── page.tsx                # HomePage: Hero, About, ProjectGrid,
│                           # ContactForm (sections with IDs)
├── projects/
│   └── [slug]/
│       └── page.tsx        # ProjectDetail: full project view
│                           # with generateStaticParams
├── api/
│   └── contact/
│       └── route.ts        # POST handler: validate → Turnstile
│                           # verify → Resend send → respond
├── not-found.tsx           # Custom 404 page
├── error.tsx               # Error boundary (client component)
└── sitemap.ts              # Dynamic sitemap generation

components/
├── Hero/
│   ├── Hero.tsx            # Full-viewport intro section
│   ├── Hero.module.css
│   └── Hero.test.tsx
├── About/
│   ├── About.tsx           # Bio + SkillGrid
│   ├── About.module.css
│   └── About.test.tsx
├── ProjectCard/
│   ├── ProjectCard.tsx     # Card with thumbnail, title, tags
│   ├── ProjectCard.module.css
│   └── ProjectCard.test.tsx
├── ProjectGrid/
│   ├── ProjectGrid.tsx     # Filterable grid + empty state
│   ├── ProjectGrid.module.css
│   └── ProjectGrid.test.tsx
├── ProjectDetail/
│   ├── ProjectDetail.tsx   # Full project view
│   ├── ProjectDetail.module.css
│   └── ProjectDetail.test.tsx
├── ContactForm/
│   ├── ContactForm.tsx     # Form + Turnstile + feedback
│   ├── ContactForm.module.css
│   └── ContactForm.test.tsx
├── Navigation/
│   ├── Navigation.tsx      # Header nav + mobile menu
│   ├── Navigation.module.css
│   └── Navigation.test.tsx
├── Footer/
│   ├── Footer.tsx          # Social links + copyright
│   ├── Footer.module.css
│   └── Footer.test.tsx
├── ThemeToggle/
│   ├── ThemeToggle.tsx     # Dark/light mode switch
│   ├── ThemeToggle.module.css
│   └── ThemeToggle.test.tsx
├── SkipToContent/
│   ├── SkipToContent.tsx   # Skip link for a11y
│   └── SkipToContent.test.tsx
├── AnimatedSection/
│   ├── AnimatedSection.tsx # Intersection Observer wrapper
│   ├── AnimatedSection.module.css
│   └── AnimatedSection.test.tsx
└── ui/                     # Shared primitives (Button, Tag, etc.)
```

### Data Flow

```
Build Time:
  content/projects/*.mdx → lib/projects.ts → generateStaticParams
  data/skills.json → imported in About component

Runtime (Contact Form):
  ContactForm → POST /api/contact
    → validate body
    → verify Turnstile token (Cloudflare API)
    → send email (Resend API)
    → return JSON response
    → ContactForm shows success/error/fallback

Theme:
  next-themes ThemeProvider → localStorage
    → CSS custom properties toggle via data-theme attribute
    → All components read CSS variables

Analytics:
  Umami script tag in RootLayout → tracks page views automatically
  Custom events: contact form submit, project card click
```

### API / Integration Points

| Integration         | Direction | Endpoint / SDK                    |
|---------------------|-----------|-----------------------------------|
| Cloudflare Turnstile| Server→CF | `POST challenges.cloudflare.com/turnstile/v0/siteverify` |
| Resend              | Server→R  | `resend.emails.send()` via SDK    |
| Umami               | Client→U  | Async script tag (page views auto)|

See [contracts/contact-api.md](contracts/contact-api.md) for
full API contract.

---

## Implementation Phases

### Phase 1 — Foundation & Layout

Set up the project scaffolding, tooling, and shared layout.

1. Initialize Next.js 15 project with TypeScript strict mode.
2. Configure ESLint (`@typescript-eslint/recommended`) + Prettier
   with pre-commit hooks (husky + lint-staged).
3. Configure Vitest with V8 coverage (80% branch threshold).
4. Configure Playwright for E2E tests.
5. Set up CSS custom properties theme system in `globals.css`
   (light + dark variables).
6. Install and configure `next-themes` with ThemeProvider.
7. Build `RootLayout`: SkipToContent, Navigation, Footer,
   ThemeProvider, error boundary.
8. Build Navigation component (desktop + mobile responsive menu,
   active section indicator via Intersection Observer).
9. Build Footer component (social links, copyright).
10. Build ThemeToggle component (persists to localStorage).
11. Build SkipToContent component.
12. Set up `next/font` for self-hosted fonts.
13. Write unit tests for all Phase 1 components.

### Phase 2 — Content Sections

Build the main page sections and project detail pages.

1. Create project content structure (`content/projects/`) and
   data loader (`lib/projects.ts`).
2. Create `data/skills.json` with skill definitions.
3. Build Hero section (name, title, CTA button with scroll-to).
4. Build About section (bio, SkillGrid, resume download link).
5. Build ProjectCard component (thumbnail via next/image, title,
   description, tags).
6. Build ProjectGrid component (tag filter state, grid layout,
   empty state with clear-filters button).
7. Build AnimatedSection wrapper (Intersection Observer +
   CSS fade-in, respects `prefers-reduced-motion`).
8. Build project detail page (`/projects/[slug]`) with
   `generateStaticParams` and `generateMetadata`.
9. Write unit + component tests for all Phase 2 components.

### Phase 3 — Contact Form & Integrations

Wire up the contact form, CAPTCHA, email, and analytics.

1. Build ContactForm component (name, email, message fields +
   client-side validation).
2. Integrate Cloudflare Turnstile widget in ContactForm.
3. Build `POST /api/contact` route (validate → verify Turnstile
   → send via Resend → respond).
4. Implement error state with fallback email link (FR-16).
5. Add rate limiting to contact API (5 req / 15 min per IP).
6. Set up Umami analytics script in RootLayout.
7. Add custom analytics events (form submit, project click).
8. Write unit tests for API route and ContactForm.
9. Write Playwright E2E tests for critical flows (navigation,
   project filtering, contact form, dark mode).

### Phase 4 — SEO, Polish & Deploy

Finalize metadata, accessibility audit, and deployment.

1. Configure `generateMetadata` for all pages (title, description,
   OG image, Twitter card).
2. Add `sitemap.ts` and `robots.ts` for auto-generation.
3. Add JSON-LD structured data (Person schema on home, Project
   schema on detail pages).
4. Configure CSP headers in `next.config.ts`.
5. Create `.env.example` with all required variables.
6. Run Lighthouse audit — target: Performance ≥90, a11y = 100,
   SEO ≥95.
7. Fix any audit findings.
8. Write README.md (setup, scripts, deploy, architecture).
9. Deploy to Proxmox LXC via GitHub Actions + rsync.
10. Verify production Lighthouse scores and cross-browser
    rendering (Chrome, Firefox, Safari, Edge).

---

## Risks & Mitigations

| Risk                                        | Impact | Likelihood | Mitigation                                      |
|---------------------------------------------|--------|------------|--------------------------------------------------|
| Turnstile CAPTCHA blocks legitimate users   | Medium | Low        | Fallback to email link; monitor submission rates |
| Resend API downtime during form submission  | Medium | Low        | FR-16: show error + fallback email link          |
| CSS Modules verbose for complex responsive  | Low    | Medium     | Establish utility class patterns in globals.css  |
| next/image CLS from unsized images          | High   | Low        | Always specify width/height; use placeholder     |
| Bundle size creep from third-party scripts  | Medium | Low        | Async/defer all external scripts; monitor CI     |

---

## Dependencies

### Runtime

| Package                    | Purpose                      |
|----------------------------|------------------------------|
| next                       | Framework (App Router, SSG)  |
| react / react-dom          | UI library                   |
| next-themes                | Dark mode provider           |
| @marsidev/react-turnstile  | Turnstile CAPTCHA widget     |
| resend                     | Email delivery SDK           |

### Development

| Package                    | Purpose                      |
|----------------------------|------------------------------|
| typescript                 | Language                     |
| eslint / eslint-config-next| Linting                      |
| @typescript-eslint/*       | TS-specific lint rules       |
| prettier                   | Code formatting              |
| husky                      | Git hooks                    |
| lint-staged                | Pre-commit lint runner       |
| vitest                     | Unit test runner             |
| @vitejs/plugin-react       | Vitest React support         |
| @testing-library/react     | Component testing            |
| @testing-library/dom       | DOM testing utilities        |
| jsdom                      | Test DOM environment         |
| @vitest/coverage-v8        | Coverage provider            |
| @playwright/test           | E2E testing                  |

---

## Acceptance Criteria

- All 17 functional requirements (FR-01 through FR-17) verified.
- Vitest coverage ≥80% branches on all source files.
- Playwright E2E tests pass for all 4 user scenarios.
- Lighthouse mobile scores: Performance ≥90, Accessibility = 100,
  SEO ≥95.
- LCP <2.5s on simulated mobile 4G.
- CLS <0.1, FID <100ms.
- `npm audit` reports zero high/critical vulnerabilities.
- Site renders correctly on Chrome, Firefox, Safari, Edge.
- All pages have unique meta tags and valid OG/Twitter cards.
- Dark mode toggle works with persisted preference.
- Contact form: validation, CAPTCHA, success/error/fallback
  states all functional.
- Keyboard-only navigation works for 100% of interactive
  elements.
