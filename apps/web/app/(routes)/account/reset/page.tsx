import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset password | Southern Pets Animal Rescue'
};

export default function ResetPasswordPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-4xl font-semibold text-stone-900">Check your inbox</h1>
      <p className="text-lg text-stone-600">
        We sent you an email with a secure link to update your password. If it does not arrive within a
        few minutes, please check your spam folder or request another link.
      </p>
    </section>
  );
}
