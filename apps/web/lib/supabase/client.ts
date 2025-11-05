import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseCredentials } from './config';

type GenericSupabaseClient = SupabaseClient<any, any, any>;

export function createClient(): GenericSupabaseClient | null {
  const credentials = getSupabaseCredentials();

  if (!credentials) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Supabase environment variables are not configured. Auth features are disabled.');
    }
    return null;
  }

  return createBrowserClient(credentials.url, credentials.anonKey) as GenericSupabaseClient;
}
