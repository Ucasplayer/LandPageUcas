/*
  Fonte única dos posts, agora no Supabase (tabela public.posts). Lida por
  três lugares:

  - app/blog/page.jsx        — a lista
  - app/blog/[slug]/page.jsx — o post inteiro
  - app/page.jsx             — o card rotativo da home

  Um item de `body` pode ser uma string (parágrafo) ou um bloco:
  { p }, { h2 }, { quote, by }, { list }, { figure }. Ver app/blog/post-body.jsx.
  O formato não mudou com o Supabase: `body` é uma coluna jsonb com o mesmo
  array de antes.

  É só leitura, de uma tabela pública, com a chave publicável — então aqui é
  `fetch` direto no PostgREST em vez de @supabase/supabase-js: sem dependência
  nova, e o cache/ISR do Next funciona nativamente pelo `next: { revalidate }`.

  Os nomes camelCase saem do alias do próprio select (readingTime:reading_time),
  não de código de conversão.
*/

const API = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const SELECT =
  "slug,title,summary,date,tag,cover,body,sources,readingTime:reading_time,coverAlt:cover_alt";

// Um minuto: post novo aparece sozinho, sem redeploy, e a home não bate no
// banco a cada visita.
const REVALIDATE = 60;

async function query(params) {
  if (!API || !KEY) {
    throw new Error(
      "Faltam NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY no ambiente (.env.local).",
    );
  }

  const res = await fetch(`${API}/rest/v1/posts?select=${SELECT}&${params}`, {
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
    next: { revalidate: REVALIDATE },
  });

  // Estourar aqui é de propósito: blog vazio por erro de rede é pior que erro
  // visível, porque some sem avisar.
  if (!res.ok) {
    throw new Error(`Supabase respondeu ${res.status}: ${await res.text()}`);
  }

  return res.json();
}

/** Todos os posts publicados, do mais recente para o mais antigo. */
export function getPosts() {
  return query("published=is.true&order=date.desc");
}

/** O post que a home mostra no card. */
export async function getLatestPost() {
  const [post] = await query("published=is.true&order=date.desc&limit=1");
  return post;
}

export async function findPost(slug) {
  const [post] = await query(
    `published=is.true&slug=eq.${encodeURIComponent(slug)}&limit=1`,
  );
  return post;
}

/** "2026-08-20" -> "20 de ago. de 2026" */
export function formatDate(iso) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
