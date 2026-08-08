/*
  Prévia de link (Open Graph + Twitter Card) em um lugar só.

  Discord, X e WhatsApp leem as mesmas duas famílias de tags, mas o Next não faz
  merge profundo de `openGraph`: uma página que declara o bloco substitui o do
  layout inteiro, imagem inclusive. Por isso cada rota chama este helper em vez
  de escrever o objeto na mão — esquecer a imagem aqui é impossível.

  As cartas vivem em public/og/ e são geradas por scripts/og.mjs.
*/

export const SITE_URL = "https://eaeucas.studio";

export const SITE_NAME = "Ucas";

/**
 * @param {object} options
 * @param {string} options.title       Título da prévia.
 * @param {string} options.description Uma frase. É o que aparece embaixo do título.
 * @param {string} options.path        Caminho da rota, com barra inicial.
 * @param {string} options.card        Nome do arquivo em public/og/, sem extensão.
 * @param {string} options.alt         Descrição da carta, para leitores de tela.
 */
export function social({ title, description, path, card, alt }) {
  const image = {
    url: `/og/${card}.jpg`,
    width: 1200,
    height: 630,
    alt,
    type: "image/jpeg",
  };

  return {
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "pt_BR",
      url: path,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
