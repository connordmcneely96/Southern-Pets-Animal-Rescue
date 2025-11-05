import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '../../../lib/supabase/server';

export async function GET() {
  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Supabase is not configured. Populate environment variables to enable this API.' },
      { status: 503 }
    );
  }

  const { data, error } = await supabase.from('animals').select('*').eq('status', 'available');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ animals: data });
}
