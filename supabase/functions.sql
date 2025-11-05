create or replace function public.mark_donation_completed(session_id text)
returns void
language plpgsql
security definer
as $$
begin
  update public.donation_intents
    set status = 'completed', updated_at = timezone('utc', now())
    where stripe_session_id = session_id;
end;
$$;

create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;
