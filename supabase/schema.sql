-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query)
-- for the trainer.html cross-device sync feature.

create table if not exists public.trainer_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.trainer_data enable row level security;

-- Each signed-in user can only ever read/write their own row.
create policy "select own trainer_data"
  on public.trainer_data for select
  using (auth.uid() = user_id);

create policy "insert own trainer_data"
  on public.trainer_data for insert
  with check (auth.uid() = user_id);

create policy "update own trainer_data"
  on public.trainer_data for update
  using (auth.uid() = user_id);
