import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '../../../lib/supabase/server';

export async function POST(request: Request) {
  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Supabase is not configured. Set the required environment variables to accept volunteers.' },
      { status: 503 }
    );
  }

  const body = await request.json();
  const { error } = await supabase.from('volunteer_applications').insert(body);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
