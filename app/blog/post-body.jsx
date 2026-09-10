/*
  O corpo de um post. Cada item de `body` é um bloco:

    "texto"                        → parágrafo
    { p: "texto" }                 → parágrafo
    { h2: "texto" }                → subtítulo
    { quote: "texto", by: "quem" } → citação com atribuição
    { list: ["a", "b"] }           → lista
    { figure: "/caminho.jpg", alt: "...", caption: "...", credit: "..." }
    { video: "ID_do_youtube", title: "...", caption: "..." } → embed do YouTube
    { tweet: "https://x.com/user/status/123" } → embed de um post do X

  Crédito é obrigatório em imagem de terceiro: quem tirou, de onde veio. Sem
  isso a imagem não deveria entrar. O vídeo do YouTube e o tweet já carregam
  a própria atribuição (canal / autor do post), então não precisam de credit.

  String solta continua valendo como parágrafo: os posts antigos não precisam
  ser reescritos para o formato novo.
*/

import { TweetEmbed } from "./tweet-embed";

export function PostBody({ blocks }) {
  return (
    <div className="post-content">
      {blocks.map((block, index) => {
        const key = index;

        if (typeof block === "string") return <p key={key}>{block}</p>;
        if (block.p) return <p key={key}>{block.p}</p>;
        if (block.h2) return <h2 key={key}>{block.h2}</h2>;

        if (block.list) {
          return (
            <ul className="post-list" key={key}>
              {block.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        if (block.figure) {
          return (
            <figure className="post-figure" key={key}>
              <img src={block.figure} alt={block.alt ?? ""} loading="lazy" />
              {block.caption || block.credit ? (
                <figcaption>
                  {block.caption}
                  {block.credit ? (
                    <span className="post-figure-credit">{block.credit}</span>
                  ) : null}
                </figcaption>
              ) : null}
            </figure>
          );
        }

        if (block.quote) {
          return (
            <figure className="post-quote" key={key}>
              <blockquote>{block.quote}</blockquote>
              {block.by ? <figcaption>{block.by}</figcaption> : null}
            </figure>
          );
        }

        if (block.video) {
          return (
            <figure className="post-video" key={key}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${block.video}`}
                title={block.title ?? "Vídeo"}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              {block.caption ? <figcaption>{block.caption}</figcaption> : null}
            </figure>
          );
        }

        if (block.tweet) return <TweetEmbed url={block.tweet} key={key} />;

        return null;
      })}
    </div>
  );
}

export function PostSources({ sources }) {
  if (!sources?.length) return null;

  return (
    <section className="post-sources" aria-labelledby="post-sources-title">
      <h2 id="post-sources-title">Fontes</h2>
      <ol>
        {sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} target="_blank" rel="noreferrer nofollow">
              {source.label}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
