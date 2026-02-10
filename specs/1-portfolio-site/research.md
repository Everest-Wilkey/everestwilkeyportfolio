# Full Portfolio Site — Research

**Date**: 2026-02-09
**Spec**: spec.md

---

## Tech Stack Decisions

### 1. Framework — Next.js 15 + TypeScript 5 + React 19

**Decision**: Next.js 15 with App Router, TypeScript strict mode,
React 19.
**Rationale**: Established in the project constitution. File-based
routing, SSG/ISR support, built-in image optimization, and
`next/font` align directly with performance and SEO requirements.
**Alternatives considered**: Astro (less React ecosystem support),
Remix (weaker SSG story), Vite + React (no built-in SSR/SSG).

### 2. Styling — CSS Modules + CSS Custom Properties

**Decision**: CSS Modules (built into Next.js) with CSS custom
properties for theming, combined with `next-themes` for dark mode.
**Rationale**:
- Zero runtime JavaScript — best for <100KB bundle target.
- Built into Next.js — zero configuration, no extra dependencies.
- CSS custom properties provide native dark mode theming with
  no layout shift (CLS <0.1).
- Full control over WCAG 2.1 AA contrast implementation.
- No IntelliSense issues (unlike Tailwind v4 in 2026).
**Alternatives considered**:
- Tailwind CSS v4: Popular but VSCode IntelliSense broken with
  new CSS-first config; utility classes conflict with semantic
  HTML principle.
- Vanilla Extract: Excellent TypeScript DX but adds build plugin
  complexity for minimal portfolio benefit.

### 3. Testing — Vitest + React Testing Library + Playwright

**Decision**: Vitest for unit/component tests, React Testing
Library for component rendering, Playwright for E2E.
**Rationale**:
- Vitest is 4-10x faster than Jest with native ESM/TypeScript.
- Official Next.js documentation for both Vitest and Playwright.
- Built-in V8 coverage provider with threshold config for ≥80%
  branch coverage.
- Playwright supports Chromium, WebKit (Safari), and Firefox
  for cross-browser success criteria.
- React Testing Library is the React 19 recommended testing
  approach (react-test-renderer deprecated).
**Alternatives considered**:
- Jest + Cypress: Growing compatibility issues with Next.js 15
  + React 19; Jest 4-10x slower; Cypress lacks Safari support.
- Vitest + Cypress: Good but Cypress requires Webpack fallback
  (no Turbopack) and is slower for E2E.

### 4. CAPTCHA — Cloudflare Turnstile

**Decision**: Cloudflare Turnstile for contact form spam
prevention.
**Rationale**:
- WCAG 2.1 Level AA compliant — never challenges users visually.
- GDPR compliant by design — no cookies, no cross-site tracking.
- Unlimited free usage with no rate limits.
- Lightweight async script with minimal bundle impact.
- `@marsidev/react-turnstile` package for Next.js integration.
**Alternatives considered**:
- Google reCAPTCHA v3: Not GDPR compliant, sets tracking cookies,
  ~90KB bundle, data used for AI training.
- hCaptcha: Poor accessibility (requires image challenges),
  excludes visually impaired users.

### 5. Email Delivery — Resend

**Decision**: Resend for contact form submission delivery.
**Rationale**:
- 3,000 emails/month free tier — more than sufficient for
  portfolio contact form.
- Native Next.js App Router and Server Actions support.
- Full TypeScript SDK with type-safe email sending.
- React Email integration for writing emails as React components.
- 99.77% uptime (Nov 2025 – Feb 2026).
- Simplest API of evaluated options.
**Alternatives considered**:
- Formspree: Only 50 submissions/month free; primarily
  client-side, less flexible.
- SendGrid: Free tier limited to 60 days; older, more complex
  API; overkill for portfolio.

### 6. Analytics — Umami (POST-MVP)

**Decision**: Umami for privacy-respecting, cookie-free analytics.
Deferred to after MVP — not needed to launch.
**Rationale**:
- Free cloud tier: 100k events/month (or self-host for ~$3.50/mo).
- Cookie-free, GDPR compliant, no personal data collection.
- Built with Next.js — natural integration.
- 2KB tracking script — negligible bundle impact.
**Alternatives considered**:
- Plausible: Cloud starts at $9/month.
- Vercel Analytics: Cloud-hosted only.

