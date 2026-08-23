/*
  Configuração do Google AdSense.

  DECISÃO: anúncio existe só nas rotas do blog (/blog e /blog/<slug>). A home,
  /sobre, /curriculo, /mods e as páginas de projeto ficam limpas — são elas que
  fazem o trabalho de converter visitante em conversa, e banner ali trabalha
  contra isso. O script do AdSense nem é carregado fora do blog, então essas
  páginas não pagam nem o custo de rede.

  ┌──────────────────────────────────────────────────────────────────────────┐
  │ FALTA VOCÊ FAZER: criar as unidades de anúncio no painel do AdSense e     │
  │ colar aqui o `data-ad-slot` de cada uma (é um número de ~10 dígitos).     │
  │ Enquanto `slots` estiver vazio, nada é renderizado — nenhum espaço em     │
  │ branco, nenhuma borda solta, nenhum erro no console.                      │
  └──────────────────────────────────────────────────────────────────────────┘

  Painel > Anúncios > Por unidade de anúncio > Display. Crie uma "Fim do post"
  e uma "Fim da lista", ambas responsivas.
*/

export const AD_CLIENT = "ca-pub-4142559316919538";

export const slots = {
  // Depois do texto do post, antes do bloco de fontes.
  postEnd: "5523137994",
  // Depois da lista de posts em /blog.
  listEnd: "7299254094",
};

export const hasAds = Object.values(slots).some(Boolean);
