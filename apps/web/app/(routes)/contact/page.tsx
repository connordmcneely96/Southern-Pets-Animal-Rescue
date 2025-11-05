import { Metadata } from 'next';
import { ContactForm } from '../../../components/contact-form';

export const metadata: Metadata = {
  title: 'Contact | Southern Pets Animal Rescue'
};

export default function ContactPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold text-stone-900">Contact us</h1>
        <p className="text-lg text-stone-600">
          Reach out with adoption questions, media requests, or partnership ideas. We respond to most
          messages within two business days.
        </p>
      </div>
      <ContactForm />
    </section>
  );
}
