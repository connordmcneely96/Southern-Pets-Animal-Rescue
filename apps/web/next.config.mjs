import { createSecureHeaders } from 'next-secure-headers';

const isProd = process.env.NODE_ENV === 'production';

const securityHeaders = createSecureHeaders({
  forceHTTPSRedirect: isProd
    ? [true, { maxAge: 63072000, includeSubDomains: true, preload: true }]
    : [false],
  referrerPolicy: 'no-referrer-when-downgrade',
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https://images.unsplash.com'],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://www.googletagmanager.com'],
      connectSrc: ["'self'", 'https://*.supabase.co'],
      styleSrc: ["'self'", "'unsafe-inline'"],
      frameSrc: ['https://js.stripe.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com']
    }
  }
});

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
    typedRoutes: true
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: securityHeaders
    }
  ],
  images: {
    domains: ['images.unsplash.com', 'files.stripe.com']
  }
};

export default nextConfig;
