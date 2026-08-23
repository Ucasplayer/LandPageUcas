"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

import { AD_CLIENT, slots } from "./ads";

// Depois disso, se o AdSense não tiver dado sinal de vida, o espaço some. É o
// caso do bloqueador de anúncio, que nunca deixa o script rodar: sem esse
// prazo, a moldura reservada ficaria vazia na página para sempre.
const DESISTIR_EM = 2500;

/*
  Um espaço de anúncio, com três estados:

    pendente  — altura reservada, para o anúncio não empurrar o texto ao chegar
    cheio     — moldura e rótulo aparecem
    vazio     — o espaço inteiro sai da página, sem deixar buraco

  O terceiro estado é o que mais acontece na prática (inventário vazio,
  bloqueador de anúncio) e é o que separa isto de colar o snippet cru: sem ele,
  sobra um retângulo vazio de 150px no meio do artigo.

  O script do AdSense é carregado aqui, e não em um layout: assim ele entra
  exatamente nas páginas que têm anúncio, e nenhuma outra paga o custo de rede
  de um script de terceiro. `next/script` faz a deduplicação pelo id, então
  dois espaços na mesma página continuam carregando um script só.

  Sem `data-ad-slot` configurado em app/ads.js, não renderiza nada — nem o
  script.
*/

export function AdSlot({ name, label = "Publicidade" }) {
  const slot = slots[name];
  const ins = useRef(null);
  const pushed = useRef(false);
  const [estado, setEstado] = useState("pendente");

  useEffect(() => {
    if (!slot || pushed.current) return;
    pushed.current = true;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      setEstado("vazio");
      return;
    }

    // O AdSense escreve data-ad-status no <ins> quando resolve o leilão.
    const observer = new MutationObserver(() => {
      const status = ins.current?.dataset.adStatus;
      if (!status) return;
      setEstado(status === "filled" ? "cheio" : "vazio");
      observer.disconnect();
    });

    if (ins.current) {
      observer.observe(ins.current, { attributes: true, attributeFilter: ["data-ad-status"] });
    }

    const prazo = window.setTimeout(() => {
      if (!ins.current?.dataset.adStatus) setEstado("vazio");
    }, DESISTIR_EM);

    return () => {
      observer.disconnect();
      window.clearTimeout(prazo);
    };
  }, [slot]);

  if (!slot || estado === "vazio") return null;

  return (
    <aside className="ad-slot" data-estado={estado} aria-label={label}>
      <span className="ad-slot-label">{label}</span>
      <ins
        ref={ins}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />

      <Script
        id="adsbygoogle-init"
        async
        strategy="afterInteractive"
        crossOrigin="anonymous"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`}
      />
    </aside>
  );
}
