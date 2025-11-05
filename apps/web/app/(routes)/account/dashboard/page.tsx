import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '../../../../lib/supabase/server';

export const metadata: Metadata = {
  title: 'Dashboard | Southern Pets Animal Rescue'
};

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    return (
      <section className="space-y-6">
        <h1 className="text-4xl font-semibold text-stone-900">Welcome back</h1>
        <p className="text-stone-600">
          Supabase credentials are missing. Add the required environment variables to access the account
          dashboard.
        </p>
      </section>
    );
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/account');
  }

  return (
    <section className="space-y-6">
      <h1 className="text-4xl font-semibold text-stone-900">Welcome back, {user.email}</h1>
      <p className="text-lg text-stone-600">
        Manage your applications, donations, and foster information. Additional admin tools are coming soon.
      </p>
    </section>
  );
}
