<!--
## Sync Impact Report
- Version change: N/A → 1.0.0 (initial ratification)
- Modified principles: N/A (initial creation)
- Added sections:
  - Preamble
  - Principle 1 — Type Safety & Code Quality
  - Principle 2 — Testing Discipline
  - Principle 3 — Accessibility
  - Principle 4 — Performance
  - Principle 5 — Security
  - Principle 6 — Observability & SEO
  - Principle 7 — Documentation & Versioning
  - Governance (Amendment, Versioning, Compliance)
  - Consistency Propagation Checklist
- Removed sections: N/A
- Templates requiring updates:
  - `.specify.specify/templates/plan-template.md` — ✅ created
    (Constitution Check section lists all 7 principles)
  - `.specify.specify/templates/spec-template.md` — ✅ created
    (Non-Functional Requirements mirror constitution thresholds)
  - `.specify.specify/templates/tasks-template.md` — ✅ created
    (Task categories map to all 7 principles)
  - `.specify.specify/templates/constitution-template.md` —
    ✅ created (base template with placeholder tokens)
- Follow-up TODOs: None. All templates created and verified.
-->

# Everest Wilkey Portfolio — Project Constitution

**Version**: 1.0.0
**Ratified**: 2026-02-09
**Last Amended**: 2026-02-09

---

## Preamble

This constitution defines the non-negotiable principles, standards,
and governance rules for the Everest Wilkey Portfolio project. All
design decisions, implementation tasks, and code contributions MUST
align with the principles enumerated below.

**Tech Stack**: Next.js 15 + TypeScript 5 + React 19
**Project Type**: Personal Portfolio Website

---

## Principles

### Principle 1 — Type Safety & Code Quality

All source code MUST be written in TypeScript with `strict` mode
enabled. The following rules are non-negotiable:

- `any` type usage is prohibited; use `unknown` with type guards
  when the type is genuinely indeterminate.
- All exported functions and components MUST have explicit return
  type annotations.
- ESLint with the `@typescript-eslint/recommended` ruleset MUST
  pass with zero errors before merge.
- Prettier MUST be configured and enforced via pre-commit hooks.
- Component props MUST be defined as named interfaces, not inline
  object types.

**Rationale**: Strict typing eliminates an entire class of runtime
errors and serves as living documentation. Consistent formatting
removes subjective style debates from code review.

### Principle 2 — Testing Discipline

Every feature MUST ship with tests that validate its contract:

- Unit tests MUST cover all utility functions and custom hooks
  with ≥80% branch coverage.
- Component tests using React Testing Library MUST verify
  user-visible behavior, not implementation details.
- Integration tests MUST validate critical user flows (navigation,
  contact form submission, project filtering).
- Tests MUST run in CI and a failing test suite MUST block merge.
- Test files MUST be co-located with their source files using the
  `*.test.ts(x)` naming convention.

**Rationale**: Tests are the safety net that enables confident
refactoring and rapid iteration. Coverage thresholds prevent
regression of critical paths.

### Principle 3 — Accessibility

The portfolio MUST be usable by everyone, regardless of ability:

- All pages MUST score 100 on Lighthouse Accessibility audits.
- Every interactive element MUST be keyboard-navigable with
  visible focus indicators.
- All images MUST have descriptive `alt` text; decorative images
  MUST use `alt=""` with `aria-hidden="true"`.
- Color contrast MUST meet WCAG 2.1 AA standards (4.5:1 for
  normal text, 3:1 for large text).
- Semantic HTML elements MUST be used over generic `<div>` and
  `<span>` elements where applicable (e.g., `<nav>`, `<main>`,
  `<article>`, `<section>`).
- ARIA attributes MUST only be used when native HTML semantics
  are insufficient.

**Rationale**: Accessibility is a fundamental right, not a feature.
A portfolio that excludes users reflects poorly on the developer's
professional standards.

### Principle 4 — Performance

The portfolio MUST load fast and feel instant:

- Largest Contentful Paint (LCP) MUST be under 2.5 seconds on
  mobile 4G connections.
- Cumulative Layout Shift (CLS) MUST be under 0.1.
- First Input Delay (FID) MUST be under 100ms.
- JavaScript bundle size MUST stay under 100KB gzipped for the
  initial page load (excluding framework runtime).
