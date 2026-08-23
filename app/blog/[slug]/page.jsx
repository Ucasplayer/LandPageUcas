/*
  Um post. Reaproveita a coluna de leitura das páginas de projeto: nada de
  layout novo para um texto corrido.

  O conteúdo é de exemplo — ver o cabeçalho de app/blog/posts.js.
*/

import { notFound } from "next/navigation";

import { social } from "../../social-meta";
import { SiteHeader, SiteFooter, ArrowUpRight } from "../../site-chrome";
import { posts, findPost, formatDate } from "../posts";
import { PostBody, PostSources } from "../post-body";
import { AdSlot } from "../../ad-slot";

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Ucas`,
    description: post.summary,
    ...social({
      title: `${post.title} — Ucas`,
      description: post.summary,
      path: `/blog/${post.slug}`,
      card: "home",
      alt: "Cartão de Ucas: avatar, nome, função e as quatro especialidades.",
    }),
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <main className="page-shell case-page" id="conteudo">
        <SiteHeader
          links={[
            { href: "/blog", label: "Blog" },
            { href: "/", label: "Início" },
          ]}
        />

        <article className="case-article">
          <header className="case-hero">
            <h1>{post.title}</h1>
            <p className="case-lede">{post.summary}</p>
            <p className="post-meta">
              <span>{post.tag}</span>
              <span aria-hidden="true">•</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">•</span>
              <span>{post.readingTime} de leitura</span>
            </p>
          </header>

          <figure className="post-cover">
            <img src={post.cover} alt={post.coverAlt} width="640" height="360" />
          </figure>

          <PostBody blocks={post.body} />

          <AdSlot name="postEnd" />

          <PostSources sources={post.sources} />

          <nav className="about-links" aria-label="Próximos passos">
            <a href="/blog">
              Ver todos os posts
              <ArrowUpRight />
            </a>
            <a href="/#contato">
              Falar comigo
              <ArrowUpRight />
            </a>
          </nav>
        </article>

        <SiteFooter note="Edição de vídeo e desenvolvimento para projetos de Minecraft." />
      </main>
    </>
  );
}
