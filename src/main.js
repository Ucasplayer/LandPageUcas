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

// O Xenthor Launcher tem página própria em /projetos/xenthor-launcher e repositório
// privado, então só os repositórios públicos são consultados na API do GitHub.
const repoNames = ["OreonLauncher", "XenthorFiles"];
const githubState = document.querySelector("[data-github-state]");
const projects = document.querySelector("[data-projects]");

const formatUpdated = (date) => {
  if (!date) return "Atualização não informada";
  return `Atualizado ${new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date))}`;
};

const loadRepository = async (name) => {
  const response = await fetch(`https://api.github.com/repos/Ucasplayer/${name}`, {
    headers: { Accept: "application/vnd.github+json" },
  });

  if (!response.ok) throw new Error(`GitHub respondeu ${response.status}`);
  return response.json();
};

Promise.allSettled(repoNames.map(loadRepository)).then((results) => {
  let loadedCount = 0;

  results.forEach((result) => {
    if (result.status !== "fulfilled") return;

    const repository = result.value;
    const project = document.querySelector(`[data-repo="${repository.name}"]`);
    if (!project) return;

    loadedCount += 1;
    const language = project.querySelector("[data-language]");
    const updated = project.querySelector("[data-updated]");
    if (language) language.textContent = repository.language || "Projeto público";
    if (updated) updated.textContent = formatUpdated(repository.updated_at);
  });

  if (githubState) {
    if (loadedCount === repoNames.length) {
      githubState.textContent = "Dados públicos sincronizados com o GitHub.";
    } else if (loadedCount > 0) {
      githubState.textContent =
        `${loadedCount} de ${repoNames.length} projetos sincronizados; os links continuam disponíveis.`;
    } else {
      githubState.textContent =
        "O GitHub não respondeu agora; links e informações essenciais continuam disponíveis.";
    }
  }

  projects?.setAttribute("aria-busy", "false");
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
