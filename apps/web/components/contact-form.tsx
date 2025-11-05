'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { submitContact } from '../mutations/submit-contact';

const schema = z.object({
  name: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  topic: z.enum(['adoption', 'volunteer', 'donation', 'media', 'other'])
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { topic: 'adoption' }
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      const result = await submitContact(values);
      if (result.ok) {
        toast.success('Message sent!');
        reset();
      } else {
        toast.error(result.error ?? 'Unable to send message');
      }
    });
  };

  return (
    <form className="grid gap-6 rounded-3xl bg-white p-8 shadow-sm" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-stone-700">Name</span>
          <input
            {...register('name')}
            aria-invalid={Boolean(errors.name)}
            className="rounded-lg border border-stone-200 px-4 py-3"
            placeholder="Your name"
            type="text"
          />
          {errors.name ? <span className="text-sm text-red-600">{errors.name.message}</span> : null}
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
      </div>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-stone-700">Topic</span>
        <select
          {...register('topic')}
          className="rounded-lg border border-stone-200 px-4 py-3"
          defaultValue="adoption"
        >
          <option value="adoption">Adoption</option>
          <option value="volunteer">Volunteer</option>
          <option value="donation">Donation</option>
          <option value="media">Media</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-stone-700">Message</span>
        <textarea
          {...register('message')}
          aria-invalid={Boolean(errors.message)}
          className="rounded-lg border border-stone-200 px-4 py-3"
          placeholder="How can we help?"
          rows={5}
        />
        {errors.message ? (
          <span className="text-sm text-red-600">{errors.message.message}</span>
        ) : null}
      </label>
      <button
        className="rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-400"
        disabled={pending}
        type="submit"
      >
        {pending ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
