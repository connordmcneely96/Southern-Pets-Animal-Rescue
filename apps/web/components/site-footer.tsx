import Link from 'next/link';

const footerLinks = [
  {
    heading: 'Adopt',
    links: [
      { href: '/adopt', label: 'Available pets' },
      { href: '/adopt/process', label: 'Adoption process' },
      { href: '/adopt/resources', label: 'Resources' }
    ]
  },
  {
    heading: 'Get involved',
    links: [
      { href: '/volunteer', label: 'Volunteer' },
      { href: '/foster', label: 'Become a foster' },
      { href: '/donate', label: 'Donate' }
    ]
  },
  {
    heading: 'Organization',
    links: [
      { href: '/about', label: 'About us' },
      { href: '/contact', label: 'Contact' },
      { href: '/news', label: 'News' }
    ]
  }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <p className="text-lg font-semibold text-orange-600">Southern Pets Animal Rescue</p>
          <p className="text-sm text-stone-500">
            A 501(c)(3) nonprofit organization. Donations are tax deductible as allowed by law.
          </p>
          <p className="text-sm text-stone-500">© {new Date().getFullYear()} Southern Pets Animal Rescue.</p>
        </div>
        {footerLinks.map((section) => (
          <div key={section.heading}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
              {section.heading}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-stone-600">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link className="transition hover:text-orange-600" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
