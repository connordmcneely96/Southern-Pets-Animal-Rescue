# Simulated Fix PRs

## PR 1: Add rate limiting middleware
- **Title:** chore: add edge rate limiting middleware
- **Body:**
  - implement IP-based rate limiting using Vercel KV
  - protect volunteer/contact/donation endpoints from abuse
  - add regression tests for middleware behavior
- **Changed files:**
  - apps/web/middleware.ts
  - package.json (add `@vercel/kv`)
  - tests/e2e/rate-limit.spec.ts
- **Diff excerpt:**
  ```diff
  +import { kv } from '@vercel/kv';
  +const WINDOW = 60;
  +const LIMIT = 20;
  +export async function middleware(request: Request) {
  +  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
  +  const hits = await kv.incr(`ratelimit:${ip}`);
  +  if (hits === 1) await kv.expire(`ratelimit:${ip}`, WINDOW);
  +  if (hits > LIMIT) return new NextResponse('Too many requests', { status: 429 });
  +  return NextResponse.next();
  +}
  ```
- **Tests:** `pnpm e2e --filter rate-limit.spec.ts`

## PR 2: Add animal JSON-LD structured data
- **Title:** feat: expose adoptable animal structured data
- **Body:** Adds schema.org `Product` JSON-LD to animal detail pages for SEO.
- **Changed files:** `apps/web/app/(routes)/animals/[id]/page.tsx`
- **Diff excerpt:**
  ```diff
  +  const jsonLd = {
  +    '@context': 'https://schema.org',
  +    '@type': 'Product',
  +    name: animal.name,
  +    description: animal.summary,
  +    sku: animal.id,
  +    offers: {
  +      '@type': 'Offer',
  +      availability: animal.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
  +      price: 150,
  +      priceCurrency: 'USD'
  +    }
  +  };
  +  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  ```
- **Tests:** `pnpm lint`

## PR 3: Enforce accessibility via axe-core
- **Title:** test: add axe-core scan to homepage e2e
- **Body:** Runs axe-core audit inside Playwright to ensure no regressions.
- **Changed files:** `tests/e2e/home.spec.ts`, `package.json` devDependency `@axe-core/playwright`.
- **Diff excerpt:**
  ```diff
  +import AxeBuilder from '@axe-core/playwright';
  +const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  +expect(accessibilityScanResults.violations).toEqual([]);
  ```
- **Tests:** `pnpm e2e`

## PR 4: Structured logging for server actions
- **Title:** chore: add pino logging to server actions
- **Body:** Introduces `pino` logger to capture server action outcomes.
- **Changed files:**
  - apps/web/mutations/create-donation-session.ts
  - apps/web/mutations/register-volunteer.ts
  - apps/web/mutations/submit-contact.ts
  - package.json (dependency `pino`)
- **Diff excerpt:**
  ```diff
  +import pino from 'pino';
  +const logger = pino({ name: 'donations' });
  +logger.info({ session: session.id }, 'created donation session');
  ```
- **Tests:** `pnpm test`

## PR 5: Email notifications for contact requests
- **Title:** feat: notify staff on new contact requests
- **Body:** Sends transactional email via Resend when contact form submitted.
- **Changed files:** `apps/web/mutations/submit-contact.ts`, `.env.example` (Resend env vars).
- **Diff excerpt:**
  ```diff
  +if (process.env.RESEND_API_KEY && process.env.CONTACT_NOTIFICATION_EMAIL) {
  +  const resend = new Resend(process.env.RESEND_API_KEY);
  +  await resend.emails.send({ ... });
  +}
  ```
- **Tests:** `pnpm test`
