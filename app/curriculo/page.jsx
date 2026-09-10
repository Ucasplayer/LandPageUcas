import { social } from "../social-meta";
import { ArrowUpRight, SiteHeader, SiteFooter } from "../site-chrome";

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

export default function CurriculoPage() {
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
                Profissional de TI com experiência em análise de dados, suporte técnico,
                edição de vídeo e desenvolvimento de projetos. Atuo com Power BI e planilhas
                na área de Dados/BI, na criação de conteúdo para redes sociais, no
                desenvolvimento de mods e launchers para Minecraft e em marketing digital.
              </p>
            </section>

            <section className="resume-block" aria-labelledby="resume-experience-title">
              <h3 id="resume-experience-title">Experiência profissional</h3>

              <div className="resume-entry">
                <div className="resume-entry-head">
                  <strong>Estagiário de Dados/BI</strong>
                  <span>2026 – atual</span>
                </div>
                <p className="resume-entry-company">Mega Matte</p>
                <ul>
                  <li>
                    Desenvolvo e mantenho dashboards em Power BI para acompanhamento de
                    indicadores e apoio à tomada de decisão.
                  </li>
                  <li>
                    Organizo e trato planilhas de dados, garantindo consistência e
                    confiabilidade das informações usadas nas análises.
                  </li>
                  <li>
                    Realizo análises de dados que geram insights para as áreas internas da
                    empresa.
                  </li>
                </ul>
              </div>

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
                <li>Power BI</li>
                <li>Análise de dados</li>
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

        <SiteFooter note="Edição de vídeo e desenvolvimento para projetos de Minecraft." />
      </main>
    </>
  );
}
