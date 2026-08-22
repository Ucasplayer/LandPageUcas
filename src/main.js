document.documentElement.classList.add("js");

const DISCORD_USERNAME = "@eaeucas";
const copyStatus = document.querySelector("[data-copy-status]");

const fallbackCopy = (text) => {
  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.append(input);
  input.select();
  const copied = document.execCommand("copy");
  input.remove();
  return copied;
};

const copyDiscord = async (button) => {
  let copied = false;

  try {
    await navigator.clipboard.writeText(DISCORD_USERNAME);
    copied = true;
  } catch {
    copied = fallbackCopy(DISCORD_USERNAME);
  }

  const label = button.querySelector("[data-copy-label]");
  const originalLabel = label?.textContent;

  if (copied) {
    button.classList.add("is-copied");
    if (label) label.textContent = "Copiado";
    if (copyStatus) {
      copyStatus.textContent = `${DISCORD_USERNAME} foi copiado. Abra o Discord e adicione Ucas.`;
    }
  } else if (copyStatus) {
    copyStatus.textContent = `Não foi possível copiar. Use ${DISCORD_USERNAME} no Discord.`;
    if (label) label.textContent = `Use ${DISCORD_USERNAME}`;
  }

  window.setTimeout(() => {
    button.classList.remove("is-copied");
    if (label && originalLabel) label.textContent = originalLabel;
  }, copied ? 2200 : 3200);
};

document.querySelectorAll("[data-copy-discord]").forEach((button) => {
  button.addEventListener("click", () => copyDiscord(button));
});

const channelList = document.querySelector("[data-channels]");
const youtubeState = document.querySelector("[data-youtube-status]");

const formatPublished = (date) => {
  if (!date) return "";
  return `Publicado ${new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  }).format(new Date(date))}`;
};

fetch("/api/latest-videos")
  .then((response) => {
    if (!response.ok) throw new Error(`API respondeu ${response.status}`);
    return response.json();
  })
  .then(({ videos }) => {
    let loadedCount = 0;

    videos.forEach((video) => {
      const row = document.querySelector(`[data-channel="${video.handle}"]`);
      const slot = row?.querySelector("[data-yt-video]");
      if (!slot || video.error) return;

      loadedCount += 1;
      slot.textContent = video.title;
      slot.title = formatPublished(video.publishedAt);
      slot.hidden = false;
    });

    if (youtubeState) {
      youtubeState.textContent =
        loadedCount > 0
          ? `Últimos vídeos sincronizados com o YouTube (${loadedCount} de ${videos.length}).`
          : "O YouTube não respondeu agora; os links dos canais continuam disponíveis.";
    }
  })
  .catch(() => {
    if (youtubeState) {
      youtubeState.textContent =
        "Não foi possível buscar os últimos vídeos agora; os links dos canais continuam disponíveis.";
    }
  })
  .finally(() => {
    channelList?.setAttribute("aria-busy", "false");
  });

/* --------------------------------------------------------------------------
   Card do blog: um post por vez, trocando sozinho.

   Os slides já vêm no HTML — o servidor manda todos, com `hidden` em todos
   menos o primeiro. Aqui só se troca qual está visível. Sem JS, o visitante vê
   o post mais recente, que é o que o card promete.

   `hidden` em vez de `opacity: 0` porque cada slide é um link: escondido pela
   opacidade, ele continuaria recebendo foco pelo Tab.
   -------------------------------------------------------------------------- */

const ROTATION_MS = 6000;

const rotator = document.querySelector("[data-blog-rotator]");
const slides = rotator ? [...rotator.querySelectorAll(".blog-slide")] : [];

if (slides.length > 1) {
  const dots = [...document.querySelectorAll("[data-blog-dot]")];
  const status = document.querySelector("[data-blog-status]");
  const stillMotion = matchMedia("(prefers-reduced-motion: reduce)");

  let current = 0;
  let timer;

  const show = (next, announce) => {
    current = (next + slides.length) % slides.length;

    slides.forEach((slide, index) => {
      slide.hidden = index !== current;
    });

    dots.forEach((dot, index) => {
      if (index === current) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });

    // Só anuncia quando a troca partiu do visitante. O giro automático narrado
    // a cada seis segundos atrapalharia quem usa leitor de tela.
    if (announce && status) {
      status.textContent = slides[current].querySelector("strong")?.textContent ?? "";
    }
  };

  const stop = () => window.clearInterval(timer);

  const start = () => {
    stop();
    if (stillMotion.matches) return;
    timer = window.setInterval(() => show(current + 1), ROTATION_MS);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      show(index, true);
      stop();
    });
  });

  // Parar enquanto o visitante está lendo o card ou navegando por ele.
  rotator.addEventListener("pointerenter", stop);
  rotator.addEventListener("pointerleave", start);
  rotator.addEventListener("focusin", stop);
  rotator.addEventListener("focusout", start);

  // Aba em segundo plano não precisa girar.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  stillMotion.addEventListener("change", start);
  start();
}
