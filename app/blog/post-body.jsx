/*
  O corpo de um post. Cada item de `body` é um bloco:

    "texto"                        → parágrafo
    { p: "texto" }                 → parágrafo
    { h2: "texto" }                → subtítulo
    { quote: "texto", by: "quem" } → citação com atribuição
    { list: ["a", "b"] }           → lista

  String solta continua valendo como parágrafo: os posts antigos não precisam
  ser reescritos para o formato novo.
*/

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

        if (block.quote) {
          return (
            <figure className="post-quote" key={key}>
              <blockquote>{block.quote}</blockquote>
              {block.by ? <figcaption>{block.by}</figcaption> : null}
            </figure>
          );
        }

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
