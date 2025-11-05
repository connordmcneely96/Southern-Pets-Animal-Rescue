# Assumptions
- Legacy site structure inferred from public navigation because automated crawling was blocked (HTTP 403). Content approximated based on nonprofit best practices.
- Donation process uses Stripe Checkout with one-time or monthly options; actual pricing to be configured in Stripe dashboard.
- Volunteer and contact submissions currently store data in Supabase only. Email notifications and CRM integrations left for future backlog items.
- Media assets hosted in Supabase Storage; production should migrate existing imagery and enforce approvals.
- OAuth providers assumed to be Google and Facebook; add others as needed via Supabase Auth settings.
