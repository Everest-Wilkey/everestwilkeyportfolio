# Full Portfolio Site — Tasks (MVP Scope)

**Spec**: spec.md
**Plan**: plan.md
**Generated**: 2026-02-09
**Scope**: MVP — functional portfolio this week

---

## MVP Scope

**In MVP**: Project setup, Hero, About, Projects (grid + detail),
Navigation, Footer, Dark mode, Responsive layout, Keyboard a11y,
basic SEO metadata.

**Deferred to v1.1**:
- Contact form + Turnstile CAPTCHA + Resend email (FR-06/07/15/16)
- Umami analytics integration
- Scroll-triggered animations (AnimatedSection)
- JSON-LD structured data
- Playwright E2E tests
- CSP headers
- Lighthouse audit + fixes
- Full OG images (use placeholder)

---

## Phase 1 — Setup

> Goal: Working Next.js project with tooling and empty layout.
> Test: `npm run dev` starts, `npm run lint` passes,
> `npm test` runs (0 tests).

- [ ] T001 Initialize Next.js 15 project with TypeScript strict mode and App Router in project root
- [ ] T002 Install runtime deps: `next-themes`, `@marsidev/react-turnstile`, `resend`
- [ ] T003 Install dev deps: `vitest`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/dom`, `jsdom`, `@vitest/coverage-v8`, `vite-tsconfig-paths`, `husky`, `lint-staged`, `prettier`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`
- [ ] T004 Configure `tsconfig.json` with `strict: true` and path aliases (`@/*` → `src/*` or `./*`)
- [ ] T005 [P] Configure ESLint with `@typescript-eslint/recommended` + `eslint-config-next` in `eslint.config.mjs`
- [ ] T006 [P] Configure Prettier in `.prettierrc` and add format script to `package.json`
- [ ] T007 [P] Configure Vitest in `vitest.config.mts` with jsdom, react plugin, V8 coverage (80% branch threshold)
- [ ] T008 Set up husky + lint-staged pre-commit hook running ESLint + Prettier in `.husky/pre-commit`
- [ ] T009 Create `.env.example` and `.env.local` (add `.env*.local` to `.gitignore`)
- [ ] T010 Create `.gitignore` with Next.js defaults + `.env*.local` + `node_modules` + `.next`

---

## Phase 2 — Foundation (Layout Shell)

> Goal: Root layout with navigation, footer, theme toggle,
> skip-to-content. Pages render empty but navigable.
> Test: Site loads at localhost:3000, nav links work,
> dark mode toggles, skip link focuses main content.

- [ ] T011 Create CSS theme system with light/dark custom properties in `app/globals.css`
- [ ] T012 [P] Create `next/font` config for self-hosted fonts (heading + body) in `app/layout.tsx`
- [ ] T013 Build SkipToContent component in `components/SkipToContent/SkipToContent.tsx` — hidden link that focuses `#main-content` on activation
- [ ] T014 Build ThemeToggle component in `components/ThemeToggle/ThemeToggle.tsx` — toggles `next-themes` theme, accessible button with aria-label
- [ ] T015 [P] Write test for ThemeToggle in `components/ThemeToggle/ThemeToggle.test.tsx`
- [ ] T016 Build Navigation component in `components/Navigation/Navigation.tsx` — desktop nav links + mobile menu (hamburger button with aria-expanded), responsive via CSS Module
- [ ] T017 [P] Write test for Navigation in `components/Navigation/Navigation.test.tsx` — renders links, mobile menu toggles
- [ ] T018 Build Footer component in `components/Footer/Footer.tsx` — GitHub + LinkedIn links, copyright year, semantic `<footer>`
- [ ] T019 [P] Write test for Footer in `components/Footer/Footer.test.tsx`
- [ ] T020 Build RootLayout in `app/layout.tsx` — wraps children with ThemeProvider (next-themes), SkipToContent, Navigation, `<main id="main-content">`, Footer
- [ ] T021 Create `app/not-found.tsx` — custom 404 page with link back to home
- [ ] T022 Create `app/error.tsx` — client-side error boundary with "Something went wrong" message

