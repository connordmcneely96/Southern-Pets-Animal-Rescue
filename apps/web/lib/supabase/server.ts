import { cookies, headers } from 'next/headers';
import { createServerClient } from '@supabase/auth-helpers-nextjs';
import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseCredentials } from './config';

type GenericSupabaseClient = SupabaseClient<any, any, any>;

export function createServerSupabaseClient(): GenericSupabaseClient | null {
  const credentials = getSupabaseCredentials();

  if (!credentials) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Supabase environment variables are not configured. Server features will be disabled.');
    }
    return null;
  }

  const cookieStore = cookies();
  const headerList = headers();

  return createServerClient(credentials.url, credentials.anonKey, {
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value ?? null;
      },
      set(name, value, options) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name, options) {
        cookieStore.delete({ name, ...options });
      }
    },
    headers: () => headerList
  }) as GenericSupabaseClient;
}
