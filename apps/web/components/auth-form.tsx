'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createClient } from '../lib/supabase/client';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type FormValues = z.infer<typeof schema>;

type Mode = 'sign-in' | 'sign-up' | 'reset';

export function AuthForm() {
  const [mode, setMode] = useState<Mode>('sign-in');
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const supabase = createClient();

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      if (mode === 'sign-in') {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password
        });
        if (error) {
          toast.error(error.message);
          return;
        }
        router.refresh();
      } else if (mode === 'sign-up') {
        const { error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password
        });
        if (error) {
          toast.error(error.message);
          return;
        }
        toast.success('Check your email to confirm your account.');
        reset();
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
          redirectTo: `${window.location.origin}/account/reset`
        });
        if (error) {
          toast.error(error.message);
          return;
        }
        toast.success('Password reset email sent.');
        reset();
      }
    });
  };

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="flex items-center gap-3 text-sm font-medium text-stone-500">
        <button
          className={mode === 'sign-in' ? 'text-orange-500' : ''}
          onClick={() => setMode('sign-in')}
          type="button"
        >
          Sign in
        </button>
        <span>·</span>
        <button
          className={mode === 'sign-up' ? 'text-orange-500' : ''}
          onClick={() => setMode('sign-up')}
          type="button"
        >
          Create account
        </button>
        <span>·</span>
        <button
          className={mode === 'reset' ? 'text-orange-500' : ''}
          onClick={() => setMode('reset')}
          type="button"
        >
          Reset password
        </button>
      </div>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-stone-700">Email</span>
          <input
            {...register('email')}
            aria-invalid={Boolean(errors.email)}
            className="rounded-lg border border-stone-200 px-4 py-3"
            placeholder="you@example.com"
            type="email"
          />
          {errors.email ? <span className="text-sm text-red-600">{errors.email.message}</span> : null}
        </label>
        {mode !== 'reset' ? (
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-stone-700">Password</span>
            <input
              {...register('password')}
              aria-invalid={Boolean(errors.password)}
              className="rounded-lg border border-stone-200 px-4 py-3"
              placeholder="••••••••"
              type="password"
            />
            {errors.password ? (
              <span className="text-sm text-red-600">{errors.password.message}</span>
            ) : null}
          </label>
        ) : null}
        <button
          className="w-full rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-400"
          disabled={pending}
          type="submit"
        >
          {pending
            ? 'Working…'
            : mode === 'sign-in'
              ? 'Sign in'
              : mode === 'sign-up'
                ? 'Create account'
                : 'Send reset link'}
        </button>
      </form>
      <div className="mt-6 space-y-3 text-sm text-stone-600">
        <button
          className="w-full rounded-full border border-stone-200 px-6 py-3"
          onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
          type="button"
        >
          Continue with Google
        </button>
        <button
          className="w-full rounded-full border border-stone-200 px-6 py-3"
          onClick={() => supabase.auth.signInWithOAuth({ provider: 'facebook' })}
          type="button"
        >
          Continue with Facebook
        </button>
        <button
          className="w-full rounded-full border border-stone-200 px-6 py-3"
          onClick={() => supabase.auth.signInWithOtp({ email: prompt('Enter your email for magic link') ?? '' })}
          type="button"
        >
          Send me a magic link
        </button>
      </div>
    </div>
  );
}
