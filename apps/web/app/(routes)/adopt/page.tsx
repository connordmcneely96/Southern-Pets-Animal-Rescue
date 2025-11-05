import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { createServerSupabaseClient } from '../../../lib/supabase/server';

export const metadata: Metadata = {
  title: 'Adopt | Southern Pets Animal Rescue'
};

export default async function AdoptPage() {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    return (
      <section className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold text-stone-900">Find your new companion</h1>
          <p className="text-lg text-stone-600">
            Every adoption includes age-appropriate vaccinations, microchip registration, and spay/neuter
            surgery.
          </p>
        </div>
        <div className="rounded-3xl bg-stone-100 p-10 text-center text-stone-600">
          <p>
            Supabase is not configured. Add your project credentials to <code>.env</code> to browse adoption
            listings locally.
          </p>
        </div>
      </section>
    );
  }

  const { data: animals } = await supabase
    .from('animals')
    .select('*')
    .eq('status', 'available')
    .order('name', { ascending: true });

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold text-stone-900">Find your new companion</h1>
        <p className="text-lg text-stone-600">
          Every adoption includes age-appropriate vaccinations, microchip registration, and spay/neuter
          surgery.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {(animals ?? []).map((animal) => (
          <article key={animal.id} className="rounded-3xl bg-white shadow-sm">
            {animal.thumbnail_url ? (
              <Image
                alt={animal.name}
                className="h-56 w-full rounded-t-3xl object-cover"
                height={256}
                src={animal.thumbnail_url}
                width={384}
              />
            ) : (
              <div className="flex h-56 items-center justify-center rounded-t-3xl bg-stone-100">
                <span className="text-stone-500">Photo coming soon</span>
              </div>
            )}
            <div className="space-y-2 p-6">
              <h2 className="text-xl font-semibold text-stone-900">{animal.name}</h2>
              <p className="text-sm uppercase tracking-wide text-stone-500">
                {animal.species} · {animal.breed ?? 'Mixed'}
              </p>
              <p className="text-stone-600">{animal.summary}</p>
              <Link className="font-semibold text-primary" href={`/animals/${animal.id}`}>
                View profile →
              </Link>
            </div>
          </article>
        ))}
        {(animals ?? []).length === 0 ? (
          <div className="rounded-3xl bg-stone-100 p-10 text-center text-stone-600">
            <p>No animals are listed yet. Add records via Supabase migrations or admin dashboard.</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
