# Full Portfolio Site — Quickstart

## Prerequisites

- Node.js 20+
- npm 10+ (or pnpm/yarn)
- Git

## Setup

```bash
# Clone and install
git clone <repo-url>
cd everestwilkeyportfolio
npm install

# Copy environment variables
cp .env.example .env.local
```

## Environment Variables

```env
# Resend (contact form email delivery)
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=your@email.com

# Cloudflare Turnstile (CAPTCHA)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x000000000000000
TURNSTILE_SECRET_KEY=0x000000000000000

# Umami Analytics
NEXT_PUBLIC_UMAMI_WEBSITE_ID=xxxxxxxx-xxxx-xxxx
NEXT_PUBLIC_UMAMI_URL=https://analytics.example.com

# Site URL (for meta tags and sitemap)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Development

```bash
# Start dev server
npm run dev

# Run unit/component tests (watch mode)
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Lint and format
npm run lint
npm run format
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (nav, footer, providers)
│   ├── page.tsx            # Landing page (Hero, About, Projects, Contact)
│   ├── projects/
│   │   └── [slug]/
│   │       └── page.tsx    # Project detail page
│   └── api/
│       └── contact/
│           └── route.ts    # Contact form API endpoint
├── components/             # Reusable UI components
│   ├── Hero/
│   ├── About/
│   ├── ProjectCard/
│   ├── ProjectGrid/
│   ├── ContactForm/
│   ├── Navigation/
│   ├── Footer/
│   ├── ThemeToggle/
│   └── SkipToContent/
├── content/                # Static project data (MDX or JSON)
│   └── projects/
├── data/                   # Static data files
│   └── skills.json
├── hooks/                  # Custom React hooks
│   ├── useIntersectionObserver.ts
│   └── useTheme.ts
├── lib/                    # Utilities and helpers
│   ├── resend.ts
│   ├── turnstile.ts
│   └── projects.ts
├── styles/                 # Global styles and theme
│   ├── globals.css
│   └── theme.css
├── public/                 # Static assets
│   ├── resume.pdf
│   └── images/
├── specs/                  # Feature specifications
└── tests/                  # E2E tests (Playwright)
    └── e2e/
```

## Build & Deploy

```bash
# Production build (standalone)
npm run build

# Run production server locally
node .next/standalone/server.js
```

Deploy to Proxmox LXC:
```bash
# Build locally or via GitHub Actions, then rsync to LXC
npm run build
rsync -avz .next/standalone/ user@lxc-host:/opt/portfolio/
rsync -avz .next/static/ user@lxc-host:/opt/portfolio/.next/static/
rsync -avz public/ user@lxc-host:/opt/portfolio/public/
ssh user@lxc-host "cd /opt/portfolio && pm2 restart portfolio"
```

On the LXC (one-time setup):
```bash
# Install Node.js 20+ and PM2
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
npm install -g pm2

# Start the app
cd /opt/portfolio
pm2 start server.js --name portfolio
pm2 save
pm2 startup
```

## Key Scripts

| Script           | Command                          |
|------------------|----------------------------------|
| `dev`            | `next dev --turbopack`           |
| `build`          | `next build`                     |
| `start`          | `next start`                     |
| `lint`           | `next lint`                      |
| `format`         | `prettier --write .`             |
| `test`           | `vitest`                         |
| `test:coverage`  | `vitest run --coverage`          |
| `test:e2e`       | `playwright test`                |
