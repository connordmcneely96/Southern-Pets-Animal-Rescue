'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import Stripe from 'stripe';
import { createServerSupabaseClient } from '../lib/supabase/server';

const schema = z.object({
  amount: z.number().min(5),
  recurring: z.boolean().default(false)
});

export async function createDonationSession(input: { amount: number; recurring: boolean }) {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: 'Invalid input' };
  }

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PUBLIC_KEY) {
    return { ok: false, error: 'Stripe is not configured' };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16'
  });

  const session = await stripe.checkout.sessions.create({
    mode: parsed.data.recurring ? 'subscription' : 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          recurring: parsed.data.recurring ? { interval: 'month' } : undefined,
          product_data: {
            name: parsed.data.recurring ? 'Monthly donation' : 'One-time donation'
          },
          unit_amount: parsed.data.amount * 100
        },
        quantity: 1
      }
    ],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/donate?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/donate?canceled=true`
  });

  const supabase = createServerSupabaseClient();
  await supabase.from('donation_intents').insert({
    amount: parsed.data.amount,
    recurring: parsed.data.recurring,
    stripe_session_id: session.id,
    status: 'initiated'
  });

  cookies().set('lastDonationIntent', session.id, { path: '/', httpOnly: true, sameSite: 'lax' });

  return { ok: true, checkoutUrl: session.url };
}
