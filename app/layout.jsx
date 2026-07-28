

export const metadata = {
  title: "Ucas — Editor de vídeo & Developer",
  description:
    "Portfólio de edição de vídeo, bots para Discord, launchers e mods para Minecraft.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Ucas — Editor de vídeo & Developer",
    description: "Edição e desenvolvimento para projetos de Minecraft e criadores.",
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
      <body>{children}</body>
    </html>
  );
}
