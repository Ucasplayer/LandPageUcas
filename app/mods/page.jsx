/*
  A lista completa. A home mostra os três destaques em linha, compacta; aqui
  cada projeto tem a captura real, a frase e a ficha breve, e o clique leva à
  página com tudo.

  Todo dado desta página vem das próprias páginas de projeto e do PRODUCT.md.
  Nada aqui é estimativa: se um fato não está confirmado lá, não aparece.
*/

import { Fragment } from "react";

import { social } from "../social-meta";
import { SiteHeader, SiteFooter } from "../site-chrome";

export const metadata = {
  title: "Projetos — Ucas",
  description:
    "Launchers, sites e mods que Ucas construiu para servidores de Minecraft.",
  ...social({
    title: "Projetos — Ucas",
    description:
      "Launchers, sites e mods que Ucas construiu para servidores de Minecraft.",
    path: "/mods",
    card: "home",
    alt: "Cartão de Ucas: avatar, nome, função e as quatro especialidades.",
  }),
};

const projects = [
  {
    slug: "xenthor-launcher",
    name: "Xenthor Launcher",
    mark: "xenthor",
    logo: { src: "/xenthor-logo.webp", width: 900, height: 600, className: "project-logo" },
    shot: {
      src: "/xenthor-shot-main.webp",
      width: 963,
      height: 527,
      alt: "Tela principal do Xenthor Launcher: botão Jogar, status do servidor e painel de notícias.",
    },
    copy: "Launcher desktop do Xenthor SMP: instala o modpack, confere os arquivos, resolve o Java e abre o jogo com um clique.",
    stack: ["Electron", "Minecraft 1.21.5", "Fabric"],
    meta: [
      ["Tipo", "Launcher desktop"],
      ["Plataformas", "Windows, macOS e Linux"],
      ["Código", "Repositório privado"],
    ],
  },
  {
    slug: "kryptos-smp",
    name: "Kryptós SMP",
    mark: "kryptos",
    logo: {
      src: "/kryptos-logo.webp",
      width: 151,
      height: 154,
      className: "project-logo project-logo-kryptos",
    },
    shot: {
      src: "/kryptos-shot-landing.webp",
      width: 1440,
      height: 900,
      alt: "Página inicial do site de inscrição do Kryptós SMP.",
    },
    copy: "Site de inscrição de um servidor de mitologia grega, com formulário em quatro etapas e painel de triagem para a staff.",
    stack: ["Next.js", "PostgreSQL", "Prisma"],
    meta: [
      ["Tipo", "Site e painel"],
      ["No ar em", "kryptos.eaeucas.studio"],
      ["Código", "Fora do GitHub"],
    ],
  },
  {
    slug: "eclipse-mod",
    name: "Eclipse Mod",
    mark: "eclipse",
    logo: { src: "/eclipse-mark.webp", width: 400, height: 400, className: "project-logo" },
    shot: {
      src: "/eclipse-shot-totalidade.webp",
      width: 1920,
      height: 1080,
      alt: "Totalidade do eclipse no Eclipse Mod: o mundo escurecido e a corona aberta no céu.",
    },
    copy: "Mod de evento para o Eclipse Realm SMP: um comando escurece o mundo, abre a corona no céu e o servidor inteiro vive o mesmo instante.",
    stack: ["Forge 1.20.1", "Java 17", "Shader GLSL"],
    meta: [
      ["Tipo", "Mod de evento"],
      ["Lado", "Servidor e cliente"],
      ["Licença", "MIT"],
    ],
  },
];

export default function ModsPage() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <main className="page-shell" id="conteudo">
        <SiteHeader
          links={[
            { href: "/", label: "Início" },
            { href: "/sobre", label: "Sobre" },
          ]}
          github
        />

        <article className="about-article">
          <header className="about-hero">
            <h1>Projetos</h1>
            <p>Launchers, sites e mods que eu construí para servidores.</p>
          </header>

          <div className="mods-list">
            {projects.map((project) => (
              <a
                className="project-card"
                href={`/projetos/${project.slug}`}
                key={project.slug}
                aria-label={`Ver o projeto ${project.name}`}
              >
                <span className="project-shot">
                  <img
                    src={project.shot.src}
                    alt={project.shot.alt}
                    width={project.shot.width}
                    height={project.shot.height}
                    loading="lazy"
                  />
                </span>

                <span className="project-body">
                  <span className="project-mark" data-mark={project.mark}>
                    <img
                      className={project.logo.className}
                      src={project.logo.src}
                      alt=""
                      width={project.logo.width}
                      height={project.logo.height}
                      loading="lazy"
                    />
                  </span>

                  <span className="row-copy">
                    <strong>{project.name}</strong>
                    <span>{project.copy}</span>
                    <small>
                      {project.stack.map((item, index) => (
                        <Fragment key={item}>
                          {index > 0 ? <span aria-hidden="true">•</span> : null}
                          <span>{item}</span>
                        </Fragment>
                      ))}
                    </small>
                  </span>

                  <svg className="row-arrow" aria-hidden="true" viewBox="0 0 24 24">
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </span>

                <span className="mods-meta">
                  {project.meta.map(([label, value]) => (
                    <span key={label}>
                      {label}: <b>{value}</b>
                    </span>
                  ))}
                </span>
              </a>
            ))}
          </div>
        </article>

        <SiteFooter note="Launchers, mods e bots para servidores de Minecraft." />
      </main>
    </>
  );
}
