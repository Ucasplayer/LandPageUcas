/*
  Fonte única dos posts. Lida por três lugares:

  - app/blog/page.jsx        — a lista
  - app/blog/[slug]/page.jsx — o post inteiro
  - app/page.jsx             — o card rotativo da home

  ┌──────────────────────────────────────────────────────────────────────┐
  │ CONTEÚDO DE EXEMPLO. Nada aqui foi escrito pelo Ucas.                │
  │ Trocar: `title`, `summary`, `body` e as imagens em public/blog/.     │
  │ As imagens são SVGs abstratos, não fotos — substituir por capa real. │
  └──────────────────────────────────────────────────────────────────────┘

  `date` é ISO (AAAA-MM-DD). A ordem da lista é a ordem de exibição, e o
  primeiro item é o que a home mostra como mais recente.
*/

export const posts = [
  {
    slug: "bem-vindo-ao-blog",
    title: "Bem-vindo ao blog",
    summary:
      "Texto de exemplo. Aqui vai um resumo curto do post, de duas ou três linhas, que aparece no card da home e na lista.",
    date: "2026-08-20",
    readingTime: "3 min",
    tag: "Geral",
    cover: "/blog/cover-1.svg",
    coverAlt: "Imagem de exemplo: formas geométricas em violeta sobre fundo ameixa.",
    body: [
      "Este é um texto de exemplo, colocado aqui só para o blog ter forma enquanto os posts de verdade não existem. Substitua este parágrafo pelo seu conteúdo.",
      "Cada post é um objeto no arquivo app/blog/posts.js. O campo body é uma lista de parágrafos: cada item da lista vira um parágrafo na página.",
      "O resumo que aparece no card da home é o campo summary, e a imagem é o campo cover. Trocar os três é o suficiente para publicar um post de verdade.",
    ],
  },
  {
    slug: "como-eu-organizo-uma-edicao",
    title: "Como eu organizo uma edição",
    summary:
      "Texto de exemplo. Um segundo post para a lista não ficar com um item só e para o card da home ter para onde girar.",
    date: "2026-08-12",
    readingTime: "5 min",
    tag: "Edição de vídeo",
    cover: "/blog/cover-2.svg",
    coverAlt: "Imagem de exemplo: faixas horizontais em violeta e verde sobre fundo ameixa.",
    body: [
      "Este é um texto de exemplo. O conteúdo real deste post ainda não foi escrito.",
      "A lista em /blog ordena os posts na ordem em que eles aparecem no arquivo, então basta colocar o mais novo no topo.",
      "A data e o tempo de leitura são campos livres: date em formato ISO, readingTime como texto.",
    ],
  },
  {
    slug: "o-que-aprendi-fazendo-um-launcher",
    title: "O que eu aprendi fazendo um launcher",
    summary:
      "Texto de exemplo. O terceiro post fecha o giro do card da home e mostra como a lista se comporta com mais de dois itens.",
    date: "2026-07-29",
    readingTime: "6 min",
    tag: "Desenvolvimento",
    cover: "/blog/cover-3.svg",
    coverAlt: "Imagem de exemplo: círculos concêntricos em violeta sobre fundo ameixa.",
    body: [
      "Este é um texto de exemplo. O conteúdo real deste post ainda não foi escrito.",
      "Para adicionar um post novo, copie um destes objetos, troque o slug e escreva o conteúdo. O slug vira a URL: /blog/o-slug-que-voce-escolher.",
      "Para remover um post, apague o objeto. Nenhum outro arquivo precisa ser tocado.",
    ],
  },
];

export const latestPost = posts[0];

export function findPost(slug) {
  return posts.find((post) => post.slug === slug);
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
