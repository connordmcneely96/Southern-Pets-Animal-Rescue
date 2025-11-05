import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '../../../lib/supabase/server';
import { AuthForm } from '../../../components/auth-form';

export const metadata: Metadata = {
  title: 'Account | Southern Pets Animal Rescue'
};

export default async function AccountPage() {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    return (
      <section className="space-y-6">
        <h1 className="text-4xl font-semibold text-stone-900">Sign in or create an account</h1>
        <p className="text-stone-600">
          Supabase credentials are not configured. Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to enable authentication in development.
        </p>
      </section>
    );
  }

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
