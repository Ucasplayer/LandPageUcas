/*
  THESIS: O Xenthor Launcher deixa de ser um link externo e vira uma página de projeto que mostra o produto funcionando.
  OWN-WORLD: Mesma coluna de 620px, superfícies ameixa e violeta restrito à ação; as capturas são a única imagem grande.
  STORY: O visitante vê as telas reais, entende o que o launcher resolve, confere a ficha técnica e chama para conversar.
  FIRST VIEWPORT: Marca do Xenthor, nome do projeto, uma frase do que ele faz e as etiquetas de stack.
  FORM: Estudo de caso curto em coluna única — capturas, recursos, fluxo, ficha técnica e contato.
*/

import { social } from "../../social-meta";
import { ArrowUpRight, SiteHeader, SiteFooter } from "../../site-chrome";

export const metadata = {
  title: "Xenthor Launcher — Ucas",
  description:
    "Launcher desktop do servidor Xenthor: instala mods, valida arquivos, gerencia Java e abre o Minecraft com um clique.",
  ...social({
    title: "Xenthor Launcher — Ucas",
    description:
      "Launcher desktop feito em Electron para o Xenthor SMP: atualização automática de mods, login Microsoft e entrada no servidor com um clique.",
    path: "/projetos/xenthor-launcher",
    card: "xenthor-launcher",
    alt: "Cartão do Xenthor Launcher: a tela principal do launcher com o botão Jogar.",
  }),
};

const shots = [
  {
    src: "/xenthor-shot-login.webp",
    width: 973,
    height: 532,
    alt: "Tela de opções de login do Xenthor Launcher com os botões Entrar com Microsoft e Entrar Offline.",
    title: "Login em dois caminhos",
    copy: "Conta Microsoft para jogar no servidor e modo offline para testes internos.",
  },
  {
    src: "/xenthor-shot-offline.webp",
    width: 982,
    height: 537,
    alt: "Tela de login offline do Xenthor Launcher com a marca do XSMP e o campo de usuário.",
    title: "Identidade do servidor em cada tela",
    copy: "A marca, as cores e os textos do launcher são feitos sob medida para o servidor.",
  },
  {
    src: "/xenthor-shot-welcome.webp",
    width: 975,
    height: 533,
    alt: "Tela de boas-vindas do Xenthor Launcher apresentando a história do mundo XSMP.",
    title: "Boas-vindas que contam a história",
    copy: "O primeiro acesso apresenta o mundo antes do jogador entrar — parte da experiência, não só um instalador.",
  },
  {
    src: "/xenthor-shot-main.webp",
    width: 963,
    height: 527,
    alt: "Tela principal do Xenthor Launcher com o botão Jogar, o servidor selecionado, o status do servidor, o painel de notícias, a conta do jogador e os links do servidor.",
    title: "A tela principal",
    copy: "Tudo o que o jogador precisa em uma tela só: jogar, ver se o servidor está no ar, ler as novidades e ajustar o que quiser.",
  },
];

const tools = [
  {
    title: "Jogar",
    copy: "Baixa o que estiver faltando, confere os arquivos e abre o jogo. O progresso aparece logo abaixo do botão.",
  },
  {
    title: "Servidor selecionado",
    copy: "Mostra em qual servidor o jogador vai entrar e abre a lista quando existe mais de um.",
  },
  {
    title: "Status do servidor",
    copy: "O launcher conversa com o servidor de verdade e mostra quantos jogadores estão online, atualizando sozinho a cada cinco minutos. Fora do ar, marca offline.",
  },
  {
    title: "Conta e skin",
    copy: "A skin e o nome de quem está logado ficam à vista, e dá para trocar de conta sem sair do launcher.",
  },
  {
    title: "Notícias",
    copy: "Avisos e patch notes publicados no Discord do servidor aparecem aqui, com um alerta quando chega novidade.",
  },
  {
    title: "Configurações",
    copy: "Conta, resolução do jogo, mods opcionais, shaders, memória e Java. O mesmo botão avisa quando sai uma atualização do launcher.",
  },
  {
    title: "Links do servidor",
    copy: "Site, X, TikTok, YouTube e Discord, definidos por quem administra o servidor.",
  },
];

