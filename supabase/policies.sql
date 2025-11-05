alter table public.profiles enable row level security;
alter table public.animals enable row level security;
alter table public.animal_images enable row level security;
alter table public.events enable row level security;
alter table public.volunteer_applications enable row level security;
alter table public.contact_requests enable row level security;
alter table public.donation_intents enable row level security;
alter table public.media_assets enable row level security;

create policy "Public read animals" on public.animals for select using (true);
create policy "Staff manage animals" on public.animals
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Public read images" on public.animal_images for select using (true);
create policy "Staff manage images" on public.animal_images
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Public read events" on public.events for select using (true);
create policy "Staff manage events" on public.events
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Submit volunteer applications" on public.volunteer_applications for insert
  with check (true);
create policy "View own volunteer applications" on public.volunteer_applications for select
  using (coalesce(email, '') = auth.jwt()->>'email');
create policy "Staff review volunteer applications" on public.volunteer_applications for select using (auth.role() = 'authenticated');

create policy "Submit contact requests" on public.contact_requests for insert with check (true);
create policy "Staff view contact requests" on public.contact_requests for select using (auth.role() = 'authenticated');

create policy "Insert donation intents" on public.donation_intents for insert with check (true);
create policy "Own donation intents" on public.donation_intents for select using (donor_id = auth.uid());
create policy "Admin read donation intents" on public.donation_intents for select using (auth.role() = 'authenticated');

create policy "Manage own media" on public.media_assets for all using (owner = auth.uid()) with check (owner = auth.uid());
create policy "Read public media" on public.media_assets for select using (true);

create policy "Manage profile" on public.profiles for select using (auth.uid() = id);
create policy "Update own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
