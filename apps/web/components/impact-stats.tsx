const stats = [
  { label: 'Animals rescued since 2015', value: '4,287+' },
  { label: 'Foster families in our network', value: '320' },
  { label: 'Veterinary partners', value: '42' }
];

export function ImpactStats() {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-semibold text-stone-900">Impact snapshot</h2>
      <p className="mt-2 max-w-2xl text-stone-600">
        Community support powers transports, medical treatments, and adoption events throughout
        Alabama, Georgia, and Tennessee.
      </p>
      <dl className="mt-8 grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-stone-100 p-6">
            <dt className="text-sm font-medium uppercase tracking-wide text-stone-500">
              {stat.label}
            </dt>
            <dd className="mt-3 text-3xl font-semibold text-stone-900">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
