import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '../../../../lib/supabase/server';

interface AnimalPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: AnimalPageProps): Promise<Metadata> {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    return { title: 'Animal profile | Southern Pets Animal Rescue' };
  }

  const { data: animal } = await supabase
    .from('animals')
    .select('name, summary')
    .eq('id', params.id)
    .single();

  if (!animal) {
    return { title: 'Animal not found' };
  }

  return {
    title: `${animal.name} | Adopt | Southern Pets Animal Rescue`,
    description: animal.summary ?? undefined
  };
}

export default async function AnimalPage({ params }: AnimalPageProps) {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    return (
      <article className="space-y-6">
        <div className="rounded-3xl bg-stone-100 p-10 text-center text-stone-600">
          <p>
            Supabase environment variables are missing. Update <code>NEXT_PUBLIC_SUPABASE_URL</code> and
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to view animal profiles locally.
          </p>
        </div>
      </article>
    );
  }

  const { data: animal } = await supabase
    .from('animals')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!animal) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <Image
            alt={animal.name}
            className="h-96 w-full rounded-3xl object-cover"
            height={512}
            src={animal.hero_url ?? animal.thumbnail_url ?? 'https://images.unsplash.com/photo-1517849845537-4d257902454a'}
            width={768}
          />
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h1 className="text-4xl font-semibold text-stone-900">{animal.name}</h1>
            <p className="mt-2 text-stone-600">{animal.summary}</p>
            <dl className="mt-6 grid gap-3 text-sm text-stone-600 md:grid-cols-2">
              <div>
                <dt className="font-medium uppercase tracking-wide text-stone-500">Breed</dt>
                <dd>{animal.breed ?? 'Mixed'}</dd>
              </div>
              <div>
                <dt className="font-medium uppercase tracking-wide text-stone-500">Age</dt>
                <dd>{animal.age_years ? `${animal.age_years} years` : 'Unknown'}</dd>
              </div>
              <div>
                <dt className="font-medium uppercase tracking-wide text-stone-500">Weight</dt>
                <dd>{animal.weight_lbs ? `${animal.weight_lbs} lbs` : 'Unknown'}</dd>
              </div>
              <div>
                <dt className="font-medium uppercase tracking-wide text-stone-500">Status</dt>
                <dd className="font-semibold text-primary">
                  {animal.status === 'available' ? 'Available' : 'Adoption pending'}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <aside className="space-y-4">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-stone-900">Adoption steps</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-4 text-sm text-stone-600">
              <li>Submit an adoption application.</li>
              <li>Schedule a virtual meet and greet.</li>
              <li>Home visit and contract signing.</li>
            </ol>
          </div>
          <a
            className="block rounded-full bg-orange-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-orange-400"
            href="https://airtable.com/shrAdoption"
            rel="noreferrer"
            target="_blank"
          >
            Apply to adopt {animal.name}
          </a>
        </aside>
      </div>
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-stone-900">Behavior & medical</h2>
        <p className="mt-2 text-stone-600">{animal.behavior_notes ?? 'Behavior notes coming soon.'}</p>
        <p className="mt-2 text-stone-600">{animal.medical_notes ?? 'Medical updates coming soon.'}</p>
      </section>
    </article>
  );
}
