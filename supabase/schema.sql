-- Basic starter schema for backend bootstrapping
-- Run this in your Supabase SQL editor

create table if not exists app_health (
  id bigint generated always as identity primary key,
  ok boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists chat_rooms (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  last_message_at timestamptz
);

create table if not exists messages (
  id bigint generated always as identity primary key,
  room_id uuid not null references chat_rooms(id) on delete cascade,
  sender_id uuid not null,
  text text not null,
  created_at timestamptz not null default now()
);

-- Example RLS (tune later once auth is wired)
alter table chat_rooms enable row level security;
alter table messages enable row level security;

-- Everyone can read chat for now (dev only)
create policy "dev read rooms" on chat_rooms for select using (true);
create policy "dev read messages" on messages for select using (true);

-- Inserts allowed (dev only); backend will use service role in prod
create policy "dev insert messages" on messages for insert with check (true);
