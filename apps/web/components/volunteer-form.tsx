'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { registerVolunteer } from '../mutations/register-volunteer';

const schema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  interests: z.array(z.string()).min(1, 'Select at least one interest'),
  availability: z.string().min(3, 'Tell us when you are available'),
  skills: z.string().optional()
});

type FormValues = z.infer<typeof schema>;

const interestOptions = [
  'Transport',
  'Events',
  'Fundraising',
  'Medical support',
  'Administrative'
];

export function VolunteerForm() {
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { interests: [] }
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      const result = await registerVolunteer(values);
      if (result.ok) {
        toast.success('Volunteer interest submitted!');
      } else {
        toast.error(result.error ?? 'Something went wrong');
      }
    });
  };

  return (
    <form className="space-y-6 rounded-3xl bg-white p-8 shadow-sm" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-stone-700">Full name</span>
          <input
            {...register('fullName')}
            aria-invalid={Boolean(errors.fullName)}
            className="rounded-lg border border-stone-200 px-4 py-3"
            placeholder="Alex Johnson"
            type="text"
          />
          {errors.fullName ? (
            <span className="text-sm text-red-600">{errors.fullName.message}</span>
          ) : null}
        </label>
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
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-stone-700">Phone</span>
          <input
            {...register('phone')}
            aria-invalid={Boolean(errors.phone)}
            className="rounded-lg border border-stone-200 px-4 py-3"
            placeholder="(555) 123-4567"
            type="tel"
          />
          {errors.phone ? <span className="text-sm text-red-600">{errors.phone.message}</span> : null}
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-stone-700">Availability</span>
          <input
            {...register('availability')}
            aria-invalid={Boolean(errors.availability)}
            className="rounded-lg border border-stone-200 px-4 py-3"
            placeholder="Weeknights, weekends, etc."
            type="text"
          />
          {errors.availability ? (
            <span className="text-sm text-red-600">{errors.availability.message}</span>
          ) : null}
        </label>
      </div>
      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-stone-700">Areas of interest</legend>
        <div className="flex flex-wrap gap-3">
          {interestOptions.map((interest) => (
            <label key={interest} className="flex items-center gap-2 rounded-full border border-stone-200 px-3 py-2">
              <input {...register('interests')} type="checkbox" value={interest} />
              <span className="text-sm text-stone-600">{interest}</span>
            </label>
          ))}
        </div>
        {errors.interests ? (
          <span className="text-sm text-red-600">{errors.interests.message}</span>
        ) : null}
      </fieldset>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-stone-700">Relevant experience (optional)</span>
        <textarea
          {...register('skills')}
          className="rounded-lg border border-stone-200 px-4 py-3"
          placeholder="Tell us about transport, event planning, or other skills."
          rows={4}
        />
      </label>
      <button
        className="w-full rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-400"
        disabled={pending}
        type="submit"
      >
        {pending ? 'Submitting…' : 'Submit interest'}
      </button>
    </form>
  );
}