---

## Phase 3 — US1: Hero + About Sections

> Goal: Visitor lands on site, sees name/title/CTA, scrolls to
> About with bio and skills.
> Test: Hero renders name + title + CTA button. About renders
> bio text + skill tags + resume link. CTA scrolls to About.
> Covers: FR-01, FR-02

- [ ] T023 [US1] Create `data/skills.json` with skill entries (name, category) per data-model.md
- [ ] T024 [US1] Create TypeScript types for Skill entity in `lib/types.ts`
- [ ] T025 [US1] Build Hero component in `components/Hero/Hero.tsx` — full-viewport section with name, professional title, CTA button that smooth-scrolls to `#projects`, semantic `<section id="hero">`
- [ ] T026 [US1] [P] Write test for Hero in `components/Hero/Hero.test.tsx` — renders name, title, CTA button exists
- [ ] T027 [US1] Build About component in `components/About/About.tsx` — bio paragraph, skill tags grouped by category, resume PDF download link (`<a href="/resume.pdf" download>`), semantic `<section id="about">`
- [ ] T028 [US1] [P] Write test for About in `components/About/About.test.tsx` — renders bio, skills, resume link
- [ ] T029 [US1] Add placeholder `public/resume.pdf`
- [ ] T030 [US1] Wire Hero + About into `app/page.tsx` as scroll sections

---

## Phase 4 — US2: Projects Grid + Detail Pages

> Goal: Visitor sees project cards, filters by tag, clicks into
> detail view on separate route.
> Test: ProjectGrid renders cards from data. Filter narrows
> results. Empty state shows. Detail page renders at
> `/projects/[slug]`. Back nav works.
> Covers: FR-03, FR-04, FR-05, FR-17

- [ ] T031 [US2] Create TypeScript types for Project entity in `lib/types.ts`
- [ ] T032 [US2] Create sample project content files in `content/projects/` (2-3 sample `.json` or `.mdx` files with all fields from data-model.md)
- [ ] T033 [US2] Build project data loader in `lib/projects.ts` — `getAllProjects()`, `getProjectBySlug(slug)`, `getAllTags()` functions reading from content directory
- [ ] T034 [US2] [P] Write test for project data loader in `lib/projects.test.ts`
- [ ] T035 [US2] Build ProjectCard component in `components/ProjectCard/ProjectCard.tsx` — thumbnail via `next/image` (width/height specified), title, description, technology tags, links to `/projects/[slug]`
- [ ] T036 [US2] [P] Write test for ProjectCard in `components/ProjectCard/ProjectCard.test.tsx`
- [ ] T037 [US2] Build ProjectGrid component in `components/ProjectGrid/ProjectGrid.tsx` — renders array of ProjectCards, tag filter buttons (client component with `useState`), empty state with "No matching projects" + clear-filters button
- [ ] T038 [US2] [P] Write test for ProjectGrid in `components/ProjectGrid/ProjectGrid.test.tsx` — renders cards, filter works, empty state shows
- [ ] T039 [US2] Build ProjectDetail component in `components/ProjectDetail/ProjectDetail.tsx` — full project info (description, role, challenges, outcomes, tags, live/source links), back link to `/#projects`
- [ ] T040 [US2] Create project detail page in `app/projects/[slug]/page.tsx` — uses `generateStaticParams` from `getAllProjects()`, `generateMetadata` for per-project title/description
- [ ] T041 [US2] Wire ProjectGrid into `app/page.tsx` as `<section id="projects">`

---

## Phase 5 — US3: Contact Section (MVP — mailto only)

> Goal: Contact section exists with a direct email link
> (full form + CAPTCHA deferred to v1.1).
> Test: Contact section renders with email link.
> Covers: FR-11 (partial — contact CTA present)

