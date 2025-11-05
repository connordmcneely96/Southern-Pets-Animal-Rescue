import Link from 'next/link';
import { Suspense } from 'react';
import { FeaturedPets } from '../components/featured-pets';
import { Hero } from '../components/hero';
import { ImpactStats } from '../components/impact-stats';
import { UpcomingEvents } from '../components/upcoming-events';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      <Hero />
      <Suspense fallback={<p className="text-center">Loading featured pets…</p>}>
        <FeaturedPets />
      </Suspense>
      <ImpactStats />
      <Suspense fallback={<p className="text-center">Loading upcoming events…</p>}>
        <UpcomingEvents />
      </Suspense>
      <section className="grid gap-6 rounded-3xl bg-white p-8 shadow-sm md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-semibold text-stone-900">Become a foster</h2>
          <p className="mt-2 text-stone-600">
            Provide a safe space for pets to heal while they wait for their forever homes.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-stone-900">Join the volunteer team</h2>
          <p className="mt-2 text-stone-600">
            From transport to adoption events, there is a meaningful way to give your time.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-stone-900">Support the mission</h2>
          <p className="mt-2 text-stone-600">
            Monthly giving keeps veterinary care, transport, and supplies funded year-round.
          </p>
          <Link className="mt-4 inline-flex items-center font-semibold text-primary" href="/donate">
            Donate now →
          </Link>
        </div>
      </section>
    </div>
  );
}
