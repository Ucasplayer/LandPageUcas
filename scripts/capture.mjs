import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const outputDir = resolve(".visual-check");
const siteUrl = process.env.UCAS_SITE_URL || "http://127.0.0.1:4173";
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  headless: true,
});

for (const capture of [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
]) {
  const page = await browser.newPage({
    viewport: { width: capture.width, height: capture.height },
    deviceScaleFactor: 1,
  });
  await page.goto(siteUrl, { waitUntil: "networkidle" });

  for (const source of [
    "/loud-comments.jpg",
    "/xenthor-logo.webp",
    "/kryptos-logo.webp",
    "/ucas-avatar.jpg",
  ]) {
    const image = page.locator(`img[src="${source}"]`).first();
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((element) => element.decode());
    await page.waitForTimeout(120);
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  await page.screenshot({
    path: resolve(outputDir, `${capture.name}.png`),
    fullPage: true,
  });
  await page.close();

  const aboutPage = await browser.newPage({
    viewport: { width: capture.width, height: capture.height },
    deviceScaleFactor: 1,
  });
  await aboutPage.goto(new URL("/sobre", siteUrl).href, { waitUntil: "networkidle" });
  const aboutAvatar = aboutPage.locator(".about-avatar img");
  await aboutAvatar.evaluate((element) => element.decode());
  await aboutPage.screenshot({
    path: resolve(outputDir, `about-${capture.name}.png`),
    fullPage: true,
  });
  await aboutPage.close();
}

await browser.close();
