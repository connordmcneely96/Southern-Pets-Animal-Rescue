import Image from 'next/image';
import Link from 'next/link';
import { createServerSupabaseClient } from '../lib/supabase/server';

export async function FeaturedPets() {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    return (
      <section className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-stone-900">Featured pets</h2>
            <p className="text-stone-600">
              Configure Supabase credentials to load live adoption data.
            </p>
          </div>
          <Link className="font-semibold text-primary" href="/adopt">
            Browse all pets →
          </Link>
        </div>
        <div className="rounded-2xl bg-stone-100 p-10 text-center text-stone-600">
          <p>Add your Supabase URL and anon key in the .env file to see available animals.</p>
        </div>
      </section>
    );
  }

  const { data } = await supabase
    .from('animals')
    .select('id, name, species, breed, age_years, thumbnail_url')
    .order('created_at', { ascending: false })
    .limit(3);

  const pets = data ?? [];

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-stone-900">Featured pets</h2>
          <p className="text-stone-600">Meet the animals who are ready for adoption this week.</p>
        </div>
        <Link className="font-semibold text-primary" href="/adopt">
          Browse all pets →
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {pets.map((pet) => (
          <article key={pet.id} className="rounded-2xl bg-white shadow-sm">
            {pet.thumbnail_url ? (
              <Image
                alt={pet.name}
                className="h-56 w-full rounded-t-2xl object-cover"
                height={256}
                src={pet.thumbnail_url}
                width={384}
              />
            ) : (
              <div className="flex h-56 items-center justify-center rounded-t-2xl bg-stone-100">
                <span className="text-stone-500">Image coming soon</span>
              </div>
            )}
            <div className="space-y-1 p-6">
              <h3 className="text-xl font-semibold text-stone-900">{pet.name}</h3>
              <p className="text-sm uppercase tracking-wide text-stone-500">
                {pet.species} · {pet.breed}
              </p>
              <p className="text-stone-600">{pet.age_years ?? 'Age unknown'} years old</p>
              <Link className="font-semibold text-primary" href={`/animals/${pet.id}`}>
                Learn more →
              </Link>
            </div>
          </article>
        ))}
        {pets.length === 0 ? (
          <div className="rounded-2xl bg-stone-100 p-10 text-center text-stone-600">
            <p>No animals are published yet. Add some through the Supabase dashboard.</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