### 7. Animation — CSS + Intersection Observer

**Decision**: Pure CSS transitions/keyframes triggered by
Intersection Observer API.
**Rationale**:
- Zero bundle impact — uses native browser APIs only.
- Native `prefers-reduced-motion` media query support in CSS.
- Hardware-accelerated (transform, opacity) for smooth 60fps.
- Portfolio animations are simple (fade-ins, slide-ups) and
  don't need a library.
- Custom `useIntersectionObserver` hook: ~1-2KB.
**Alternatives considered**:
- Framer Motion: ~34KB full bundle (4.6KB with LazyMotion);
  excessive for simple scroll reveals.
- Motion One: 3.8KB; good middle ground but still unnecessary
  for CSS-achievable animations.

### 8. Deployment — Self-hosted (Proxmox LXC + Node.js)

**Decision**: Self-host on a Proxmox LXC container running
Node.js directly. Next.js `output: 'standalone'` for minimal
deployment footprint.
**Rationale**:
- Fully self-hosted on own Proxmox infrastructure.
- LXC is lighter than Docker — no container-in-container
  overhead, direct Node.js process.
- `output: 'standalone'` copies only needed `node_modules` into
  `.next/standalone/` (~50MB total).
- PM2 for process management (auto-restart, logs).
- GitHub Actions builds → rsync standalone output to LXC via
  SSH for automated deploys.
- Retains full Next.js features (API routes, SSR, ISR).
**Deploy flow**:
  1. Push to `main` on GitHub.
  2. GitHub Actions: `npm ci && npm run build`.
  3. Rsync `.next/standalone/` + `.next/static/` + `public/`
     to LXC via SSH.
  4. PM2 restarts the Node.js process on the LXC.
**Alternatives considered**:
- Docker on LXC: Works but adds unnecessary layer for a
  single-app LXC.
- Vercel: Cloud-hosted, not self-hosted.
- GitHub Pages: Static-only, loses API routes.

---

## Cost Constraint

**Requirement**: All tools MUST be free (no credit card) or
self-hostable at zero cost.

---

## Full Stack Summary

| Layer          | Technology                  | Cost     | Self-Hosted? | Notes                          |
|----------------|-----------------------------|----------|--------------|--------------------------------|
| Framework      | Next.js 15 + React 19      | Free     | Yes (MIT)    | Open source                    |
| Language       | TypeScript 5 (strict)       | Free     | Yes (MIT)    | Open source                    |
| Styling        | CSS Modules + custom props  | Free     | Yes          | Built into Next.js             |
| Dark mode      | next-themes                 | Free     | Yes (MIT)    | Open source, ~2 KB             |
| Unit tests     | Vitest + RTL                | Free     | Yes (MIT)    | Open source, dev only          |
| E2E tests      | Playwright                  | Free     | Yes (Apache) | Open source, dev only          |
| CAPTCHA        | Cloudflare Turnstile        | Free     | No (cloud)   | Unlimited, no credit card      |
| Email          | Resend                      | Free     | No (cloud)   | 3k emails/month, no CC         |
| Analytics      | Umami                       | Free     | Yes          | Self-host or free cloud (100k) |
| Animation      | CSS + Intersection Observer | Free     | Yes          | Native browser APIs, ~1 KB     |
| Fonts          | next/font (self-hosted)     | Free     | Yes          | Bundled with Next.js           |
| Images         | next/image                  | Free     | Yes          | Built into Next.js             |
| Linting        | ESLint + Prettier           | Free     | Yes (MIT)    | Open source, dev only          |
| Deployment     | Proxmox LXC + Node.js       | Free     | Yes          | Standalone build + PM2           |

**Total cost: $0/month**

Self-hosted alternatives (if cloud services are unacceptable):
- Resend → **Nodemailer** + Gmail SMTP (free, 500 emails/day)
- Turnstile → No self-hosted alt, but free unlimited with no CC

**Estimated client JS (excluding framework)**: ~6 KB gzipped
— well under the 100 KB constitution limit.
