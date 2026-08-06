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
      slot.textContent = `▶ ${video.title}`;
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
