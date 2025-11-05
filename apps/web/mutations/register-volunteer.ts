'use server';

import { z } from 'zod';
import { createServerSupabaseClient } from '../lib/supabase/server';

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  interests: z.array(z.string()).min(1),
  availability: z.string().min(3),
  skills: z.string().optional()
});

export async function registerVolunteer(input: z.infer<typeof schema>) {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: 'Invalid input' };
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return {
      ok: false,
      error: 'Supabase is not configured. Add your project credentials to store volunteer registrations.'
    };
  }

  const { error } = await supabase.from('volunteer_applications').insert({
    full_name: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    interests: parsed.data.interests,
    availability: parsed.data.availability,
    skills: parsed.data.skills ?? null
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
