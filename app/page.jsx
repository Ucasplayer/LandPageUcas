import { readFileSync } from "node:fs";
import path from "node:path";
import ClientInit from "./client-init";
import { posts, formatDate } from "./blog/posts";

const source = readFileSync(path.join(process.cwd(), "src", "home.html"), "utf8");

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// O card do blog é montado aqui, no servidor, a partir de app/blog/posts.js.
// Assim os posts vivem em um arquivo só: a home não repete título nem resumo.
// Todo slide aponta para /blog — o card apresenta, a lista é o destino.
const blogTeaser = () => {
  if (posts.length === 0) return "";

  const slides = posts
    .map(
      (post, index) => `
          <a
            class="blog-slide"
            href="/blog"
            aria-label="Ler o post ${escapeHtml(post.title)} no blog"
            ${index > 0 ? "hidden" : ""}
          >
            <img
              src="${escapeHtml(post.cover)}"
              alt=""
              width="640"
              height="360"
              loading="lazy"
            />
            <span class="row-copy">
              <strong>${escapeHtml(post.title)}</strong>
              <span>${escapeHtml(post.summary)}</span>
              <small>
                <span>${escapeHtml(post.tag)}</span>
                <span aria-hidden="true">•</span>
                <span>${escapeHtml(formatDate(post.date))}</span>
              </small>
            </span>
            <svg class="row-arrow" aria-hidden="true" viewBox="0 0 24 24">
              <path d="M5 19 19 5M9 5h10v10" />
            </svg>
          </a>`,
    )
    .join("");

  const dots = posts
    .map(
      (post, index) =>
        `<button type="button" class="blog-dot" data-blog-dot="${index}" aria-label="Mostrar: ${escapeHtml(
          post.title,
        )}"${index === 0 ? ' aria-current="true"' : ""}></button>`,
    )
    .join("");

  return `<section class="blog-teaser" aria-labelledby="blog-teaser-title">
        <h2 class="blog-teaser-heading" id="blog-teaser-title">Do blog</h2>

        <div class="blog-rotator" data-blog-rotator>${slides}
        </div>

        <div class="blog-dots" data-blog-dots>${dots}</div>
        <p class="sr-only" data-blog-status aria-live="polite"></p>
      </section>`;
};

const bodyMarkup =
  source
    .match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]
    ?.replace(
      /<script[^>]*src="\/src\/main\.js"[^>]*><\/script>/i,
      "",
    )
    ?.replace(/<!--\s*blog-teaser:[\s\S]*?-->/, blogTeaser()) ?? "";

export default function HomePage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: bodyMarkup }} />
      <ClientInit />
    </>
  );
}
