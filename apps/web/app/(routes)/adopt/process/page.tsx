import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adoption Process | Southern Pets Animal Rescue'
};

export default function AdoptionProcessPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-4xl font-semibold text-stone-900">Our adoption process</h1>
      <ol className="space-y-4 text-lg text-stone-600">
        <li><strong>Apply:</strong> Complete the online application with household details.</li>
        <li><strong>Conversation:</strong> Our team schedules a call to understand your expectations.</li>
        <li><strong>Meet & greet:</strong> We connect you with the foster family to meet the pet.</li>
        <li><strong>Home visit:</strong> Volunteers verify the environment is safe and welcoming.</li>
        <li><strong>Finalize:</strong> Sign the adoption agreement and pay the adoption fee.</li>
      </ol>
    </section>
  );
}
