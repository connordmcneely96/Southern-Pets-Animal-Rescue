insert into public.animals (id, name, species, breed, age_years, weight_lbs, status, summary, behavior_notes, medical_notes, thumbnail_url, hero_url)
values
  (uuid_generate_v4(), 'Maple', 'Dog', 'Retriever mix', 2.5, 48, 'available', 'Gentle cuddle bug who loves hiking and squeaky toys.', 'Enjoys other dogs after slow introductions.', 'Completed heartworm treatment in 2023; on monthly prevention.', 'https://images.unsplash.com/photo-1517849845537-4d257902454a', null),
  (uuid_generate_v4(), 'Juniper', 'Dog', 'Hound mix', 1.2, 38, 'available', 'Playful pup who thrives with active families.', 'Working on loose-leash walking and impulse control.', 'Spayed, vaccinated, and microchipped.', 'https://images.unsplash.com/photo-1507149833265-60c372daea22', null),
  (uuid_generate_v4(), 'Cedar', 'Cat', 'Domestic shorthair', 3.1, 12, 'pending', 'Lap cat who prefers quiet homes and sunny windowsills.', 'Prefers slow introductions to other cats; calm dogs are fine.', 'On special diet for sensitive stomach.', 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131', null);

insert into public.events (id, title, description, location, start_at, end_at, registration_url)
values
  (uuid_generate_v4(), 'Spring Adoption Festival', 'Meet 40+ adoptable pets, enjoy food trucks, and family activities.', 'Railroad Park, Birmingham, AL', timezone('utc', now()) + interval '14 days', timezone('utc', now()) + interval '14 days 4 hours', 'https://eventbrite.com/e/southern-pets-spring-festival'),
  (uuid_generate_v4(), 'Volunteer Orientation', 'Learn about transport, event, and foster opportunities.', 'Virtual (Zoom link provided)', timezone('utc', now()) + interval '7 days', timezone('utc', now()) + interval '7 days 1 hour', 'https://southernpetsanimalrescue.org/volunteer');

insert into public.volunteer_applications (full_name, email, phone, interests, availability, skills)
values
  ('Taylor Morgan', 'taylor@example.com', '555-111-2222', '{Transport,Events}', 'Weekends', 'Experience with large dog handling.'),
  ('Jordan Lee', 'jordan@example.com', '555-987-6543', '{Administrative}', 'Weekday evenings', 'Graphic design and email marketing.');

insert into public.contact_requests (name, email, topic, message)
values
  ('Casey Rivera', 'casey@example.com', 'adoption', 'I would like to learn more about Maple and the adoption process.'),
  ('Avery Chen', 'avery@example.com', 'donation', 'Can I donate supplies instead of money?');
