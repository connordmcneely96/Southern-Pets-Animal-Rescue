import { Metadata } from 'next';
import { VolunteerForm } from '../../../components/volunteer-form';

export const metadata: Metadata = {
  title: 'Volunteer | Southern Pets Animal Rescue'
};

export default function VolunteerPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold text-stone-900">Volunteer with Southern Pets</h1>
        <p className="text-lg text-stone-600">
          We rely on compassionate people to transport animals, host adoption events, and manage
          fundraising initiatives. Complete the interest form and our volunteer coordinator will reach
          out within two business days.
        </p>
      </div>
      <VolunteerForm />
    </section>
  );
}
