import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.southernpetsanimalrescue.org';
  const routes = [
    '',
    '/about',
    '/adopt',
    '/adopt/process',
    '/adopt/resources',
    '/volunteer',
    '/donate',
    '/contact',
    '/foster',
    '/news',
    '/account'
  ];
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changefreq: 'weekly',
    priority: route === '' ? 1 : 0.7
  }));
}
