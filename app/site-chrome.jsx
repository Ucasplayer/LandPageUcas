// O mesmo cabeçalho e o mesmo rodapé existiam copiados em cinco páginas, junto
// com cinco cópias da seta. O que muda de página para página são só os atalhos
// e a linha do rodapé, então isso vira parâmetro e o resto mora aqui.
//
// A home não usa estes componentes: ela é HTML puro em src/home.html, injetado
// por app/page.jsx. O markup lá é o mesmo, só escrito na outra sintaxe.

export const ArrowUpRight = () => (
  <svg className="row-arrow" aria-hidden="true" viewBox="0 0 24 24">
    <path d="M5 19 19 5M9 5h10v10" />
  </svg>
);

const GithubMark = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.55 9.55 0 0 1 12 7c.85 0 1.7.11 2.5.34 1.9-1.29 2.74-1.02 2.74-1.02.56 1.37.21 2.39.11 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);

export function SiteHeader({ links = [], github = false }) {
  return (
    <header className="topbar">
      <a className="mini-brand" href="/" aria-label="Ucas, voltar para a página inicial">
        <img src="/ucas-avatar.jpg" alt="" width="32" height="32" />
        <span>UCAS</span>
      </a>

      <nav className="top-actions" aria-label="Atalhos">
        {links.map(({ href, label }) => (
          <a className="about-action" href={href} key={href}>
            {label}
          </a>
        ))}

        {github ? (
          <a
            className="icon-action"
            href="https://github.com/Ucasplayer"
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir GitHub de Ucas"
          >
            <GithubMark />
          </a>
        ) : null}
      </nav>
    </header>
  );
}

export function SiteFooter({ note }) {
  return (
    <footer>
      <div className="footer-brand">
        <img src="/ucas-avatar.jpg" alt="" width="28" height="28" loading="lazy" />
        <span>Ucas</span>
      </div>
      <p>{note}</p>
    </footer>
  );
}
