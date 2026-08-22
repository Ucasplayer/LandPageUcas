/*
  A lista do blog. Mesmo desenho de card de /mods: capa em cima, texto embaixo.
  O conteúdo é de exemplo — ver o cabeçalho de app/blog/posts.js.
*/

import { social } from "../social-meta";
import { SiteHeader, SiteFooter } from "../site-chrome";
import { posts, formatDate } from "./posts";

export const metadata = {
  title: "Blog — Ucas",
  description: "Posts do Ucas sobre edição de vídeo, desenvolvimento e Minecraft.",
  ...social({
    title: "Blog — Ucas",
    description: "Posts do Ucas sobre edição de vídeo, desenvolvimento e Minecraft.",
    path: "/blog",
    card: "home",
    alt: "Cartão de Ucas: avatar, nome, função e as quatro especialidades.",
  }),
};

export default function BlogPage() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <main className="page-shell" id="conteudo">
        <SiteHeader
          links={[
            { href: "/", label: "Início" },
            { href: "/mods", label: "Projetos" },
          ]}
          github
        />

        <article className="about-article">
          <header className="about-hero">
            <h1>Blog</h1>
            <p>Anotações sobre edição de vídeo, desenvolvimento e Minecraft.</p>
          </header>

          <div className="mods-list">
            {posts.map((post) => (
              <a
                className="project-card post-card"
                href={`/blog/${post.slug}`}
                key={post.slug}
                aria-label={`Ler o post ${post.title}`}
              >
                <span className="project-shot">
                  <img
                    src={post.cover}
                    alt={post.coverAlt}
                    width="640"
                    height="360"
                    loading="lazy"
                  />
                </span>

                <span className="project-body post-body">
                  <span className="row-copy">
                    <strong>{post.title}</strong>
                    <span>{post.summary}</span>
                  </span>

                  <svg className="row-arrow" aria-hidden="true" viewBox="0 0 24 24">
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </span>

                <span className="mods-meta">
                  <span>{post.tag}</span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>{post.readingTime} de leitura</span>
                </span>
              </a>
            ))}
          </div>
        </article>

        <SiteFooter note="Edição de vídeo e desenvolvimento para projetos de Minecraft." />
      </main>
    </>
  );
}
