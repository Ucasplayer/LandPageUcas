import SiteEffects from "./site-effects";

// Marca cada navegação como "forward" ou "back" pela profundidade da URL, para
// que a página entre pelo lado do movimento. Precisa rodar durante o parse: o
// evento `pagereveal` dispara antes de qualquer efeito de React.
const navigationDirection = `
(function () {
  if (!document.startViewTransition) return;

  function depth(url) {
    try {
      return new URL(url, location.href).pathname.split("/").filter(Boolean).length;
    } catch (error) {
      return 0;
    }
  }

  function mark(transition, activation) {
    if (!transition || !transition.types || !activation || !activation.from) return;
    var travelled = depth(activation.entry.url) - depth(activation.from.url);
    transition.types.add(travelled < 0 ? "back" : "forward");
  }

  // Uma marca fora da tela não tem continuidade para preservar: pareá-la faria a
  // contraparte viajar de fora do viewport até o lugar novo. Soltar o nome antes
  // da captura devolve esse elemento ao corte normal da página.
  //
  // Vale medir o scroll do momento, não o de destino. Numa navegação com âncora
  // (/#projetos) o navegador só rola depois que a transição termina: durante ela
  // a home ainda está no topo, com a lista de projetos mais de 1300px abaixo da
  // dobra. Projetar o destino aqui pareava a marca e a fazia voar para fora da
  // tela — exatamente o que esta função existe para impedir.
  function pruneOffscreen() {
    var marks = document.querySelectorAll("[data-mark]");
    for (var i = 0; i < marks.length; i++) {
      var box = marks[i].getBoundingClientRect();
      if (box.bottom <= 0 || box.top >= innerHeight) {
        marks[i].style.viewTransitionName = "none";
      }
    }
  }

  addEventListener("pageswap", function (event) {
    if (!event.viewTransition) return;
    mark(event.viewTransition, event.activation);
    pruneOffscreen();
  });

  addEventListener("pagereveal", function (event) {
    if (!event.viewTransition) return;
    mark(event.viewTransition, navigation && navigation.activation);
    pruneOffscreen();
  });
})();
`;

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
        <script dangerouslySetInnerHTML={{ __html: navigationDirection }} />
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