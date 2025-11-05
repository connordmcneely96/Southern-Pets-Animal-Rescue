import Link from 'next/link';

export function Hero() {
  return (
    <section className="grid gap-8 rounded-3xl bg-gradient-to-br from-orange-500 via-orange-400 to-amber-300 p-10 text-white shadow-xl md:grid-cols-2">
      <div className="space-y-6">
        <p className="inline-flex items-center rounded-full bg-white/20 px-4 py-1 text-sm font-semibold backdrop-blur">
          Southern Pets Animal Rescue
        </p>
        <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
          Rescue, rehabilitate, and rehome pets across the Southeast.
        </h1>
        <p className="text-lg text-white/90">
          We collaborate with shelters, fosters, and volunteers to give at-risk animals the second
          chance they deserve.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            className="rounded-full bg-white px-6 py-3 font-semibold text-orange-600 transition hover:bg-orange-50"
            href="/adopt"
          >
            View adoptable pets
          </Link>
          <Link
            className="rounded-full border border-white/70 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            href="/donate"
          >
            Donate now
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="aspect-square w-full max-w-xs rounded-full bg-white/20 p-6 text-center">
          <p className="text-6xl font-black">97%</p>
          <p className="mt-2 text-sm uppercase tracking-widest text-white/80">
            live release rate in 2023
          </p>
        </div>
      </div>
    </section>
  );
}
