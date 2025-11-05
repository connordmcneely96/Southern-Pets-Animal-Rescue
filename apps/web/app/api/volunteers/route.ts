import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerSupabaseClient } from '../../../lib/supabase/server';

const schema = z.object({
  full_name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  interests: z.array(z.string()).min(1),
  availability: z.string().min(2),
  skills: z.string().optional()
});

export async function POST(request: Request) {
  const supabase = createServerSupabaseClient();
  const payload = await request.json();
  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const { error } = await supabase.from('volunteer_applications').insert({
    full_name: parsed.data.full_name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    interests: parsed.data.interests,
    availability: parsed.data.availability,
    skills: parsed.data.skills ?? null
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
