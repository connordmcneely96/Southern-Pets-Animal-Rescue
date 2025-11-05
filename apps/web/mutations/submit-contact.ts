'use server';

import { z } from 'zod';
import { createServerSupabaseClient } from '../lib/supabase/server';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  topic: z.enum(['adoption', 'volunteer', 'donation', 'media', 'other'])
});

export async function submitContact(input: z.infer<typeof schema>) {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: 'Invalid input' };
  }

  const supabase = createServerSupabaseClient();
  const { error } = await supabase.from('contact_requests').insert({
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
    topic: parsed.data.topic
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
