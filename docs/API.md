# API Surface

## REST endpoints (Next.js route handlers)
- `GET /api/animals` – Public adoptable animals listing.
- `GET /api/donations?session_id=...` – Retrieve donation intent by Stripe session id.
- `POST /api/volunteers` – Create volunteer application (public, rate limited in backlog).

## Server actions
- `createDonationSession({ amount, recurring })` – Creates Stripe Checkout session and logs intent.
- `registerVolunteer(form)` – Stores volunteer interest (used by `VolunteerForm`).
- `submitContact(form)` – Stores contact request for staff follow-up.

## Supabase RPC
- `mark_donation_completed(session_id text)` – Marks donation intent as completed; used by Stripe webhook.

## Edge functions
- `stripe-webhook` – Validates Stripe webhook signature and calls `mark_donation_completed` RPC.

## Storage
- `media` bucket (create via Supabase dashboard) with owner-based RLS policy defined in `policies.sql`.

## Auth
- Supabase Auth email/password, OAuth (Google, Facebook), magic links.
- Session handled with `@supabase/auth-helpers-nextjs` via server components and middleware.
