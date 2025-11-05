# Deployment

## Vercel
1. Create Vercel project from GitHub repo.
2. Set environment variables (from `.env.example`). Include Supabase, Stripe, analytics keys.
3. Configure build command `pnpm install && pnpm build` and output `.next`.
4. Add `SUPABASE_JWT_SECRET` and `SUPABASE_SERVICE_ROLE_KEY` as encrypted env vars; never expose service role client-side.
5. Enable `NODE_VERSION=20` in Vercel settings.

## Supabase
1. Initialize project, apply migrations via `supabase db push` or the SQL editor using files in `supabase/`.
2. Deploy Edge Function: `supabase functions deploy stripe-webhook --project-ref <ref>`.
3. Configure Stripe webhook endpoint to Supabase function URL.
4. Create `media` storage bucket, enable RLS using provided policies.

## GitHub Actions
- On push/PR, the CI workflow runs lint → unit tests → build → Supabase migrations → Playwright → Lighthouse.
- Configure `LHCI_GITHUB_APP_TOKEN` secret for Lighthouse reporting.

## Stripe
- Create test mode keys and set in Vercel & Supabase.
- Register webhook with signing secret matching `STRIPE_WEBHOOK_SECRET` env.
