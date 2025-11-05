import { createServerSupabaseClient } from '../lib/supabase/server';

export async function UpcomingEvents() {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    return (
      <section className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-stone-900">Upcoming events</h2>
            <p className="text-stone-600">
              Add Supabase credentials to display scheduled events from your database.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-stone-100 p-8 text-center text-stone-600">
          <p>Populate <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to load events.</p>
        </div>
      </section>
    );
  }

  const { data } = await supabase
    .from('events')
    .select('id, title, location, start_at, end_at, registration_url')
    .gte('start_at', new Date().toISOString())
    .order('start_at', { ascending: true })
    .limit(3);

  const events = data ?? [];

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-stone-900">Upcoming events</h2>
          <p className="text-stone-600">Join adoption events, fundraisers, and volunteer trainings.</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {events.length === 0 ? (
          <div className="rounded-2xl bg-stone-100 p-8 text-center text-stone-600">
            <p>No events scheduled yet. Publish events via Supabase or the admin dashboard.</p>
          </div>
        ) : null}
        {events.map((event) => (
          <article key={event.id} className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              {new Date(event.start_at).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric'
              })}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-stone-900">{event.title}</h3>
            <p className="text-sm text-stone-500">{event.location}</p>
            <p className="mt-2 text-stone-600">
              {new Date(event.start_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
              {' – '}
              {event.end_at
                ? new Date(event.end_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
                : 'TBD'}
            </p>
            {event.registration_url ? (
              <a
                className="mt-4 inline-flex items-center font-semibold text-primary"
                href={event.registration_url}
                rel="noreferrer"
                target="_blank"
              >
                Register →
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
