create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  product_name text not null,
  description text not null,
  pricing text not null,
  icp text not null,
  website text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  company_name text not null,
  website text not null,
  industry text not null,
  employee_count integer,
  reason_match text not null,
  score integer not null default 50 check (score between 0 and 100),
  research_summary text,
  pain_points text[] not null default '{}',
  outreach_angle text,
  created_at timestamptz not null default now()
);

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  name text not null,
  role text not null,
  linkedin_url text,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists public.outreach (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references public.contacts(id) on delete cascade,
  email_subject text not null,
  email_body text not null,
  status text not null default 'draft' check (status in ('draft', 'queued', 'sent', 'replied', 'bounced')),
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.replies (
  id uuid primary key default gen_random_uuid(),
  outreach_id uuid not null references public.outreach(id) on delete cascade,
  content text not null,
  sentiment text not null check (sentiment in ('interested', 'objection', 'not_now', 'no')),
  next_action text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  meeting_date timestamptz not null,
  prep_doc text not null,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.projects enable row level security;
alter table public.leads enable row level security;
alter table public.contacts enable row level security;
alter table public.outreach enable row level security;
alter table public.replies enable row level security;
alter table public.meetings enable row level security;

create policy "service role can manage users" on public.users for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service role can manage projects" on public.projects for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service role can manage leads" on public.leads for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service role can manage contacts" on public.contacts for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service role can manage outreach" on public.outreach for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service role can manage replies" on public.replies for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service role can manage meetings" on public.meetings for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
