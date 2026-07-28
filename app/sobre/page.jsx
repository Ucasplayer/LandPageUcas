/*
  THESIS: A história de Lucas é contada como origem, prática e continuidade — sem currículo genérico.
  OWN-WORLD: A mesma coluna de 620px, superfícies ameixa, tipografia de sistema e violeta restrito a navegação e marcadores.
  STORY: O leitor entende como um Moto G2, um canal de Minecraft e a música formaram o criador e developer de hoje.
  FIRST VIEWPORT: Voltar ao início, retrato, título, função e os primeiros parágrafos da história.
  FORM: Página de leitura curta dentro do Perfil de Produção, seguindo apresentação, interesses e trajetória.
*/

export const metadata = {
  title: "Sobre o Lucas — Ucas",
  description:
    "A trajetória de Lucas com criação de conteúdo, tecnologia, Minecraft e música.",
};

const ArrowUpRight = () => (
  <svg className="row-arrow" aria-hidden="true" viewBox="0 0 24 24">
    <path d="M5 19 19 5M9 5h10v10" />
  </svg>
);

export default function SobrePage() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <main className="page-shell about-page" id="conteudo">
        <header className="topbar">
          <a className="mini-brand" href="/" aria-label="Ucas, voltar para a página inicial">
            <img src="/ucas-avatar.jpg" alt="" width="32" height="32" />
            <span>UCAS</span>
          </a>

          <nav className="top-actions" aria-label="Atalhos">
            <a className="about-action" href="/">
              Início
            </a>
            <a
              className="icon-action"
              href="https://github.com/Ucasplayer"
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir GitHub de Ucas"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path
                  d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.55 9.55 0 0 1 12 7c.85 0 1.7.11 2.5.34 1.9-1.29 2.74-1.02 2.74-1.02.56 1.37.21 2.39.11 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
                />
              </svg>
            </a>
          </nav>
        </header>

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

        <footer>
          <div className="footer-brand">
            <img src="/ucas-avatar.jpg" alt="" width="28" height="28" />
            <span>Ucas</span>
          </div>
          <p>Edição de vídeo e desenvolvimento para projetos de Minecraft.</p>
        </footer>
      </main>
    </>
  );
}
