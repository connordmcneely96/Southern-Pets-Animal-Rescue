create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

create type public.animal_status as enum ('available', 'pending', 'adopted');
create type public.donation_status as enum ('initiated', 'processing', 'completed', 'failed');

create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  phone text,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

create table if not exists public.animals (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  species text not null,
  breed text,
  age_years numeric,
  weight_lbs numeric,
  status animal_status not null default 'available',
  summary text,
  behavior_notes text,
  medical_notes text,
  thumbnail_url text,
  hero_url text,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

create table if not exists public.animal_images (
  id uuid primary key default uuid_generate_v4(),
  animal_id uuid not null references public.animals on delete cascade,
  image_url text not null,
  is_primary boolean default false,
  created_at timestamp with time zone default timezone('utc', now())
);

create table if not exists public.events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  location text not null,
  start_at timestamp with time zone not null,
  end_at timestamp with time zone,
  registration_url text,
  created_by uuid references public.profiles,
  created_at timestamp with time zone default timezone('utc', now())
);

create table if not exists public.volunteer_applications (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null,
  phone text,
  interests text[] not null,
  availability text not null,
  skills text,
  status text default 'submitted',
  created_at timestamp with time zone default timezone('utc', now())
);

create table if not exists public.contact_requests (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  topic text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc', now())
);

create table if not exists public.donation_intents (
  id uuid primary key default uuid_generate_v4(),
  stripe_session_id text not null,
  amount numeric not null,
  recurring boolean default false,
  status donation_status not null default 'initiated',
  donor_id uuid references public.profiles,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

create table if not exists public.media_assets (
  id uuid primary key default uuid_generate_v4(),
  bucket_id text not null,
  path text not null,
  owner uuid references public.profiles,
  created_at timestamp with time zone default timezone('utc', now())
);

create index if not exists idx_animals_status on public.animals(status);
create index if not exists idx_animals_created_at on public.animals(created_at desc);
create index if not exists idx_events_start_at on public.events(start_at);
create index if not exists idx_volunteer_applications_email on public.volunteer_applications(email);
create index if not exists idx_contact_requests_topic on public.contact_requests(topic);
create index if not exists idx_donation_intents_session on public.donation_intents(stripe_session_id);

