'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/adopt', label: 'Adopt' },
  { href: '/about', label: 'About' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/donate', label: 'Donate' },
  { href: '/contact', label: 'Contact' }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link className="text-xl font-bold text-orange-600" href="/">
          Southern Pets
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-stone-600 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              className={cn(
                'transition hover:text-orange-600',
                pathname === item.href ? 'text-orange-600' : undefined
              )}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
          <Link className="rounded-full bg-orange-500 px-4 py-2 text-white" href="/account">
            Sign in
          </Link>
        </nav>
        <button
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="rounded-full border border-stone-200 p-2 text-stone-600 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          type="button"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-stone-200 bg-white p-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium text-stone-600">
            {navigation.map((item) => (
              <Link
                key={item.href}
                className={cn(
                  'rounded-lg px-3 py-2 hover:bg-stone-100 hover:text-orange-600',
                  pathname === item.href ? 'bg-stone-100 text-orange-600' : undefined
                )}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link className="rounded-lg bg-orange-500 px-3 py-2 text-white" href="/account">
              Sign in
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
