'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { createDonationSession } from '../mutations/create-donation-session';

const schema = z.object({
  amount: z.coerce.number().min(5, 'Minimum donation is $5'),
  recurring: z.boolean().default(false)
});

export function DonatePanel() {
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { amount: 50, recurring: true }
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    startTransition(async () => {
      const result = await createDonationSession(values);
      if (result.ok && result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else {
        toast.error(result.error ?? 'Unable to start checkout');
      }
    });
  };

  return (
    <form className="grid gap-6 rounded-3xl bg-white p-8 shadow-sm md:grid-cols-[1fr_auto]" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-stone-700" htmlFor="amount">
            Donation amount (USD)
          </label>
          <input
            {...register('amount')}
            className="mt-2 w-full rounded-lg border border-stone-200 px-4 py-3"
            id="amount"
            min={5}
            step={5}
            type="number"
          />
          {errors.amount ? (
            <p className="mt-2 text-sm text-red-600">{errors.amount.message}</p>
          ) : null}
        </div>
        <label className="flex items-center gap-3">
          <input {...register('recurring')} type="checkbox" />
          <span className="text-sm text-stone-600">Make this a monthly donation</span>
        </label>
      </div>
      <div className="flex flex-col justify-between gap-4">
        <div className="rounded-2xl bg-stone-100 p-4 text-sm text-stone-600">
          <p>Your donation supports transports, emergency vetting, and community pet pantry events.</p>
        </div>
        <button
          className="rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-400"
          disabled={pending}
          type="submit"
        >
          {pending ? 'Processing…' : 'Donate securely'}
        </button>
      </div>
    </form>
  );
}
