/*
  Fonte única dos posts. Lida por três lugares:

  - app/blog/page.jsx        — a lista
  - app/blog/[slug]/page.jsx — o post inteiro
  - app/page.jsx             — o card rotativo da home

  Cada post vive no próprio arquivo e entra na lista aqui. O primeiro item é o
  mais recente: é ele que a home mostra no card.

  Um item de `body` pode ser uma string (parágrafo) ou um bloco:
  { p }, { h2 }, { quote, by }, { list }. Ver app/blog/post-body.jsx.

  `date` é ISO (AAAA-MM-DD). A ordem da lista é a ordem de exibição, e o
  primeiro item é o que a home mostra como mais recente.
*/

import { cyberleekPost } from "./cyberleek";

export const posts = [cyberleekPost];

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
