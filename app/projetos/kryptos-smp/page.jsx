/*
  THESIS: O Kryptós não é "um formulário": é o sistema de seleção completo de um servidor, com painel de análise próprio.
  OWN-WORLD: Mesma coluna de 620px e superfícies ameixa do portfólio; o dourado do Kryptós fica só dentro das capturas.
  STORY: O visitante vê o lado público, entende que existe um painel por trás, confere o que ele faz e chama para conversar.
  FIRST VIEWPORT: Marca do Kryptós, nome do projeto, uma frase do que ele resolve e as etiquetas de stack.
  FORM: Estudo de caso curto seguindo o padrão de /projetos/xenthor-launcher.
*/

export const metadata = {
  title: "Kryptós SMP — Ucas",
  description:
    "Site de inscrição do Kryptós SMP: formulário em etapas para os jogadores e painel de análise para a administração do servidor.",
  openGraph: {
    title: "Kryptós SMP — Ucas",
    description:
      "Formulário de seleção em etapas e painel completo de análise de inscrições para um servidor de Minecraft.",
  },
};

const ArrowUpRight = () => (
  <svg className="row-arrow" aria-hidden="true" viewBox="0 0 24 24">
    <path d="M5 19 19 5M9 5h10v10" />
  </svg>
);

const shots = [
  {
    src: "/kryptos-shot-landing.webp",
    width: 1280,
    height: 737,
    alt: "Página inicial do Kryptós SMP com o aviso de que as inscrições estão fechadas e um botão para o Discord.",
    title: "A porta de entrada do servidor",
    copy: "Identidade própria, com céu estrelado e tipografia grega. Quando as inscrições fecham, a página troca sozinha para o aviso e manda o jogador para o Discord.",
  },
  {
    src: "/kryptos-shot-form.webp",
    width: 1184,
    height: 892,
    alt: "Primeira etapa do formulário de inscrição do Kryptós, com barra de progresso e campos de informações pessoais.",
    title: "Inscrição em quatro etapas",
    copy: "Barra de progresso, validação campo a campo e um código de inscrição no final para o jogador acompanhar.",
  },
  {
    src: "/kryptos-shot-admin-login.webp",
    width: 798,
    height: 676,
    narrow: true,
    alt: "Tela de login do painel administrativo do Kryptós.",
    title: "Painel privado",
    copy: "O acesso da administração fica atrás de login com senha criptografada e sessão própria.",
  },
  {
    src: "/kryptos-shot-admin-list.webp",
    width: 1280,
    height: 614,
    alt: "Painel de inscrições do Kryptós com busca, filtro de status, ações em lote e a lista de candidatos.",
    title: "Central de análise",
    copy: "Busca por nome, Discord, e-mail ou nick, filtro por status, mudança em massa e exportação para CSV.",
  },
  {
    src: "/kryptos-shot-admin-form.webp",
    width: 1280,
    height: 617,
    alt: "Editor de perguntas do formulário do Kryptós, com a lista de perguntas cadastradas por etapa.",
    title: "O dono do servidor edita o formulário",
    copy: "Criar, reordenar, desativar e trocar o tipo de cada pergunta pelo painel — sem depender de mim para mudar uma linha de código.",
  },
];

const features = [
  {
    title: "Formulário que você mesmo monta",
    copy: "Nove tipos de campo, organizados em etapas. Muda a pergunta pelo painel e o formulário público muda na hora.",
  },
  {
    title: "Triagem com status e notas",
    copy: "Cada inscrição passa por nova, em análise, pré-aprovada, aprovada, recusada ou arquivada, com notas internas e motivo da decisão.",
  },
  {
    title: "Visão geral do que está chegando",
    copy: "Gráficos de inscrições por dia, faixa etária, edição do jogo, estilo de jogo e disponibilidade.",
  },
  {
    title: "Trabalho em lote",
    copy: "Selecionar várias inscrições, mudar o status de todas de uma vez e exportar tudo em CSV.",
  },
  {
    title: "Histórico que não se perde",
    copy: "Toda mudança fica registrada, e a resposta guarda uma cópia da pergunta original mesmo se ela for editada depois.",
  },
  {
    title: "Protegido contra abuso",
    copy: "Limite de envios por IP, teto configurável de inscrições e uma chave para abrir e fechar o processo quando quiser.",
  },
];

const specs = [
  ["Stack", "Next.js, React e TypeScript"],
  ["Banco", "PostgreSQL com Prisma"],
  ["Interface", "Tailwind CSS e Framer Motion"],
  ["Gráficos", "Recharts no painel"],
  ["Validação", "Zod no cliente e no servidor"],
  ["Acesso", "Senha criptografada e sessão em cookie"],
  ["Etapas do formulário", "4, com perguntas configuráveis"],
  ["No ar em", "kryptos.eaeucas.studio"],
];

