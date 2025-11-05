import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adoption Resources | Southern Pets Animal Rescue'
};

export default function AdoptionResourcesPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-4xl font-semibold text-stone-900">Adoption resources</h1>
      <ul className="space-y-4 text-lg text-stone-600">
        <li>
          <a className="font-semibold text-primary" href="https://www.avma.org/resources" rel="noreferrer" target="_blank">
            Vet care basics
          </a>
          : Preparing for regular wellness visits and emergency care.
        </li>
        <li>
          <a className="font-semibold text-primary" href="https://www.aspca.org/pet-care" rel="noreferrer" target="_blank">
            ASPCA pet care guides
          </a>
          : Species-specific training and enrichment tips.
        </li>
        <li>
          <a className="font-semibold text-primary" href="https://fearfreehappyhomes.com" rel="noreferrer" target="_blank">
            Fear Free Happy Homes
          </a>
          : Building trust with newly adopted animals.
        </li>
      </ul>
    </section>
  );
}
