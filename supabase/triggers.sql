create trigger set_animals_updated_at
before update on public.animals
for each row execute function public.update_updated_at();

create trigger set_donations_updated_at
before update on public.donation_intents
for each row execute function public.update_updated_at();
