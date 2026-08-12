import { social } from "../social-meta";

export const metadata = {
  title: "Meu currículo — Ucas",
  description: "Currículo profissional de Lucas (Ucas).",
  ...social({
    title: "Meu currículo — Ucas",
    description:
      "Currículo profissional de Lucas: edição de vídeo, bots para Discord, launchers e mods.",
    path: "/curriculo",
    card: "home",
    alt: "Cartão de Ucas: avatar, nome, função e as quatro especialidades.",
  }),
};

const ArrowUpRight = () => (
  <svg className="row-arrow" aria-hidden="true" viewBox="0 0 24 24">
    <path d="M5 19 19 5M9 5h10v10" />
  </svg>
);

export default function CurriculoPage() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <main className="page-shell" id="conteudo">
        <header className="topbar">
          <a className="mini-brand" href="/" aria-label="Ucas, voltar para a página inicial">
            <img src="/ucas-avatar.jpg" alt="" width="32" height="32" />
            <span>UCAS</span>
          </a>

          <nav className="top-actions" aria-label="Atalhos">
            <a className="about-action" href="/">
              Início
            </a>
            <a className="about-action" href="/sobre">
              Sobre
            </a>
            <a
              className="icon-action"
              href="https://github.com/Ucasplayer"
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir GitHub de Ucas"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.55 9.55 0 0 1 12 7c.85 0 1.7.11 2.5.34 1.9-1.29 2.74-1.02 2.74-1.02.56 1.37.21 2.39.11 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
          </nav>
        </header>

        <article className="about-article">
          <header className="about-hero">
            <h1>Meu currículo</h1>
            <p>Resumo profissional, experiência e habilidades.</p>
          </header>

          <section className="resume-card" aria-labelledby="resume-title">
            <h2 id="resume-title">Currículo</h2>

            <p className="resume-meta">
              <a href="mailto:lucasrcomercial1@gmail.com">lucasrcomercial1@gmail.com</a>
              <span aria-hidden="true">•</span>
              <span>Rio de Janeiro, RJ</span>
            </p>

            <section className="resume-block" aria-labelledby="resume-summary-title">
              <h3 id="resume-summary-title">Resumo profissional</h3>
              <p>
                Profissional de TI com experiência em suporte técnico, edição de vídeo e
                desenvolvimento de projetos. Atuo na criação de conteúdo para redes sociais,
                no desenvolvimento de mods e launchers para Minecraft e em marketing digital.
              </p>
            </section>

            <section className="resume-block" aria-labelledby="resume-experience-title">
              <h3 id="resume-experience-title">Experiência profissional</h3>

              <div className="resume-entry">
                <div className="resume-entry-head">
                  <strong>Desenvolvedor freelancer</strong>
                  <span>2026</span>
                </div>
                <p className="resume-entry-company">Autônomo</p>
                <ul>
                  <li>
                    Desenvolvi mods em Java para servidores de Minecraft e criei launchers,
                    além de gerenciar o marketing de conteúdo nas redes sociais.
                  </li>
                </ul>
              </div>

              <div className="resume-entry">
                <div className="resume-entry-head">
                  <strong>Editor de vídeo e creative manager</strong>
                  <span>2025 – 2026</span>
                </div>
                <p className="resume-entry-company">@loudcomments e @hospicioloudelite</p>
                <ul>
                  <li>
                    Aumentei em 30% as visualizações das páginas, alcançando milhares de
                    views e ampliando o público.
                  </li>
                </ul>
              </div>

              <div className="resume-entry">
                <div className="resume-entry-head">
                  <strong>Estagiário de TI</strong>
                  <span>2021</span>
                </div>
                <p className="resume-entry-company">Van Security TI</p>
                <ul>
                  <li>
                    Prestei suporte técnico e de redes, contribuindo para a eficiência da
                    equipe.
                  </li>
                </ul>
              </div>
            </section>

            <section className="resume-block" aria-labelledby="resume-education-title">
              <h3 id="resume-education-title">Formação acadêmica</h3>
              <p className="resume-single-line">
                Bacharelado em Ciência da Computação
                <br />
                Universidade Estácio de Sá (UNESA)
              </p>
            </section>

            <section className="resume-block" aria-labelledby="resume-skills-title">
              <h3 id="resume-skills-title">Habilidades técnicas</h3>
              <ul className="resume-skill-tags">
                <li>Edição de vídeo</li>
                <li>Desenvolvimento de projetos</li>
                <li>Suporte de TI</li>
                <li>Redes</li>
                <li>Helpdesk</li>
                <li>Uso de IA</li>
                <li>Criação de conteúdo para mídias sociais</li>
                <li>Pacote Office</li>
              </ul>
            </section>

            <section className="resume-block" aria-labelledby="resume-languages-title">
              <h3 id="resume-languages-title">Idiomas</h3>
              <ul>
                <li>Inglês — Básico</li>
              </ul>
            </section>

            <section className="resume-block" aria-labelledby="resume-certifications-title">
              <h3 id="resume-certifications-title">Certificações</h3>
              <ul>
                <li>Informática avançada</li>
                <li>Curso de inglês — Mairo Vergara</li>
                <li>Curso de música — Adesa Musical</li>
              </ul>
            </section>
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
