# [FEATURE_NAME] — Tasks

**Spec**: [SPEC_REFERENCE]
**Plan**: [PLAN_REFERENCE]
**Generated**: [TASKS_DATE]

---

## Task Categories

Tasks are organized by principle-driven categories to ensure
constitutional compliance:

### Setup & Configuration
Infrastructure, tooling, and project setup tasks.

### Type Safety & Code Quality
TypeScript types, interfaces, ESLint rules, Prettier config.

### Core Implementation
Primary feature logic, components, and data flow.

### Testing
Unit tests, component tests, integration tests.

### Accessibility
Keyboard navigation, ARIA, semantic HTML, contrast checks.

### Performance
Bundle optimization, image handling, SSG/ISR, font loading.

### Security
Input validation, CSP headers, dependency audits.

### Observability & SEO
Meta tags, analytics, error boundaries, structured data.

### Documentation
README updates, ADRs, changelog entries.

---

## Tasks

| ID | Category | Task | Depends On | Status |
|----|----------|------|------------|--------|
| T-01 | [CATEGORY] | [TASK_DESCRIPTION] | — | Pending |

---

## Completion Criteria

All tasks MUST be completed and verified against the constitution
principles before the feature is considered done. Specifically:

- [ ] All tests pass (`npm test`)
- [ ] ESLint reports zero errors (`npm run lint`)
- [ ] Lighthouse scores meet thresholds (a11y: 100,
      performance: ≥90)
- [ ] `npm audit` reports zero high/critical vulnerabilities
- [ ] Documentation updated (README, changelog, ADR if needed)
- [ ] Conventional Commit message used
