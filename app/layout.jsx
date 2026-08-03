import SiteEffects from "./site-effects";

export const metadata = {
  title: "Ucas — Editor de vídeo & Developer",
  description:
    "Portfólio de edição de vídeo, bots para Discord, launchers e mods para Minecraft.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Ucas — Editor de vídeo & Developer",
    description:
      "Edição e desenvolvimento para projetos.",
  },
};

export const viewport = {
  themeColor: "#0c0912",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div className="scroll-progress" aria-hidden="true">
          <div className="scroll-progress-bar" data-scroll-progress />
        </div>
        {children}
        <SiteEffects />
      </body>
    </html>
  );
}