- Images MUST use Next.js `<Image>` component with `next/image`
  optimization (WebP/AVIF, lazy loading, responsive sizes).
- Fonts MUST be self-hosted or loaded via `next/font` to
  eliminate layout shift.
- Static pages MUST use Static Site Generation (SSG); dynamic
  data MUST use Incremental Static Regeneration (ISR) where
  applicable.

**Rationale**: Portfolio visitors form impressions in seconds.
Slow load times directly reduce engagement and signal a lack
of technical competence.

### Principle 5 — Security

The portfolio MUST follow security best practices even as a
static/semi-static site:

- All dependencies MUST be audited; `npm audit` MUST report zero
  high or critical vulnerabilities before deploy.
- Content Security Policy (CSP) headers MUST be configured to
  prevent XSS.
- Environment variables containing secrets MUST never be committed
  to version control; `.env*.local` files MUST be in `.gitignore`.
- Form submissions (e.g., contact form) MUST validate and sanitize
  input on both client and server sides.
- Third-party scripts MUST be loaded with `async`/`defer` and
  reviewed for data collection practices.

**Rationale**: Even portfolio sites are attack surfaces. Visitors
and potential employers trust that the developer practices what
they preach about security.

### Principle 6 — Observability & SEO

The portfolio MUST be discoverable and its health MUST be
measurable:

- Every page MUST have unique, descriptive `<title>` and
  `<meta name="description">` tags.
- Open Graph and Twitter Card meta tags MUST be present on all
  public pages.
- A `sitemap.xml` and `robots.txt` MUST be generated
  automatically via Next.js configuration.
- Structured data (JSON-LD) SHOULD be added for Person and
  Portfolio schemas.
- Analytics (privacy-respecting, e.g., Plausible or Umami) MUST
  be integrated to track page views and engagement without
  cookies.
- Error boundaries MUST be implemented at the layout level to
  prevent full-page crashes.

**Rationale**: A portfolio that cannot be found serves no purpose.
Observability ensures the site remains healthy after deployment.

### Principle 7 — Documentation & Versioning

The project MUST be well-documented and version-controlled:

- A `README.md` MUST describe the project, setup instructions,
  available scripts, and deployment process.
- Commit messages MUST follow the Conventional Commits
  specification (e.g., `feat:`, `fix:`, `docs:`, `chore:`).
- All PRs MUST include a description of changes and link to
  relevant issues or design artifacts.
- The changelog MUST be maintained (manually or via tooling like
  `standard-version` or `changesets`).
- Design decisions that deviate from these principles MUST be
  documented as Architecture Decision Records (ADRs) in a
  `docs/decisions/` directory.

**Rationale**: Documentation is a multiplier for future
productivity. Clear versioning and commit hygiene make the
project history navigable and auditable.

---

## Governance

### Amendment Procedure

1. Any principle change MUST be proposed as a PR modifying this
   constitution file.
2. The PR description MUST include the rationale for the change
   and its impact on existing code and templates.
3. After review, the constitution version MUST be bumped according
   to the versioning policy below.
4. All dependent templates (plan, spec, tasks, commands) MUST be
   updated in the same PR or a linked follow-up PR.

### Versioning Policy

This constitution follows semantic versioning:

- **MAJOR** (X.0.0): Backward-incompatible changes — removal or
  fundamental redefinition of a principle.
- **MINOR** (0.X.0): Additions — new principle, new section, or
  materially expanded guidance.
- **PATCH** (0.0.X): Clarifications — wording improvements, typo
  fixes, non-semantic refinements.

The `LAST_AMENDED_DATE` MUST be updated to the date of the change.

### Compliance Review

- Every PR MUST be checked against the principles in this
  constitution before merge.
- A quarterly review (every 3 months) SHOULD be conducted to
  ensure the constitution remains relevant and principles are
  being followed.
- Violations discovered post-merge MUST be addressed in a
  follow-up PR within the same sprint/cycle.

---

## Consistency Propagation Checklist

- [x] `plan-template.md` aligns with updated principles
- [x] `spec-template.md` reflects mandatory sections/constraints
- [x] `tasks-template.md` categorization matches principle-driven
      task types
- [x] Command files — no command files exist yet (N/A)
- [ ] Runtime guidance docs — no README.md exists yet (deferred
      until project scaffolding)
