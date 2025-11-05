import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '../../../lib/supabase/server';
import { AuthForm } from '../../../components/auth-form';

export const metadata: Metadata = {
  title: 'Account | Southern Pets Animal Rescue'
};

export default async function AccountPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/account/dashboard');
  }

  return (
    <section className="space-y-6">
      <h1 className="text-4xl font-semibold text-stone-900">Sign in or create an account</h1>
      <AuthForm />
    </section>
  );
}
