/*
  Gera as prévias de link (Open Graph) em public/og/.

  Por que pré-gerar em vez de renderizar em tempo de build: a prévia precisa ser
  um JPEG absoluto e estável — Discord, X e WhatsApp fazem cache agressivo dela.
  Um arquivo commitado é o formato que todos os três leem sem discussão, não
  depende do ambiente de build e pode ser conferido a olho antes de subir.

  As cartas usam os mesmos tokens do site (DESIGN.md) e as artes que já existem
  em public/. Nada aqui inventa identidade nova.

  Uso: node scripts/og.mjs
*/

import { chromium } from "playwright";
import { mkdir, readFile } from "node:fs/promises";
import { resolve, extname } from "node:path";

const outputDir = resolve("public", "og");
await mkdir(outputDir, { recursive: true });

const TOKENS = {
  night: "#0c0912",
  surface: "#14101c",
  violetSoft: "#a78bfa",
  text: "#f4f1f8",
  copy: "#c7bfce",
  muted: "#81788d",
  line: "#26202f",
  plum: "#21112f",
};

const MIME = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

// O Chromium recusa file:// dentro de setContent, então cada arte entra como
// data URI. Também garante que a carta não dependa de um servidor no ar.
async function dataUri(publicPath) {
  const file = resolve("public", publicPath.replace(/^\//, ""));
  const bytes = await readFile(file);
  return `data:${MIME[extname(file)]};base64,${bytes.toString("base64")}`;
}

const FONT = `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;

const base = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    background: ${TOKENS.night};
    color: ${TOKENS.text};
    font-family: ${FONT};
    -webkit-font-smoothing: antialiased;
  }
  .card { position: relative; width: 1200px; height: 630px; display: flex; }
  .byline {
    position: absolute; bottom: 38px; z-index: 3;
    display: flex; align-items: center; gap: 11px;
    color: ${TOKENS.muted}; font-size: 21px; font-weight: 700; letter-spacing: 0.02em;
  }
  .byline img { width: 32px; height: 32px; border-radius: 50%; }
  .byline .dot { color: ${TOKENS.line}; }
  .tags { display: flex; gap: 10px; }
  .tags span {
    padding: 10px 18px; border: 1px solid ${TOKENS.line}; border-radius: 999px;
    color: ${TOKENS.muted}; font-size: 19px; font-weight: 700; white-space: nowrap;
  }
`;

/* Carta de projeto: duas colunas. A captura real fica à direita, no recorte em
   que o assunto cabe inteiro, e some para dentro do fundo por um degradê — sem
   véu por cima do texto, que só deixava a imagem lamacenta. */
function projectCard({ shot, mark, kicker, title, line, tags, avatar, hud = false }) {
  return `<style>${base}
    .copy {
      position: relative; z-index: 2; flex: 0 0 660px;
      padding: 0 20px 96px 64px;
      display: flex; flex-direction: column; justify-content: center; align-items: flex-start;
    }
    .mark {
      width: 78px; height: 78px; margin-bottom: 26px;
      display: grid; place-items: center; overflow: hidden;
      background: ${TOKENS.plum}; border: 1px solid ${TOKENS.line}; border-radius: 18px;
    }
    .mark img { width: 112%; height: 100%; object-fit: contain; }
    .kicker {
      margin-bottom: 14px; color: ${TOKENS.violetSoft};
      font-size: 20px; font-weight: 780; letter-spacing: 0.07em; text-transform: uppercase;
    }
    h1 { font-size: 66px; font-weight: 780; letter-spacing: -0.035em; line-height: 1.02; }
    .line { margin-top: 20px; max-width: 27ch; color: ${TOKENS.copy}; font-size: 26px; line-height: 1.45; }
    .tags { margin-top: 28px; }
    .shot { position: relative; z-index: 0; flex: 1 1 auto; overflow: hidden; }
    .shot img { width: 100%; height: 100%; object-fit: cover; }
    /* Captura de jogo traz a hotbar colada na borda de baixo. Aproximar e
       ancorar no topo joga o HUD para fora do recorte sem cortar o céu. */
    ${hud ? `.shot img { height: 122%; object-position: center top; }` : ""}
    /* A emenda entre a coluna de texto e a captura não pode existir. */
    .shot::after {
      content: ""; position: absolute; inset: 0;
      background: linear-gradient(90deg, ${TOKENS.night} 0%, rgba(12, 9, 18, 0) 34%),
                  linear-gradient(0deg, rgba(12, 9, 18, 0.55) 0%, rgba(12, 9, 18, 0) 30%);
    }
    .byline { left: 64px; }
  </style>
  <div class="card">
    <div class="copy">
      <div class="mark"><img src="${mark}" /></div>
      <div class="kicker">${kicker}</div>
      <h1>${title}</h1>
      <p class="line">${line}</p>
      <div class="tags">${tags.map((t) => `<span>${t}</span>`).join("")}</div>
    </div>
    <div class="shot"><img src="${shot}" /></div>
    <div class="byline"><img src="${avatar}" /><span>Ucas</span><span class="dot">•</span><span>eaeucas.studio</span></div>
  </div>`;
}

/* Carta de perfil: sem captura, porque não existe produto a mostrar. Repete a
   composição centrada da própria home — o avatar é o único elemento gráfico. */
function profileCard({ avatar, title, role, line, tags }) {
  return `<style>${base}
    .copy {
      width: 1200px; padding: 0 96px 86px;
      display: flex; flex-direction: column; justify-content: center; align-items: center;
      text-align: center;
    }
    .avatar { width: 124px; height: 124px; margin-bottom: 30px; border-radius: 50%; overflow: hidden; }
    .avatar img { width: 100%; height: 100%; object-fit: cover; }
    h1 { font-size: 76px; font-weight: 780; letter-spacing: -0.04em; line-height: 1; }
    .role { margin-top: 14px; color: ${TOKENS.violetSoft}; font-size: 27px; font-weight: 750; }
    .line { margin-top: 20px; max-width: 40ch; color: ${TOKENS.copy}; font-size: 26px; line-height: 1.45; }
    .tags { margin-top: 30px; }
    .byline { left: 50%; transform: translateX(-50%); }
  </style>
  <div class="card">
    <div class="copy">
      <div class="avatar"><img src="${avatar}" /></div>
      <h1>${title}</h1>
      <p class="role">${role}</p>
      <p class="line">${line}</p>
      <div class="tags">${tags.map((t) => `<span>${t}</span>`).join("")}</div>
    </div>
    <div class="byline"><span>eaeucas.studio</span></div>
  </div>`;
}

const avatar = await dataUri("/ucas-avatar.jpg");

const cards = [
  {
    name: "home",
    html: profileCard({
      avatar,
      title: "Ucas",
      role: "Editor de vídeo & Developer",
      line: "Crio vídeos, bots para Discord, launchers e mods para transformar ideias em projetos prontos para o público.",
      tags: ["Edição de vídeo", "Bots para Discord", "Launchers", "Mods"],
    }),
  },
  {
    name: "sobre",
    html: profileCard({
      avatar,
      title: "Sobre o Lucas",
      role: "Criação de conteúdo, tecnologia e música",
      line: "De um canal de Minecraft gravado num Moto G2 até launchers, mods e edição — a trajetória inteira.",
      tags: ["História", "Interesses", "Trajetória"],
    }),
  },
  {
    name: "eclipse-mod",
    html: projectCard({
      avatar,
      shot: await dataUri("/eclipse-shot-totalidade.webp"),
      mark: await dataUri("/eclipse-mark.webp"),
      hud: true,
      kicker: "Projeto próprio · Mod de Minecraft",
      title: "Eclipse Mod",
      line: "Um comando escurece o mundo e o servidor inteiro vive o mesmo instante.",
      tags: ["Forge 1.20.1", "Java 17", "Shader GLSL"],
    }),
  },
  {
    name: "xenthor-launcher",
    html: projectCard({
      avatar,
      shot: await dataUri("/xenthor-shot-main.webp"),
      mark: await dataUri("/xenthor-logo.webp"),
      kicker: "Projeto próprio · Minecraft",
      title: "Xenthor Launcher",
      line: "Instala o modpack, resolve o Java e abre o jogo com um clique.",
      tags: ["Electron", "Minecraft 1.21.5", "Fabric"],
    }),
  },
  {
    name: "kryptos-smp",
    html: projectCard({
      avatar,
      shot: await dataUri("/kryptos-shot-landing.webp"),
      mark: await dataUri("/kryptos-logo.webp"),
      kicker: "Projeto · Site de servidor",
      title: "Kryptós SMP",
      line: "Formulário de seleção em etapas e painel de análise para a staff.",
      tags: ["Next.js", "PostgreSQL", "No ar"],
    }),
  },
];

const browser = await chromium.launch({
  executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  headless: true,
});

for (const card of cards) {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(card.html, { waitUntil: "load" });
  await page.evaluate(() =>
    Promise.all([...document.images].map((image) => image.decode().catch(() => {}))),
  );
  await page.screenshot({
    path: resolve(outputDir, `${card.name}.jpg`),
    type: "jpeg",
    quality: 88,
  });
  await page.close();
  console.log(`public/og/${card.name}.jpg`);
}

await browser.close();
