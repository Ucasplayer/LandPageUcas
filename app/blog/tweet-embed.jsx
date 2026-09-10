"use client";

import { useEffect, useRef } from "react";

/*
  Embed oficial do X (twitter.com/.../status/ID): um blockquote simples que o
  script widgets.js troca por um iframe de verdade, com o tweet completo —
  texto, imagens e vídeo tocável — direto do X. Não baixamos mídia nenhuma;
  quem serve o conteúdo continua sendo o X.

  O script só varre o DOM automaticamente na carga inicial da página. Como o
  Next navega no cliente sem recarregar, cada post novo precisa pedir o
  re-scan manualmente — daí o useEffect chamando twttr.widgets.load() depois
  que o blockquote já está montado.
*/
export function TweetEmbed({ url }) {
  const ref = useRef(null);

  useEffect(() => {
    const load = () => window.twttr?.widgets?.load(ref.current);

    if (window.twttr?.widgets) {
      load();
      return;
    }

    const existing = document.querySelector(
      'script[src="https://platform.twitter.com/widgets.js"]',
    );

    if (existing) {
      existing.addEventListener("load", load, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.addEventListener("load", load, { once: true });
    document.body.appendChild(script);
  }, [url]);

  return (
    <div className="post-tweet" ref={ref}>
      <blockquote className="twitter-tweet" data-theme="dark">
        <a href={url}>{url}</a>
      </blockquote>
    </div>
  );
}
