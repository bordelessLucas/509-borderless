create table if not exists public.agenda_audit_logs (
  id uuid primary key default gen_random_uuid(),
  performed_at timestamptz not null default now(),
  user_name text not null,
  user_profile text not null,
  action_label text not null,
  patient_name text not null,
  from_description text not null,
  to_description text not null,
  appointment_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_agenda_audit_logs_performed_at
  on public.agenda_audit_logs (performed_at desc);

create index if not exists idx_agenda_audit_logs_patient_name
  on public.agenda_audit_logs (patient_name);

create index if not exists idx_agenda_audit_logs_action_label
  on public.agenda_audit_logs (action_label);

alter table public.agenda_audit_logs enable row level security;

create policy "Permitir leitura de logs para usuários autenticados"
  on public.agenda_audit_logs
  for select
  to authenticated
  using (true);

create policy "Permitir inserção de logs para usuários autenticados"
  on public.agenda_audit_logs
  for insert
  to authenticated
  with check (true);

create policy "Permitir leitura anônima em desenvolvimento"
  on public.agenda_audit_logs
  for select
  to anon
  using (true);

create policy "Permitir inserção anônima em desenvolvimento"
  on public.agenda_audit_logs
  for insert
  to anon
  with check (true);
