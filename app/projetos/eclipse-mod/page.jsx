/*
  THESIS: O Eclipse Mod é a prova de que eu escrevo mod de verdade — evento global, renderização própria de céu e sincronização entre servidor e cliente.
  OWN-WORLD: Mesma coluna de 620px; as capturas do céu são a única imagem grande e o preto do disco é a cor mais forte da página.
  STORY: O visitante vê o eclipse acontecendo, entende a linha do tempo, lê as decisões técnicas que sustentam o efeito e chama para conversar.
  FIRST VIEWPORT: Marca do eclipse, nome do mod, uma frase do que ele faz e as etiquetas de stack.
  FORM: Estudo de caso curto em coluna única — capturas, linha do tempo, o que muda no mundo, decisões, comandos, ficha técnica e contato.
*/

import { social } from "../../social-meta";
import { ArrowUpRight, SiteHeader, SiteFooter } from "../../site-chrome";

export const metadata = {
  title: "Eclipse Mod — Ucas",
  description:
    "Mod de Minecraft que transforma o eclipse em evento global do servidor: céu, corona e escurecimento próprios, sincronizados para todo mundo ver o mesmo frame.",
  ...social({
    title: "Eclipse Mod — Ucas",
    description:
      "Mod Forge 1.20.1 feito para o Eclipse Realm SMP: eclipse solar e lunar acionado por comando, com renderização própria de céu e corona gerada por shader.",
    path: "/projetos/eclipse-mod",
    card: "eclipse-mod",
    alt: "Cartão do Eclipse Mod: o pico da totalidade em Minecraft, com o disco negro e a corona.",
  }),
};

const shots = [
  {
    src: "/eclipse-shot-aproximacao.webp",
    width: 1720,
    height: 911,
    alt: "Céu de Minecraft com o disco da Lua quase cobrindo o Sol, deixando só uma borda brilhante, sobre um bioma de badlands.",
    title: "A aproximação",
    copy: "O disco cobre o Sol aos poucos e a luz do mundo cai junto. Todo jogador online vê exatamente o mesmo frame, mesmo quem entrou no meio do evento.",
  },
  {
    src: "/eclipse-shot-totalidade.webp",
    width: 1720,
    height: 911,
    alt: "Pico do eclipse solar em Minecraft: disco totalmente negro com uma corona branca de filamentos ao redor, com shaderpack ativo.",
    title: "O pico de totalidade",
    copy: "A corona é gerada por um shader próprio, quadro a quadro — os filamentos se deformam continuamente e nunca repetem. Aqui com o Complementary Unbound ligado.",
  },
  {
    src: "/eclipse-shot-vanilla.webp",
    width: 1720,
    height: 911,
    alt: "O mesmo eclipse no Minecraft sem shaderpack: disco negro com raios de corona bem definidos sobre o céu azul escurecido.",
    title: "Sem shaderpack nenhum",
    copy: "O mesmo evento no jogo padrão. Corona, escurecimento e estrelas no meio do dia vêm do próprio mod — nenhum jogador precisa instalar nada além do modpack.",
  },
  {
    src: "/eclipse-shot-horizonte.webp",
    width: 1720,
    height: 911,
    alt: "Eclipse no horizonte durante a noite, com a corona branca subindo atrás do relevo e o céu tingido de roxo e rosa.",
    title: "O céu inteiro responde",
    copy: "O disco acompanha a posição real do Sol, então o eclipse desce com ele. Perto do horizonte entra uma faixa arroxeada e as estrelas terminam de aparecer.",
  },
];

const world = [
  {
    title: "Disco e corona",
    copy: "A silhueta da Lua atravessa o Sol e a corona cresce junto. No instante da totalidade há um impacto de menos de um segundo: a corona abre 18% e a luz cai mais um degrau.",
  },
  {
    title: "Escuridão de verdade",
    copy: "O mod escurece a própria tabela de iluminação do jogo, não um filtro por cima da tela. O mundo fica escuro como fica à noite.",
  },
  {
    title: "Bases e cavernas continuam jogáveis",
    copy: "A luz de tocha resiste ao escurecimento e existe um piso absoluto de brilho. A totalidade nunca vira tela preta.",
  },
  {
    title: "Estrelas no meio do dia",
    copy: "Um campo de estrelas próprio aparece durante o eclipse diurno e some quando ele termina, sem brigar com as estrelas do jogo à noite.",
  },
  {
    title: "Névoa, cor e silêncio",
    copy: "A névoa se aproxima, a tela ganha uma gradação fria e a ambiência do jogo é abafada na chegada da totalidade. Cinzas discretas caem no pico.",
  },
  {
    title: "O jogador sente no corpo",
    copy: "Durante o eclipse a vida máxima cai para quatro corações e o jogador ganha Speed I, que vira Speed II na totalidade. O evento muda como se joga, não só como se vê.",
  },
  {
    title: "Eclipse lunar",
    copy: "À noite o evento tinge a Lua de vermelho escuro respeitando a fase atual dela, com um halo em volta.",
  },
];