const features = [
  {
    title: "Um clique para jogar",
    copy: "O launcher baixa mods, bibliotecas e versão do jogo sozinho. O jogador nunca mexe em pasta de mods.",
  },
  {
    title: "Atualização controlada por você",
    copy: "Um manifesto remoto define versões, mods e servidor. Você publica a mudança e todo mundo recebe no próximo login.",
  },
  {
    title: "Arquivos verificados antes de abrir",
    copy: "Cada dependência é conferida por tamanho e integridade, o que evita crash por download corrompido.",
  },
  {
    title: "Java e memória resolvidos",
    copy: "Valida a versão de Java, sugere a instalação certa e deixa RAM e diretório de dados configuráveis.",
  },
  {
    title: "Mods opcionais e shaders",
    copy: "O jogador liga e desliga os mods que não são obrigatórios, adiciona os dele e escolhe shaderpacks pelas configurações.",
  },
  {
    title: "Presença no Discord",
    copy: "Rich Presence mostra no perfil de quem está jogando que ele está no seu servidor.",
  },
];

const specs = [
  ["Base", "Electron (desktop nativo)"],
  ["Minecraft", "1.21.5 com Fabric Loader"],
  ["Java", "21, validado pelo launcher"],
  ["Memória", "4 GB recomendados · 2 GB mínimo"],
  ["Plataformas", "Windows, macOS e Linux"],
  ["Idiomas", "Português do Brasil e inglês"],
  ["Login", "Conta Microsoft e modo offline"],
  ["Atualização", "O launcher se atualiza sozinho"],
];

export default function XenthorLauncherPage() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <main className="page-shell case-page" id="conteudo">
        <SiteHeader
          links={[
            { href: "/mods", label: "Projetos" },
            { href: "/", label: "Início" },
          ]}
        />

        <article className="case-article">
          <header className="case-hero">
            <div className="case-mark" data-mark="xenthor">
              <img
                src="/xenthor-logo.webp"
                alt="Marca do Xenthor Launcher"
                width="900"
                height="600"
              />
            </div>
            <h1>Xenthor Launcher</h1>
            <p className="case-lede">
              O launcher desktop do Xenthor SMP. Ele instala o modpack, mantém tudo
              atualizado, resolve o Java e coloca o jogador dentro do servidor com um
              clique.
            </p>
            <ul className="case-tags" aria-label="Tecnologias">
              <li>Electron</li>
              <li>Minecraft 1.21.5</li>
              <li>Fabric</li>
              <li>Windows · macOS · Linux</li>
            </ul>
          </header>

          <section className="case-block" aria-labelledby="shots-title">
            <h2 id="shots-title">Como ele é por dentro</h2>
            <div className="shot-list">
              {shots.map((shot) => (
                <figure className="shot" key={shot.src}>
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

          <section className="case-block" aria-labelledby="tools-title">
            <h2 id="tools-title">O que tem na tela principal</h2>
            <ul className="tool-list">
              {tools.map((tool) => (
                <li key={tool.title}>
                  <strong>{tool.title}</strong>
                  <span>{tool.copy}</span>
                </li>
              ))}
            </ul>
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
            <h2 id="flow-title">O caminho do jogador</h2>
            <ol className="timeline">
              <li>
                <span className="timeline-label">1. Entrar</span>
                <p>Login com conta Microsoft ou modo offline para testes.</p>
              </li>
              <li>
                <span className="timeline-label">2. Sincronizar</span>
                <p>
                  O launcher compara os arquivos locais com o manifesto do servidor e
                  baixa só o que falta.
                </p>
              </li>
              <li>
                <span className="timeline-label">3. Preparar</span>
                <p>
                  Java e memória são validados e o comando de inicialização é montado
                  com os parâmetros certos.
                </p>
              </li>
              <li>
                <span className="timeline-label">4. Jogar</span>
                <p>
                  O Minecraft abre já conectado ao servidor, com as notícias e o status
                  visíveis na tela inicial.
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
            <h2 id="cta-title">Quer um launcher assim para o seu servidor?</h2>
            <p>
              Faço o launcher com a identidade do seu projeto, do manifesto de mods à
              tela de boas-vindas. Me chama que a gente conversa sobre o escopo.
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

        <SiteFooter note="Launchers, mods e bots para servidores de Minecraft." />
      </main>
    </>
  );
}
