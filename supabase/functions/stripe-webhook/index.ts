import Stripe from 'stripe';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  const body = await req.text();

  if (!Deno.env.get('STRIPE_WEBHOOK_SECRET')) {
    return new Response(JSON.stringify({ error: 'Webhook secret missing' }), { status: 500 });
  }

  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
    apiVersion: '2023-10-16',
    httpClient: Stripe.createFetchHttpClient()
  });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature!, Deno.env.get('STRIPE_WEBHOOK_SECRET')!);
  } catch (err) {
    return new Response(JSON.stringify({ error: `Invalid signature: ${err.message}` }), { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    await fetch(`${Deno.env.get('SUPABASE_URL')}/rest/v1/rpc/mark_donation_completed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: Deno.env.get('SUPABASE_ANON_KEY')!,
        Authorization: `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`
      },
      body: JSON.stringify({ session_id: session.id })
    });
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
});
