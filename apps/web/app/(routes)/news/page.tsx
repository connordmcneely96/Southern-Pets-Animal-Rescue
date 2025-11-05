import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News | Southern Pets Animal Rescue'
};

const posts = [
  {
    title: '2023 Impact Report',
    description: 'Highlights from lifesaving transports, medical cases, and community outreach.',
    href: '#'
  },
  {
    title: 'Disaster Response Partnership',
    description: 'How our volunteers mobilized to support shelters after severe storms.',
    href: '#'
  }
];

export default function NewsPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-4xl font-semibold text-stone-900">Latest updates</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.title} className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-stone-900">{post.title}</h2>
            <p className="mt-2 text-stone-600">{post.description}</p>
            <a className="mt-4 inline-flex items-center font-semibold text-primary" href={post.href}>
              Read more →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
