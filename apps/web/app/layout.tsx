import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../app/globals.css';
import { cn } from '../lib/utils';
import { Providers } from '../components/providers';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { AnalyticsScripts } from '../components/analytics';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Southern Pets Animal Rescue',
  description: 'Adopt, foster, or support Southern Pets Animal Rescue.',
  metadataBase: new URL('https://www.southernpetsanimalrescue.org'),
  openGraph: {
    title: 'Southern Pets Animal Rescue',
    description: 'Connecting pets with loving families across the South.',
    url: 'https://www.southernpetsanimalrescue.org',
    siteName: 'Southern Pets Animal Rescue'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'min-h-screen bg-stone-50 text-stone-900')}>
        <Providers>
          <SiteHeader />
          <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-4 py-8">
            {children}
          </main>
          <SiteFooter />
        </Providers>
        <Analytics />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
