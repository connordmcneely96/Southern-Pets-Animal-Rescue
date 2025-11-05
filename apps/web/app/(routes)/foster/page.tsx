import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Foster | Southern Pets Animal Rescue'
};

export default function FosterPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-4xl font-semibold text-stone-900">Become a foster hero</h1>
      <p className="text-lg text-stone-600">
        Foster homes create space in overcrowded shelters and allow animals to decompress before
        adoption. We provide supplies, medical care, and training support so you can focus on loving
        the pet in your home.
      </p>
      <p className="text-lg text-stone-600">
        Complete the volunteer form and indicate that you are interested in fostering. Our team will
        match you with an animal that fits your experience level and lifestyle.
      </p>
    </section>
  );
}
