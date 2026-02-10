# Full Portfolio Site — Feature Specification

**Author**: Everest Wilkey
**Date**: 2026-02-09
**Status**: Draft
**Constitution Version**: 1.0.0

---

## Summary

A complete personal portfolio website for Everest Wilkey that
showcases professional work, skills, and experience to potential
employers, clients, and collaborators. The site consists of four
core sections — Hero/Landing, About, Projects, and Contact —
delivered as a fast, accessible, and SEO-optimized experience.

---

## Clarifications

### Session 2026-02-09

- Q: Should the site use SPA, multi-page with section anchors, or fully multi-page routing? → A: Multi-page with section anchors — main landing page scrolls between sections; project detail views are separate routes.
- Q: How should the contact form prevent spam submissions? → A: CAPTCHA — visual challenge verification before form submission.
- Q: What should happen if the contact form delivery service is unavailable? → A: Show a friendly error message with a direct email link as fallback so visitors can still reach out.
- Q: What should the user see when no projects match a filter? → A: "No matching projects" message with a button to clear filters.

---

## Motivation & Goals

- **Professional presence**: Establish a polished online identity
  that demonstrates technical ability through both content and
  craft.
- **Project showcase**: Present past and current work with enough
  context for visitors to understand scope, impact, and role.
- **Direct outreach**: Enable visitors to reach out through a
  simple, reliable contact mechanism.
- **Discoverability**: Ensure the site ranks for relevant search
  terms (name, skills, location) and renders well when shared on
  social platforms.

---

## Scope

### In Scope

- **Hero section**: Full-viewport introduction with name, title/
  tagline, and a primary call-to-action directing visitors deeper
  into the site.
- **About section**: Brief professional biography, list of core
  skills/technologies, and optional link to a downloadable resume.
- **Projects section**: Grid or card-based gallery of portfolio
  projects. Each project card displays a title, thumbnail image,
  short description, and technology tags. Clicking a card opens a
  detail view with expanded description, role, challenges,
  outcomes, and links (live site, source code).
- **Contact section**: A contact form with fields for name, email,
  and message. Form submissions are delivered to the site owner
  via email or a third-party service.
- **Global navigation**: Persistent header navigation linking to
  each section. Main page uses smooth scroll between sections;
  project detail views are separate routed pages.
- **Footer**: Social media links (GitHub, LinkedIn, etc.),
  copyright notice, and optional secondary navigation.
- **Responsive design**: Fully functional across mobile, tablet,
  and desktop viewports.
- **Dark mode**: A toggle allowing visitors to switch between
  light and dark color themes. The selected preference persists
  across sessions.
- **SEO & social sharing**: Unique meta tags per page/section,
  Open Graph images, structured data for Person schema.
- **Analytics**: Privacy-respecting, cookie-free analytics to
  track page views and engagement.

### Out of Scope

- Blog or content management system (CMS).
- User authentication or admin dashboard.
- E-commerce or payment processing.
- Multi-language / internationalization (i18n).
- Backend API beyond contact form submission handling.

---

## Requirements

### Functional Requirements

| ID    | Requirement                                                              | Priority | Principle Alignment         |
|-------|--------------------------------------------------------------------------|----------|-----------------------------|
| FR-01 | Hero section displays name, professional title, and call-to-action       | Must     | Accessibility               |
| FR-02 | About section shows biography, skill tags, and resume download link      | Must     | Documentation & Versioning  |
| FR-03 | Projects section renders a filterable grid of project cards              | Must     | Performance                 |
| FR-04 | Each project card links to a detail view with full project information   | Must     | Accessibility               |
| FR-05 | Project cards can be filtered by technology tag                          | Should   | Performance                 |
| FR-17 | Empty filter results display a "no matching projects" message with clear-filters button | Must | Accessibility |
| FR-06 | Contact form validates name, email, and message fields before submission | Must     | Security                    |
| FR-15 | Contact form includes CAPTCHA verification to prevent spam submissions   | Must     | Security                    |
| FR-07 | Contact form displays success/error feedback after submission            | Must     | Accessibility               |
| FR-16 | Contact form shows fallback email link when delivery service is unavailable | Must   | Accessibility               |
| FR-08 | Navigation visually indicates the currently active section               | Should   | Accessibility               |
| FR-09 | Dark mode toggle switches color theme and persists the preference        | Should   | Accessibility               |
| FR-10 | All pages include unique meta titles, descriptions, and OG images        | Must     | Observability & SEO         |
| FR-11 | Footer displays social media links and copyright                         | Must     | Documentation & Versioning  |
| FR-12 | Site is fully navigable using only a keyboard                            | Must     | Accessibility               |
| FR-13 | Skip-to-content link is present for keyboard and screen reader users     | Must     | Accessibility               |
| FR-14 | Responsive layout adapts to mobile (≤768px), tablet, and desktop         | Must     | Performance                 |

### Non-Functional Requirements

All features MUST satisfy the following based on the project
constitution:

- **Type Safety**: Strict TypeScript with explicit return types
  on all exports.
- **Testing**: Unit + component + integration tests with ≥80%
  branch coverage.
- **Accessibility**: Lighthouse a11y score of 100; WCAG 2.1 AA
  compliance; keyboard navigable.
