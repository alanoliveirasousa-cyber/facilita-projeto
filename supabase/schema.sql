create extension if not exists pgcrypto;
create table if not exists public.simulations (
 id uuid primary key default gen_random_uuid(), created_at timestamptz not null default now(), nome text not null, estado char(2) not null, cidade text not null, whatsapp text not null, tipo_projeto text not null, tipo_residencial text, metragem numeric not null, faixa_metragem text, quartos int, banheiros int, suites int, estilo_fachada text, garagem_inclusa text, edicula text, faixa_edicula text, piscina text, mezanino text, faixa_mezanino text, valor_calculado_interno numeric not null, valor_minimo_exibido numeric not null, valor_maximo_exibido numeric not null, clicou_whatsapp boolean not null default false, consentimento boolean not null default false
);
alter table public.simulations enable row level security;
-- Sem policies públicas: o site grava/lê somente pelas rotas server-side usando a service role.
create index if not exists simulations_created_at_idx on public.simulations(created_at desc);
create index if not exists simulations_tipo_idx on public.simulations(tipo_projeto);