export default function KryptosPage() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <main className="page-shell case-page" id="conteudo">
        <header className="topbar">
          <a
            className="mini-brand"
            href="/"
            aria-label="Ucas, voltar para a página inicial"
          >
            <img src="/ucas-avatar.jpg" alt="" width="32" height="32" />
            <span>UCAS</span>
          </a>

          <nav className="top-actions" aria-label="Atalhos">
            <a className="about-action" href="/#projetos">
              Projetos
            </a>
            <a className="about-action" href="/">
              Início
            </a>
          </nav>
        </header>

        <article className="case-article">
          <header className="case-hero">
            <div className="case-mark case-mark-contain">
              <img
                src="/kryptos-logo.webp"
                alt="Marca do Kryptós SMP"
                width="151"
                height="154"
              />
            </div>
            <p className="case-kicker">Site sob medida · Minecraft</p>
            <h1>Kryptós SMP</h1>
            <p className="case-lede">
              O sistema de seleção de um servidor de mitologia grega. O jogador se
              inscreve por um formulário em etapas; a administração analisa, pontua e
              decide em um painel próprio.
            </p>
            <ul className="case-tags" aria-label="Tecnologias">
              <li>Next.js</li>
              <li>PostgreSQL</li>
              <li>Tailwind</li>
              <li>TypeScript</li>
            </ul>
            <p className="case-live">
              <a
                href="https://kryptos.eaeucas.studio"
                target="_blank"
                rel="noreferrer"
              >
                Ver o site no ar
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M5 19 19 5M9 5h10v10" />
                </svg>
              </a>
            </p>
          </header>

          <section className="case-block" aria-labelledby="shots-title">
            <h2 id="shots-title">Como ele é por dentro</h2>
            <div className="shot-list">
              {shots.map((shot) => (
                <figure
                  className={shot.narrow ? "shot shot-narrow" : "shot"}
                  key={shot.src}
                >
                  <a href={shot.src} target="_blank" rel="noreferrer">
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      loading="lazy"
                    />
                  </a>
                  <figcaption>
                    <strong>{shot.title}</strong>
                    <span>{shot.copy}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="case-block" aria-labelledby="features-title">
            <h2 id="features-title">O que ele resolve</h2>
            <ul className="feature-grid">
              {features.map((feature) => (
                <li key={feature.title}>
                  <strong>{feature.title}</strong>
                  <span>{feature.copy}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="case-block" aria-labelledby="flow-title">
            <h2 id="flow-title">O caminho da inscrição</h2>
            <ol className="timeline">
              <li>
                <span className="timeline-label">1. O jogador preenche</span>
                <p>
                  Quatro etapas com validação, para as respostas chegarem completas do
                  outro lado.
                </p>
              </li>
              <li>
                <span className="timeline-label">2. A inscrição ganha um código</span>
                <p>
                  Cada envio recebe um código único e entra na fila da administração.
                </p>
              </li>
              <li>
                <span className="timeline-label">3. A administração analisa</span>
                <p>
                  Leitura das respostas, notas por critério, anotações internas e
                  mudança de status.
                </p>
              </li>
              <li>
                <span className="timeline-label">4. A decisão fica registrada</span>
                <p>
                  Aprovada, recusada ou arquivada — com motivo e histórico de quem mudou
                  o quê.
                </p>
              </li>
            </ol>
          </section>

          <section className="case-block" aria-labelledby="specs-title">
            <h2 id="specs-title">Ficha técnica</h2>
            <dl className="spec-list">
              {specs.map(([term, value]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="case-cta" aria-labelledby="cta-title">
            <h2 id="cta-title">Precisa de um sistema de seleção assim?</h2>
            <p>
              Formulário, painel de análise e identidade do seu servidor, do jeito que a
              sua staff trabalha. Me chama que a gente conversa sobre o escopo.
            </p>
            <nav className="about-links" aria-label="Próximos passos">
              <a href="/#projetos">
                Outros projetos
                <ArrowUpRight />
              </a>
              <a href="/#contato">
                Falar comigo
                <ArrowUpRight />
              </a>
            </nav>
          </section>
        </article>

        <footer>
          <div className="footer-brand">
            <img src="/ucas-avatar.jpg" alt="" width="28" height="28" loading="lazy" />
            <span>Ucas</span>
          </div>
          <p>Sites, launchers e bots para servidores de Minecraft.</p>
        </footer>
      </main>
    </>
  );
}
