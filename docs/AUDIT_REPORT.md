# Audit Report

## Legal/IP considerations
- Public copy replaces proprietary wording with original summaries under 25 words.
- Images use Unsplash placeholders; replace with organization-owned photography before launch.

## Performance
- Use Next.js Image optimization and caching headers. Target Lighthouse Performance ≥ 90 on key pages.
- Configure Vercel Edge Network caching for static routes via `revalidate` hints.

## Accessibility
- Forms include labels, error messaging, and keyboard focus states.
- Add periodic audits with axe-core and integrate CI gate (see backlog item A11Y-01).

## SEO
- Metadata, sitemap, and robots implemented. Add structured data for events and adoptable animals (backlog SEO-02).

## Security
- CSP, HTTPS redirects, and rate limits planned via middleware (backlog SEC-01).
- Stripe keys managed via environment variables. Webhook secret stored in Supabase config.

## Analytics
- GA4 and Plausible scripts gated by environment variables.

## Observability
- Structured logging TODO for server actions (backlog OBS-01).

## Prioritized findings
1. **Rate limiting for mutation endpoints** – Implement middleware-based limiter to prevent abuse.
2. **Structured data** – Add JSON-LD for animals and events to improve SEO.
3. **A11y automated checks in CI** – Integrate axe-core Playwright audit.
4. **Caching strategy** – Add revalidate hints and incremental static regeneration where possible.
5. **Content governance** – Replace placeholder links and copy with official resources.
6. **Email notifications** – Hook up transactional email for volunteer/contact submissions.
7. **Error monitoring** – Integrate Sentry for server/client errors.
8. **Storage policies** – Add automated clean-up job for orphaned media files.
9. **Admin tooling** – Build authenticated dashboard for staff to manage data.
10. **Localization** – Provide Spanish-language content for key pages.

See `docs/BACKLOG.json` for detailed remediation plan and patches.
