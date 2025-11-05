import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Southern Pets Animal Rescue'
};

export default function AboutPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-4xl font-semibold text-stone-900">About Southern Pets</h1>
      <p className="text-lg text-stone-600">
        Southern Pets Animal Rescue is a volunteer-powered nonprofit that transports, rehabilitates,
        and rehomes animals throughout the Southeastern United States. We collaborate with shelters,
        fosters, and veterinary partners to provide comprehensive care from intake to adoption.
      </p>
      <p className="text-lg text-stone-600">
        Our programs include medical sponsorship, disaster response, community outreach, and humane
        education. Transparency is central to our mission—we publish quarterly impact reports and
        make financials available to the public.
      </p>
    </section>
  );
}
