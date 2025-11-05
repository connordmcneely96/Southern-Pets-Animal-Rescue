# Migration Guide

1. **Content inventory** – Export existing copy, media, and data from the legacy CMS or static site.
2. **Supabase setup** – Run `supabase db push` in production project. Import `schema.sql`, `policies.sql`, `functions.sql`, `triggers.sql` via migrations.
3. **Seed data** – Update `supabase/seeds.sql` with real animals, events, and volunteer records; load with `supabase db reset --linked` locally.
4. **Media** – Upload approved photos to the Supabase `media` bucket. Update `thumbnail_url` and `hero_url` fields.
5. **Auth** – Invite staff accounts via Supabase Auth. Configure OAuth providers in the Supabase dashboard.
6. **Stripe** – Create products/prices for recurring donations if needed. Set `STRIPE_*` environment variables in Vercel and Supabase.
7. **Deploy** – Push to GitHub. GitHub Actions runs lint/test/build/e2e/lighthouse before deploying to Vercel and running Supabase migrations.
8. **DNS & analytics** – Point domain to Vercel, enable GA4 & Plausible IDs in environment variables.
9. **Regression testing** – Execute Playwright suite (`pnpm e2e`) and review Lighthouse reports stored in CI artifacts.
