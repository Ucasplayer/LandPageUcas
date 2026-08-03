// Busca o último vídeo de cada canal do Ucas via RSS do YouTube.
// Roda no servidor (Route Handler), então não esbarra em CORS e não
// precisa de chave de API do YouTube Data API.

const CHANNELS = [
  { handle: "Ucasix", label: "Ucasix", channelId: "UC1uAkM6ozVKh5REwxMA-KEw" },
  { handle: "Ucashardware", label: "Ucas Hardware", channelId: "UCwF_Icgb7HO1MGHXFC4Ha1Q" },
  { handle: "UcasRivals", label: "Ucas Rivals", channelId: "UCYxqXbHk9Fi2OgJ_e1vNBkw" },
  { handle: "oreonSMP", label: "Oreon SMP", channelId: "UCcLBeEXFVRir8ISgnog95hA" },
];

const ONE_HOUR = 60 * 60 * 1000;

// Cache em memória do processo. Sobrevive entre requisições enquanto a
// instância do servidor ficar de pé; em ambientes serverless "frios" ele
// simplesmente é reconstruído — não é crítico, só evita bater no YouTube
// a cada visita.
const cache = globalThis.__ucasYoutubeCache ?? (globalThis.__ucasYoutubeCache = new Map());

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
};

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function parseFirstEntry(xml) {
  const entryMatch = xml.match(/<entry>([\s\S]*?)<\/entry>/);
  if (!entryMatch) return null;

  const block = entryMatch[1];
  const pick = (regex) => (block.match(regex)?.[1] ?? "").trim();

  const videoId = pick(/<yt:videoId>([^<]+)<\/yt:videoId>/);
  if (!videoId) return null;

  return {
    videoId,
    title: decodeEntities(pick(/<title>([^<]*)<\/title>/)),
    publishedAt: pick(/<published>([^<]+)<\/published>/),
    thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    url: `https://www.youtube.com/watch?v=${videoId}`,
  };
}

// Resolve @handle -> UCxxxxxxxxxxxxxxxxxxxxxx (o feed RSS só aceita channel_id).
// Se preferir evitar esse passo em produção, troque por um mapa fixo:
// const CHANNEL_IDS = { Ucasix: "UC...", Ucashardware: "UC...", ... }
async function resolveChannelId(handle) {
  const cacheKey = `id:${handle}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const page = await fetch(`https://www.youtube.com/@${handle}`, {
    headers: FETCH_HEADERS,
  });
  if (!page.ok) {
    throw new Error(`Não foi possível abrir @${handle} (status ${page.status})`);
  }

  const html = await page.text();
  const channelId = html.match(/"channelId":"(UC[\w-]{22})"/)?.[1];
  if (!channelId) {
    throw new Error(`channelId não encontrado na página de @${handle}`);
  }

  cache.set(cacheKey, channelId);
  return channelId;
}

async function loadLatestVideo({ handle, label, channelId: knownChannelId }) {
  const cacheKey = `video:${handle}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.fetchedAt < ONE_HOUR) {
    return cached.data;
  }

  const channelId = knownChannelId ?? (await resolveChannelId(handle));
  const feed = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
    { headers: FETCH_HEADERS },
  );
  if (!feed.ok) {
    throw new Error(`Feed de @${handle} respondeu ${feed.status}`);
  }

  const xml = await feed.text();
  const entry = parseFirstEntry(xml);
  if (!entry) {
    throw new Error(`Nenhum vídeo encontrado no feed de @${handle}`);
  }

  const data = { handle, label, ...entry };
  cache.set(cacheKey, { data, fetchedAt: Date.now() });
  return data;
}

export async function GET() {
  const results = await Promise.allSettled(CHANNELS.map(loadLatestVideo));

  const videos = results.map((result, index) =>
    result.status === "fulfilled"
      ? result.value
      : { handle: CHANNELS[index].handle, error: true },
  );

  return Response.json(
    { videos },
    { headers: { "Cache-Control": "public, max-age=0, s-maxage=3600" } },
  );
}