- [ ] T042 [US3] Build ContactPlaceholder component in `components/ContactPlaceholder/ContactPlaceholder.tsx` — heading, short message, `mailto:` link styled as button, note that full form is coming soon
- [ ] T043 [US3] Wire ContactPlaceholder into `app/page.tsx` as `<section id="contact">`

---

## Phase 6 — Polish (MVP)

> Goal: Basic SEO metadata, responsive audit, keyboard check.
> Test: Each page has unique title/description. Site works on
> mobile. All interactive elements keyboard-reachable.
> Covers: FR-08, FR-09, FR-10, FR-12, FR-13, FR-14

- [ ] T044 Add `generateMetadata` to `app/layout.tsx` with site-wide defaults (title template, description, OG fallback)
- [ ] T045 [P] Add `generateMetadata` to `app/projects/[slug]/page.tsx` with per-project title and description
- [ ] T046 [P] Create `app/sitemap.ts` that generates sitemap from all project slugs
- [ ] T047 [P] Create `app/robots.ts` with standard allow-all config
- [ ] T048 Verify responsive layout at mobile (≤768px), tablet, desktop — fix any CSS Module breakpoints
- [ ] T049 Verify keyboard navigation: tab through all interactive elements, check visible focus indicators, test skip-to-content link
- [ ] T050 Update Navigation active section indicator using Intersection Observer in `components/Navigation/Navigation.tsx`
- [ ] T051 Write README.md with project description, setup instructions, available scripts, and project structure

---

## Dependencies

```
Phase 1 (Setup)
  └─▸ Phase 2 (Foundation)
       └─▸ Phase 3 (Hero + About)  ──┐
       └─▸ Phase 4 (Projects)     ──┤  (parallel)
       └─▸ Phase 5 (Contact MVP)  ──┘
            └─▸ Phase 6 (Polish)
```

Phases 3, 4, and 5 can run in parallel after Phase 2.

---

## Parallel Execution Opportunities

| Tasks       | Why parallelizable                              |
|-------------|-------------------------------------------------|
| T005–T007   | Independent config files (ESLint, Prettier, Vitest) |
| T013–T014   | Independent components (SkipToContent, ThemeToggle) |
| T025–T029   | Hero and About are independent sections         |
| T035–T038   | ProjectCard and ProjectGrid tests vs implementation |
| T044–T047   | Independent metadata/sitemap/robots files       |

---

## Completion Criteria (MVP)

- [ ] `npm run dev` starts without errors
- [ ] `npm run lint` reports zero errors
- [ ] `npm test` passes with ≥80% branch coverage
- [ ] Hero, About, Projects, Contact sections render on home page
- [ ] Project detail pages render at `/projects/[slug]`
- [ ] Tag filtering works with empty state
- [ ] Dark mode toggle persists preference
- [ ] Navigation links scroll to sections
- [ ] Mobile responsive layout works
- [ ] All elements keyboard-navigable
- [ ] Each page has unique `<title>` and `<meta description>`

---

## Deferred (v1.1 — next week)

- [ ] D001 Build full ContactForm with validation (FR-06)
- [ ] D002 Integrate Cloudflare Turnstile CAPTCHA (FR-15)
- [ ] D003 Build `POST /api/contact` route with Resend (FR-07)
- [ ] D004 Add fallback email link on delivery failure (FR-16)
- [ ] D005 Add rate limiting to contact API
- [ ] D006 Set up Umami analytics in RootLayout
- [ ] D007 Build AnimatedSection with Intersection Observer
- [ ] D008 Add JSON-LD structured data (Person + Project schemas)
- [ ] D009 Configure CSP headers in `next.config.ts`
- [ ] D010 Set up Playwright and write E2E tests for all 4 scenarios
- [ ] D011 Run Lighthouse audits and fix findings
- [ ] D012 Deploy to Vercel and verify production scores