const decisions = [
  {
    title: "Ninguém dessincroniza",
    copy: "O servidor manda só o horário do mundo em que o eclipse começou. Cliente e servidor calculam a mesma linha do tempo a partir daí.",
  },
  {
    title: "Praticamente zero rede",
    copy: "São 17 bytes por evento e nada por tick. O eclipse não pesa na banda do servidor nem com o mundo cheio.",
  },
  {
    title: "Restart não quebra o evento",
    copy: "O estado é salvo no mundo. Se o servidor cair durante a totalidade, ele volta na totalidade, no mesmo ponto.",
  },
  {
    title: "Sem flash branco",
    copy: "O impacto da totalidade só escurece e amplia, nunca clareia a tela. É uma decisão de acessibilidade para jogadores fotossensíveis.",
  },
  {
    title: "Funciona com shaderpack",
    copy: "Testado em jogo com o Complementary Unbound. A detecção de shader é opcional: sem o Oculus instalado o mod roda igual, sem dependência e sem crash.",
  },
  {
    title: "O shader nunca derruba o cliente",
    copy: "Se a corona procedural não compilar na máquina do jogador, o mod registra o erro e volta para a corona de textura. O efeito bonito é um bônus, não um requisito.",
  },
  {
    title: "Você ajusta sem recompilar",
    copy: "Duração de cada fase, efeitos e camadas visuais ficam em arquivos de configuração. O servidor manda as regras e os clientes recebem no login.",
  },
  {
    title: "Português e inglês",
    copy: "Todas as mensagens passam pelo sistema de tradução do jogo e chegam no idioma de cada jogador.",
  },
];

const commands = [
  ["/eclipse", "Liga ou desliga o evento"],
  ["/eclipse start", "Liga"],
  ["/eclipse stop", "Desliga"],
  ["/eclipse status", "Mostra se está ativo e em qual fase"],
  ["/eclipse totality", "Pula direto para o pico — para testes"],
  ["/eclipse phase <fase>", "Pula para o início de qualquer fase — para testes"],
];

const specs = [
  ["Minecraft", "1.20.1 com Forge"],
  ["Java", "17"],
  ["Lado", "Servidor e cliente, com config sincronizada"],
  ["Renderização", "Céu, corona, halo e estrelas próprios"],
  ["Corona", "Shader GLSL próprio, com queda para textura"],
  ["Shaderpacks", "Compatível via Oculus/Iris, sem dependência"],
  ["Permissão", "Nível 2 — só operadores acionam"],
  ["Idiomas", "Português do Brasil e inglês"],
  ["Licença", "MIT"],
];

export default function EclipseModPage() {
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
            <div className="case-mark" data-mark="eclipse">
              <img
                src="/eclipse-mark.webp"
                alt="Marca do Eclipse Mod: disco negro com a corona ao redor"
                width="400"
                height="400"
              />
            </div>
            <h1>Eclipse Mod</h1>
            <p className="case-lede">
              Um eclipse que o servidor inteiro vive junto. Um comando escurece o
              mundo, abre a corona no céu e muda como se joga — e todo mundo vê o
              mesmo instante, ao mesmo tempo. Feito para o Eclipse Realm SMP.
            </p>
            <ul className="case-tags" aria-label="Tecnologias">
              <li>Forge 1.20.1</li>
              <li>Java 17</li>
              <li>Shader GLSL</li>
              <li>Compatível com shaderpacks</li>
            </ul>
          </header>

          <section className="case-block" aria-labelledby="shots-title">
            <h2 id="shots-title">O eclipse em jogo</h2>
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

          <section className="case-block" aria-labelledby="flow-title">
            <h2 id="flow-title">Como o evento acontece</h2>
            <ol className="timeline">
              <li>
                <span className="timeline-label">1. Início</span>
                <p>
                  Um operador digita <code>/eclipse</code>. A luz começa a cair e um
                  som grave avisa o servidor de que alguma coisa mudou.
                </p>
              </li>
              <li>
                <span className="timeline-label">2. Parcial</span>
                <p>
                  A Lua avança sobre o Sol, o céu escurece e os jogadores já sentem a
                  diferença de vida e de velocidade.
                </p>
              </li>
              <li>
                <span className="timeline-label">3. Aproximação</span>
                <p>
                  Estrelas aparecem no meio do dia, a névoa fecha e a ambiência é
                  abafada. É o trecho que constrói a tensão.
                </p>
              </li>
              <li>
                <span className="timeline-label">4. Totalidade</span>
                <p>
                  O pico chega e <strong>fica</strong>. O eclipse só termina quando um
                  operador quiser — o tempo de evento é seu, não do relógio do mod. Na
                  saída, a luz volta pela mesma escada, em dois estágios.
                </p>
              </li>
            </ol>
          </section>

          <section className="case-block" aria-labelledby="world-title">
            <h2 id="world-title">O que muda no mundo</h2>
            <ul className="tool-list">
              {world.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.copy}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="case-block" aria-labelledby="decisions-title">
            <h2 id="decisions-title">Decisões que sustentam o efeito</h2>
            <ul className="feature-grid">
              {decisions.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.copy}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="case-block" aria-labelledby="commands-title">
            <h2 id="commands-title">O controle fica com a staff</h2>
            <dl className="spec-list">
              {commands.map(([term, value]) => (
                <div key={term}>
                  <dt>
                    <code>{term}</code>
                  </dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
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
            <h2 id="cta-title">Quer um evento assim no seu servidor?</h2>
            <p>
              Faço mods de evento sob medida: a ideia, o efeito no céu, o que muda para
              o jogador e o comando que a sua staff usa. Me chama que a gente conversa
              sobre o escopo.
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