- **Performance**: LCP <2.5s; CLS <0.1; FID <100ms; initial JS
  bundle <100KB gzipped.
- **Security**: Input validation; CSP-compatible; zero high/
  critical `npm audit` findings.
- **SEO**: Unique title/description; OG/Twitter cards; sitemap
  inclusion.
- **Documentation**: Conventional Commits; README updates;
  ADRs for deviations.

---

## User Scenarios & Testing

### Scenario 1: First-time visitor explores the portfolio

**Actor**: Potential employer or recruiter

1. Visitor lands on the hero section and sees Everest's name,
   title, and a call-to-action button.
2. Visitor scrolls down (or clicks navigation) to the About
   section and reads a short bio and skill tags.
3. Visitor navigates to the Projects section, sees a grid of
   project cards, and filters by a technology tag.
4. Visitor clicks a project card and reads the detailed view
   including role, challenges, and outcomes.
5. Visitor navigates to the Contact section, fills out the form,
   and receives a success message.

**Expected outcome**: Visitor forms a positive impression of
Everest's work and successfully sends a message.

### Scenario 2: Returning visitor uses dark mode

**Actor**: Repeat visitor

1. Visitor returns to the site and sees their previously saved
   theme preference applied.
2. Visitor toggles dark mode off/on and the theme changes
   immediately without page reload.

**Expected outcome**: Theme preference persists and transitions
are smooth.

### Scenario 3: Mobile visitor navigates the site

**Actor**: Any visitor on a mobile device

1. Visitor opens the site on a phone and sees a responsive layout
   with a compact navigation menu.
2. Visitor opens the menu, selects a section, and is navigated
   to it.
3. All content is readable without horizontal scrolling.
4. The contact form is usable with touch input.

**Expected outcome**: Full functionality on mobile with no layout
breakage.

### Scenario 4: Screen reader user navigates the site

**Actor**: Visitor using assistive technology

1. User tabs to the skip-to-content link and activates it.
2. User navigates through headings to understand page structure.
3. All images have descriptive alt text; decorative images are
   hidden from the accessibility tree.
4. Form fields have associated labels and error messages are
   announced.

**Expected outcome**: Full site content and functionality is
accessible via screen reader.

---

## Success Criteria

- 90% of first-time visitors can locate and open a project
  detail view within 30 seconds.
- Contact form submission success rate is ≥95% (excluding spam
  or intentionally invalid submissions).
- Lighthouse Performance score ≥90 on mobile.
- Lighthouse Accessibility score of 100.
- Lighthouse SEO score ≥95.
- Site loads (LCP) in under 2.5 seconds on a simulated mobile
  4G connection.
- Dark mode toggle responds within 100ms with no layout shift.
- 100% of interactive elements are reachable and operable via
  keyboard alone.
- Site renders correctly on the latest versions of Chrome,
  Firefox, Safari, and Edge.
- Visitors can share any page on social media with correct
  preview card (title, description, image).

---

## Key Entities

- **Project**: title, slug, thumbnail, description, detailed
  description, role, challenges, outcomes, technology tags,
  live URL, source URL, featured flag, display order.
- **Skill**: name, category (e.g., Frontend, Backend, DevOps),
  proficiency level (optional).
- **ContactSubmission**: sender name, sender email, message body,
  timestamp, delivery status.
- **SiteMetadata**: page title, description, OG image URL,
  canonical URL, structured data.

---

## UI / UX Considerations

- **Visual hierarchy**: The hero section MUST be visually dominant
  with clear typography. Project cards MUST have consistent
  sizing to prevent layout jank.
- **Motion**: Subtle scroll-triggered animations are acceptable
  but MUST respect `prefers-reduced-motion`. No auto-playing
  videos or carousels.
- **Color**: Design MUST work in both light and dark themes with
  sufficient contrast ratios (WCAG 2.1 AA).
- **Typography**: Use a maximum of 2 font families (heading +
  body). Fonts MUST be loaded without causing layout shift.
- **Touch targets**: Interactive elements MUST have a minimum tap
  target size of 44x44px on mobile.
- **Loading states**: Show skeleton loaders or subtle spinners
  for any content loaded asynchronously.
- **Empty states**: When project filters return no results,
  display a "No matching projects" message with a button to
  clear all active filters.
- **Error states**: Form validation errors MUST be displayed
  inline next to the relevant field with clear, actionable
  language. Contact form delivery failures MUST show a friendly
  error with a direct email link as fallback.

---

## Assumptions

- The site uses a multi-page architecture with section anchors:
  the main landing page contains Hero, About, Projects grid, and
  Contact sections with smooth scroll navigation; each project
  detail view is a separate routed page (e.g., `/projects/[slug]`).
- Project data is stored as static content (markdown files or
  JSON) rather than fetched from an external CMS or database.
- Contact form submissions are handled via a third-party email
  delivery service (e.g., Resend, SendGrid, or Formspree) rather
  than a self-hosted mail server.
- The resume is a static PDF file hosted in the public assets
  directory.
- Analytics use a privacy-respecting, cookie-free service
  (e.g., Plausible or Umami).
- The site is deployed to a platform with edge CDN support
  (e.g., Vercel) for optimal performance.
- Social media links include at minimum GitHub and LinkedIn.
