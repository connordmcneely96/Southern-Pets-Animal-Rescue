import { Metadata } from 'next';
import { DonatePanel } from '../../../components/donate-panel';

export const metadata: Metadata = {
  title: 'Donate | Southern Pets Animal Rescue'
};

export default function DonatePage() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold text-stone-900">Fuel lifesaving work</h1>
        <p className="text-lg text-stone-600">
          Recurring gifts give us predictable resources for medical care, transports, and outreach.
          Choose a donation amount or enter your own and you will be redirected to a secure Stripe
          checkout page.
        </p>
      </div>
      <DonatePanel />
    </section>
  );
}
