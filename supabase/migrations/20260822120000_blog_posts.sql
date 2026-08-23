-- Os posts do blog. Uma linha por post; `body` e `sources` guardam os mesmos
-- arrays que app/blog/post-body.jsx já sabia renderar, então o formato de
-- bloco ({ p }, { h2 }, { quote, by }, { list }, { figure }) continua valendo.
--
-- Os nomes são snake_case aqui e viram camelCase no select do PostgREST
-- (ver SELECT em app/blog/posts.js) — nada de código de conversão no meio.

create table public.posts (
  slug         text primary key,
  title        text        not null,
  summary      text        not null,
  date         date        not null,
  reading_time text        not null,
  tag          text        not null,
  cover        text        not null,
  cover_alt    text        not null,
  body         jsonb       not null,
  sources      jsonb       not null default '[]'::jsonb,
  published    boolean     not null default true,
  created_at   timestamptz not null default now()
);

-- A lista e a home ordenam por data decrescente.
create index posts_date_idx on public.posts (date desc);

alter table public.posts enable row level security;

-- Leitura pública só do que está publicado. Escrita não tem policy nenhuma:
-- rascunho e publicação passam pelo painel do Supabase ou pela service role,
-- nunca pela chave publicável que vai no site.
create policy "posts publicados são públicos"
  on public.posts
  for select
  to anon, authenticated
  using (published);
