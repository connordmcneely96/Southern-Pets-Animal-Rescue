# Southern Pets Animal Rescue

A full-stack rebuild of [Southern Pets Animal Rescue](https://www.southernpetsanimalrescue.org/) using Next.js 14, TypeScript, Tailwind CSS, shadcn/ui patterns, and Supabase (Auth, Postgres, Storage, Edge Functions).

## Tech stack
- Next.js 14 (App Router) + React 18 + TypeScript
- Tailwind CSS + shadcn-inspired UI kit (`packages/ui`)
- Supabase Postgres, Auth, Storage, Edge Functions
- Stripe Checkout for donations
- Vitest, React Testing Library, Playwright for automated testing
- GitHub Actions CI

## Getting started

```bash
pnpm install
cp .env.example .env
supabase start
supabase db reset --linked
pnpm dev
```

- Web app: http://localhost:3000
- Supabase Studio: http://localhost:54323 (default)

Run quality checks:
```bash
pnpm lint
pnpm test
pnpm e2e  # requires `pnpm dev` in another terminal
```

## Supabase
- SQL definitions in `supabase/schema.sql`, `policies.sql`, `functions.sql`, `triggers.sql`
- Seed data in `supabase/seeds.sql`
- Stripe webhook handled by `supabase/functions/stripe-webhook`

## Deployment
- Vercel for the Next.js app (see `DEPLOY.md`)
- Supabase for database/auth/storage/functions
- GitHub Actions pipeline in `.github/workflows/ci.yml`

## Documentation
- `docs/ARCHITECTURE.md`: system design overview
- `docs/AUDIT_REPORT.md`: findings + remediation plan
- `docs/API.md`: API surface and Supabase RPCs
- `docs/MIGRATION_GUIDE.md`: steps to migrate from legacy site
- `docs/ASSUMPTIONS.md`: inferred behaviors and placeholders
- `docs/BACKLOG.json`: prioritized remediation backlog
