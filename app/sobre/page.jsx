/*
  THESIS: A história de Lucas é contada como origem, prática e continuidade — sem currículo genérico.
  OWN-WORLD: A mesma coluna de 620px, superfícies ameixa, tipografia de sistema e violeta restrito a navegação e marcadores.
  STORY: O leitor entende como um Moto G2, um canal de Minecraft e a música formaram o criador e developer de hoje.
  FIRST VIEWPORT: Voltar ao início, retrato, título, função e os primeiros parágrafos da história.
  FORM: Página de leitura curta dentro do Perfil de Produção, seguindo apresentação, interesses e trajetória.
*/

import { social } from "../social-meta";
import { ArrowUpRight, SiteHeader, SiteFooter } from "../site-chrome";

export const metadata = {
  title: "Sobre o Lucas — Ucas",
  description:
    "A trajetória de Lucas com criação de conteúdo, tecnologia, Minecraft e música.",
  ...social({
    title: "Sobre o Lucas — Ucas",
    description:
      "A trajetória de Lucas com criação de conteúdo, tecnologia, Minecraft e música.",
    path: "/sobre",
    card: "sobre",
    alt: "Cartão da página Sobre: avatar de Ucas e uma frase sobre a trajetória.",
  }),
};

export default function SobrePage() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <main className="page-shell about-page" id="conteudo">
        <SiteHeader
          links={[{ href: "/", label: "Início" }]}
          github
        />

        <article className="about-article">
          <header className="about-hero">
            <div className="profile-avatar about-avatar">
              <img
                src="/ucas-avatar.jpg"
                alt="Identidade visual de Lucas, conhecido como Ucas"
                width="400"
                height="400"
              />
            </div>
            <h1>Sobre o Lucas</h1>
            <p>Criador, editor de vídeo e developer.</p>
          </header>

          <div className="about-copy">
            <p>
              E aí! Meu nome é Lucas — ou Ucas na internet. Sou apaixonado por
              tecnologia, jogos e cultura pop, e foi dessa mistura que nasceu minha
              vontade de criar.
            </p>
            <p>
              Aos 15 anos, comecei meu primeiro canal no YouTube sobre Minecraft Pocket
              Edition. Eu fazia tudo em um Moto G2 antigo: editava os vídeos, criava as
              thumbnails, escrevia os roteiros e organizava cada ideia. Mesmo com uma
              estrutura simples, o canal chegou a 10 mil inscritos em poucos meses.
            </p>
            <p>
              Foi ali que descobri o quanto gosto de produzir conteúdo. Gosto de
              transformar uma ideia em algo que as pessoas possam assistir, aproveitar e
              aprender gratuitamente.
            </p>
            <p>
              Hoje, aos 26 anos, mantenho canais sobre diferentes temas e continuo
              criando dentro e fora do Minecraft. Desenvolvo mods, bots para Discord e
              launchers personalizados para servidores. Também sou formado em Música e
              toco guitarra, contrabaixo e violão.
            </p>
          </div>

          <section className="about-block" aria-labelledby="interests-title">
            <h2 id="interests-title">O que me move</h2>
            <ul className="interest-grid">
              <li>Tecnologia &amp; jogos</li>
              <li>Criar conteúdo</li>
              <li>Minecraft</li>
              <li>Cultura pop</li>
              <li>Música</li>
              <li>Aprender &amp; compartilhar</li>
            </ul>
          </section>

          <section className="about-block" aria-labelledby="timeline-title">
            <h2 id="timeline-title">Trajetória</h2>
            <ol className="timeline">
              <li>
                <span className="timeline-label">Aos 15 anos</span>
                <p>Criei meu primeiro canal sobre Minecraft Pocket Edition.</p>
              </li>
              <li>
                <span className="timeline-label">Poucos meses depois</span>
                <p>
                  Alcancei 10 mil inscritos produzindo vídeos, thumbnails e roteiros
                  inteiramente pelo celular.
                </p>
              </li>
              <li>
                <span className="timeline-label">Hoje</span>
                <p>
                  Produzo conteúdo em canais de jogos e tecnologia e desenvolvo mods,
                  bots e launchers para comunidades de Minecraft.
                </p>
              </li>
              <li>
                <span className="timeline-label">Além da tecnologia</span>
                <p>
                  Minha formação em Música acompanha o processo criativo na guitarra, no
                  contrabaixo e no violão.
                </p>
              </li>
            </ol>
          </section>

          <nav className="about-links" aria-label="Próximos passos">
            <a href="/#trabalhos">
              Ver meus trabalhos
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
