import { chromium } from "playwright";

const browser = await chromium.launch({
  executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  headless: true,
});

const issues = [];
const siteUrl = process.env.UCAS_SITE_URL || "http://127.0.0.1:4173";

for (const viewport of [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
  { name: "narrow", width: 320, height: 800 },
]) {
  const page = await browser.newPage({
    viewport: { width: viewport.width, height: viewport.height },
  });

  page.on("pageerror", (error) => issues.push(`${viewport.name}: ${error.message}`));
  await page.goto(siteUrl, { waitUntil: "networkidle" });
  await page.locator("[data-projects]").scrollIntoViewIfNeeded();
  await page
    .waitForFunction(
      () =>
        ["/xenthor-logo.webp", "/oreon-logo.png", "/loud-comments.jpg"].every((source) => {
          const image = document.querySelector(`img[src="${source}"]`);
          return image?.complete && image.naturalWidth > 0;
        }),
      null,
      { timeout: 8000 },
    )
    .catch(() => {});
  await page.locator("footer").scrollIntoViewIfNeeded();
  await page
    .waitForFunction(() =>
      [...document.querySelectorAll('img[src="/ucas-avatar.jpg"]')].every(
        (image) => image.complete && image.naturalWidth > 0,
      ),
    )
    .catch(() => {});

  const result = await page.evaluate(() => ({
    title: document.title,
    language: document.documentElement.lang,
    h1Count: document.querySelectorAll("h1").length,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    unlabeledButtons: [...document.querySelectorAll("button")].filter(
      (button) => !button.textContent.trim() && !button.getAttribute("aria-label"),
    ).length,
    emptyLinks: [...document.querySelectorAll("a")].filter(
      (link) => !link.getAttribute("href") || link.getAttribute("href") === "#",
    ).length,
    busy: document.querySelector("[data-projects]")?.getAttribute("aria-busy"),
    skipHref: document.querySelector(".skip-link")?.getAttribute("href"),
    identityImages: [...document.querySelectorAll('img[src="/ucas-avatar.jpg"]')].map(
      (image) => ({
        complete: image.complete,
        naturalWidth: image.naturalWidth,
        alt: image.getAttribute("alt"),
      }),
    ),
    portfolioImages: [
      "/xenthor-logo.webp",
      "/oreon-logo.png",
      "/loud-comments.jpg",
    ].map((source) => {
      const image = document.querySelector(`img[src="${source}"]`);
      return {
        source,
        complete: image?.complete || false,
        naturalWidth: image?.naturalWidth || 0,
      };
    }),
    loudLink: document.querySelector(".editorial-row")?.getAttribute("href"),
    loudCopy: document.querySelector(".editorial-row")?.textContent,
    aboutHref: document.querySelector(".about-action")?.getAttribute("href"),
    channelHrefs: [...document.querySelectorAll(".channel-row")].map((link) =>
      link.getAttribute("href"),
    ),
    channelTargets: [...document.querySelectorAll(".channel-row")].map(
      (link) => link.getBoundingClientRect().height,
    ),
    contactHrefs: [...document.querySelectorAll(".contact-row[href]")].map((link) =>
      link.getAttribute("href"),
    ),
    primaryActions: [...document.querySelectorAll(".button, .contact-row")].map(
      (element) => element.getBoundingClientRect().height,
    ),
    projectTargets: [...document.querySelectorAll(".project-row")].map(
      (element) => element.getBoundingClientRect().height,
    ),
    iconTargets: [...document.querySelectorAll(".icon-action")].map(
      (element) => element.getBoundingClientRect().height,
    ),
  }));

  if (!result.title) issues.push(`${viewport.name}: título ausente`);
  if (result.language !== "pt-BR") issues.push(`${viewport.name}: idioma incorreto`);
  if (result.h1Count !== 1) issues.push(`${viewport.name}: esperado um h1`);
  if (result.overflow > 1) {
    issues.push(`${viewport.name}: overflow horizontal de ${result.overflow}px`);
  }
  if (result.unlabeledButtons) {
    issues.push(`${viewport.name}: ${result.unlabeledButtons} botão(ões) sem nome`);
  }
  if (result.emptyLinks) issues.push(`${viewport.name}: ${result.emptyLinks} link(s) vazio(s)`);
  if (result.busy !== "false") issues.push(`${viewport.name}: projetos ainda carregando`);
  if (result.skipHref !== "#conteudo") issues.push(`${viewport.name}: skip link incorreto`);

  if (
    result.identityImages.length < 3 ||
    result.identityImages.some((image) => !image.complete || image.naturalWidth < 1)
  ) {
    issues.push(`${viewport.name}: identidade visual ausente ou não carregada`);
  }
  if (!result.identityImages.some((image) => image.alt?.trim())) {
    issues.push(`${viewport.name}: identidade visual sem texto alternativo`);
  }
  if (result.portfolioImages.some((image) => !image.complete || image.naturalWidth < 1)) {
    issues.push(`${viewport.name}: imagem de portfólio ausente ou não carregada`);
  }
  if (
    result.loudLink !== "https://x.com/LoudComments" ||
    !result.loudCopy?.includes("Creative Manager")
  ) {
    issues.push(`${viewport.name}: prova LOUD Comments incompleta`);
  }
  if (result.aboutHref !== "/sobre") {
    issues.push(`${viewport.name}: botão Sobre ausente ou incorreto`);
  }
  const expectedChannels = [
    "https://www.youtube.com/@Ucasix",
    "https://www.youtube.com/@Ucashardware",
    "https://www.youtube.com/@UcasRivals",
    "https://www.youtube.com/@oreonSMP",
  ];
  if (
    expectedChannels.some((href) => !result.channelHrefs.includes(href)) ||
    result.channelTargets.some((height) => height < 44)
  ) {
    issues.push(`${viewport.name}: canais pessoais incompletos ou com alvo pequeno`);
  }

  const expectedContacts = [
    "mailto:lucasrcomercial1@gmail.com",
    "https://x.com/eaeucas",
    "https://instagram.com/eaeucas",
  ];
  if (expectedContacts.some((href) => !result.contactHrefs.includes(href))) {
    issues.push(`${viewport.name}: contatos secundários incompletos`);
  }
  if (
    [...result.primaryActions, ...result.projectTargets, ...result.iconTargets].some(
      (height) => height < 44,
    )
  ) {
    issues.push(`${viewport.name}: alvo interativo menor que 44px`);
  }

  const copyButton = page.locator("[data-copy-discord]").first();
  await copyButton.click();
  await page
    .waitForFunction(
      () => document.querySelector("[data-copy-status]")?.textContent.includes("@eaeucas"),
      null,
      { timeout: 2000 },
    )
    .catch(() => {});
  const copyFeedback = await page.locator("[data-copy-status]").textContent();
  if (!copyFeedback?.includes("@eaeucas")) {
    issues.push(`${viewport.name}: cópia do Discord sem confirmação`);
  }

  await page.close();

  const aboutPage = await browser.newPage({
    viewport: { width: viewport.width, height: viewport.height },
  });
  aboutPage.on("pageerror", (error) =>
    issues.push(`${viewport.name} sobre: ${error.message}`),
  );
  await aboutPage.goto(new URL("/sobre", siteUrl).href, { waitUntil: "networkidle" });
  const aboutResult = await aboutPage.evaluate(() => ({
    title: document.title,
    language: document.documentElement.lang,
    h1Count: document.querySelectorAll("h1").length,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    homeHref: document.querySelector(".about-action")?.getAttribute("href"),
    biography: document.querySelector(".about-copy")?.textContent,
    interests: document.querySelectorAll(".interest-grid li").length,
    milestones: document.querySelectorAll(".timeline li").length,
    actionTargets: [...document.querySelectorAll(".about-links a, .about-action")].map(
      (link) => link.getBoundingClientRect().height,
    ),
    identity: {
      complete: document.querySelector(".about-avatar img")?.complete || false,
      naturalWidth: document.querySelector(".about-avatar img")?.naturalWidth || 0,
      alt: document.querySelector(".about-avatar img")?.getAttribute("alt"),
    },
  }));

  if (!aboutResult.title || aboutResult.language !== "pt-BR" || aboutResult.h1Count !== 1) {
    issues.push(`${viewport.name} sobre: metadados ou hierarquia incorretos`);
  }
  if (aboutResult.overflow > 1) {
    issues.push(`${viewport.name} sobre: overflow horizontal de ${aboutResult.overflow}px`);
  }
  if (
    aboutResult.homeHref !== "/" ||
    !aboutResult.biography?.includes("Moto G2") ||
    !aboutResult.biography?.includes("10 mil inscritos") ||
    aboutResult.interests !== 6 ||
    aboutResult.milestones !== 4
  ) {
    issues.push(`${viewport.name} sobre: conteúdo biográfico incompleto`);
  }
  if (
    aboutResult.actionTargets.some((height) => height < 44) ||
    !aboutResult.identity.complete ||
    aboutResult.identity.naturalWidth < 1 ||
    !aboutResult.identity.alt?.trim()
  ) {
    issues.push(`${viewport.name} sobre: interação ou identidade inválida`);
  }

  await aboutPage.close();
}

await browser.close();

if (issues.length) {
  console.error(issues.join("\n"));
  process.exit(1);
}

console.log("Visual and interaction checks passed on desktop, mobile and narrow viewports.");
