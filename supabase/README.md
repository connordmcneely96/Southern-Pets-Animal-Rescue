# Supabase local development

1. Install the Supabase CLI (`npm i -g supabase`).
2. Copy environment variables: `cp ../.env.example ../.env` and fill in Supabase keys.
3. Start the local stack: `supabase start`.
4. Apply schema and policies: `supabase db reset --linked`.
5. Edge Functions live in `supabase/functions`. Deploy with `supabase functions deploy`.
