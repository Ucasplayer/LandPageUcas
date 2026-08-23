-- Carga inicial do conteúdo do blog.
--
-- Isto é migration e não seed porque `db push --include-seed` só reexecuta o
-- seed se o hash dele nunca tiver sido registrado — depois disso ele atualiza
-- o hash e não roda nada, silenciosamente. Migration sempre aplica.
--
-- Daqui pra frente, post novo e correção de texto se fazem no painel do
-- Supabase, não aqui: este arquivo é só o ponto de partida.

insert into public.posts
  (slug, title, summary, date, reading_time, tag, cover, cover_alt, body, sources)
values (
  'cyberleek-vazamento-gta-6',
  'CyberLeek: o vazamento do GTA 6 que virou manifesto, memecoin e caso na Justiça',
  'Em cinco dias, um grupo anônimo publicou oito vídeos de uma build jogável do GTA VI, exigiu um pedido de desculpas da Rockstar e promoveu a própria criptomoeda. Nesta manhã, o site e o Telegram saíram do ar.',
  '2026-08-22',
  '8 min',
  'Notícia',
  '/blog/cover-cyberleek.svg',
  'Ilustração: arcos de um sinal de transmissão cortados ao meio por uma faixa vertical, em violeta sobre fundo ameixa.',
  '[
  "Desde 18 de agosto, um grupo anônimo que se identifica como CYBERLEEK vem publicando vídeos de gameplay do Grand Theft Auto VI. Não são renders nem material de trailer: em pelo menos um dos clipes, quem está no controle atira contra uma parede e escreve a palavra LEEK com os buracos de bala — o tipo de coisa que só é possível com o jogo rodando de verdade.",
  "Nesta manhã de 22 de agosto, o site e o canal no Telegram do grupo ficaram inacessíveis, e o Telegram passou a exibir aviso de violação de direitos autorais. É o desfecho provisório de uma semana que misturou vazamento, manifesto anticonsumo, criptomoeda e intimações judiciais.",
  {
    "h2": "O que foi publicado"
  },
  "O primeiro lote saiu em 18 de agosto: dois clipes de cerca de um minuto e uma série de imagens, entre elas o que seria o mapa completo de Leonida. Os vídeos mostram Jason Duval, um dos dois protagonistas, ao lado de Lucia Caminos.",
  {
    "figure": "/blog/gta6/jason-lucia-cyberleek.webp",
    "alt": "Arte de Jason e Lucia cobrindo o rosto com bandanas, com o mascote do CYBERLEEK — um alho-poró de óculos escuros e armadura azul — sobreposto à esquerda.",
    "caption": "Jason Duval e Lucia Caminos na arte oficial do jogo, com o mascote do CYBERLEEK sobreposto. A montagem circulou junto com os vazamentos; a arte de fundo é da Rockstar.",
    "credit": "Base: Rockstar Games / divulgação. Mascote do CYBERLEEK sobreposto por terceiros, autoria não identificada."
  },
  "Nos dias seguintes vieram mais seis. Segundo os levantamentos do Insider Gaming e do Know Your Meme, o material exibiu:",
  {
    "list": [
      "o mapa de Leonida dividido em cinco condados",
      "um sistema de honra com indicador facial, e uma barra de estamina",
      "procurado de seis estrelas, com a polícia identificando roupa, aparência e veículo",
      "armas guardadas no veículo em vez de carregadas todas ao mesmo tempo",
      "combustível e dano nos carros, exigindo abastecer e consertar",
      "diálogo contextual com NPCs, com opções como acalmar ou avisar"
    ]
  },
  {
    "figure": "/blog/gta6/jason-noite.webp",
    "alt": "Jason mirando um fuzil, de perfil, com a cidade iluminada à noite ao fundo.",
    "caption": "Combate e nível de procurado estão entre os sistemas que aparecem nos clipes do grupo. Esta imagem, porém, é de divulgação oficial — não do material vazado.",
    "credit": "Rockstar Games / divulgação."
  },
  "O sétimo vídeo, de 20 de agosto, mostrou uma sequência de avião e foi liberado por votação — detalhe ao qual voltaremos. O oitavo, de 21 de agosto, trouxe um hipercarro.",
  {
    "h2": "De quando é essa build?"
  },
  "Aqui as fontes divergem, e vale registrar a divergência em vez de escolher uma. O Insider Gaming afirma que a filmagem viria de uma build mais antiga, possivelmente de 2024 ou anterior. O Game Rant aponta na direção oposta: uma música da Tate McRae lançada em janeiro de 2025 aparece em um dos clipes, o que colocaria a build depois dessa data.",
  "O consenso é que o grupo tem acesso a uma build jogável, e não a um punhado de arquivos soltos. É isso que separa este caso de um vazamento comum.",
  {
    "h2": "O manifesto"
  },
  "O grupo publicou um texto que chamou de The CYBERLEEK Edict, com três exigências: o fim das pré-vendas digitais, a proibição de DLC pago para o modo single-player, e a garantia de que jogos de campanha continuem funcionando offline.",
  {
    "by": "CYBERLEEK, no manifesto — tradução livre",
    "quote": "A cada ano o anticonsumismo aperta o cerco, e a cada ano os jogadores recebem menos pelo que pagam."
  },
  "Sobre pré-venda, o texto argumenta que a prática nasceu de uma limitação industrial e não de um benefício ao jogador: pré-vendas existiam porque a prensagem de discos tinha limite de fabricação. Se as publicadoras querem receita antes do lançamento, diz o manifesto, que prensem discos e coloquem caixas nas prateleiras.",
  "O grupo afirmou que não pararia até a Rockstar publicar um pedido de desculpas com um compromisso concreto de melhorar. O texto cita o caso de The Crew, da Ubisoft, que exigia conexão constante e ficou injogável quando os servidores foram desligados.",
  {
    "h2": "E aí entra a criptomoeda"
  },
  "É neste ponto que a versão do protesto começa a rachar. Junto com os vazamentos, o grupo promove uma memecoin própria, a $CYBERLEEK, na rede Solana. Segundo a Dexerto, o token começou a ser negociado em 15 de agosto — antes de o vazamento viralizar — e movimentou cerca de US$ 11,8 milhões só no dia 18.",
  "O sétimo vídeo não foi escolhido ao acaso: quem tinha o token votava, em um servidor privado no Discord, em qual clipe seria publicado a seguir. A enquete durou cerca de catorze horas, e as opções incluíam direção diurna, noturna, uma sequência de moto e uma de avião.",
  {
    "figure": "/blog/gta6/cyberleek-mascote.webp",
    "alt": "Cena de interior com dois personagens do jogo e o mascote do CYBERLEEK sobreposto no centro.",
    "caption": "O mascote que assina o manifesto é o mesmo que dá nome à memecoin — a marca do protesto e a do token são uma coisa só.",
    "credit": "Base: Rockstar Games / divulgação. Mascote do CYBERLEEK sobreposto por terceiros, autoria não identificada."
  },
  "A campanha Stop Killing Games, citada pelo próprio manifesto como causa irmã, repudiou publicamente a associação:",
  {
    "by": "Stop Killing Games, em publicação citada pela Dexerto — tradução livre",
    "quote": "O motivo de ele estar vazando o GTA 6 é a memecoin dele. Isso é tudo, menos útil."
  },
  {
    "h2": "Cuidado com os perfis falsos"
  },
  "Se você for atrás do caso nas redes, esta parte importa. O grupo publicou um aviso no Telegram dizendo que existem impostores se passando por eles no X, no Discord e no próprio Telegram, e que operavam apenas o site oficial e o canal no Telegram.",
  "As marcas d’água dos vídeos chegaram a trazer a frase de que o CYBERLEEK não tem Twitter. O site GameRoll analisou um perfil que se apresentava como o grupo, encontrou imagens geradas por IA publicadas como se fossem filmagem nova, e concluiu que a conta era provavelmente falsa.",
  "Ou seja: boa parte do que circula no X assinado como CYBERLEEK não é do CYBERLEEK.",
  {
    "h2": "A reação da comunidade"
  },
  "O público se dividiu em três campos razoavelmente claros. Há quem tenha comemorado — depois de anos de espera e adiamentos, é a primeira filmagem extensa de gameplay a aparecer. Há quem tenha pedido que ninguém amplifique o material, com medo de que a história do jogo comece a ser estragada; a presença de trechos de cutscene entre os vazamentos alimentou exatamente esse receio. E há quem tenha aproveitado para descontar na Rockstar, argumentando que a empresa mereceu.",
  "Do lado dos criadores, o streamer xQc foi um dos mais duros:",
  {
    "by": "xQc, em transmissão citada pela Dexerto — tradução livre, trecho editado",
    "quote": "Não faz bem para ninguém. Até quem compra o jogo não quer ver vazamento. As pessoas querem jogar o jogo. Se você faz isso, você não é um gamer de verdade."
  },
  "Segundo o GTA BOOM, vários streamers grandes preferiram não tocar no assunto ao vivo, com receio da resposta jurídica da Rockstar.",
  "Nem toda a reação foi de empolgação com o jogo em si. A Forbes registrou reclamações sobre movimentação travada nos clipes e desconforto com mecânicas como combustível nos veículos e uma moeda interna, que renderam comparações com o sistema de Robux do Roblox.",
  {
    "h2": "A resposta da Rockstar e da Take-Two"
  },
  "Publicamente, silêncio. Nem a Rockstar nem a Take-Two emitiram comunicado oficial sobre o caso.",
  "Internamente, a história é outra. O jornalista Jason Schreier, da Bloomberg, relatou que a direção da Rockstar classificou a busca pela origem do vazamento como prioridade total, e que a equipe está frustrada e exausta — em parte porque a empresa já havia endurecido as regras de segurança depois do vazamento de 2022, chegando a acabar com o trabalho remoto durante fases intensas de desenvolvimento.",
  "No campo jurídico, a Take-Two entrou com intimações no tribunal federal do Distrito Sul de Nova York, em 20 de agosto, mirando Microsoft e Discord. O pedido busca e-mails de cadastro, endereços de IP, identificadores de dispositivo e registros ligados a um repositório no GitHub que hospedava o material; as empresas teriam até 4 de setembro para responder. Em paralelo, a Rockstar vem derrubando os vídeos por notificação de direitos autorais, especialmente no YouTube.",
  "Existe precedente, e ele não é ameno: Arion Kurtaj, do grupo Lapsus$, foi processado criminalmente pelo vazamento de noventa clipes do GTA VI em 2022.",
  {
    "h2": "O que ainda não se sabe"
  },
  {
    "list": [
      "quem é o CYBERLEEK — o grupo segue anônimo",
      "como a build foi obtida",
      "se o material já offline volta por outro canal",
      "se houve novos vazamentos depois da derrubada"
    ]
  },
  "O calendário oficial, por enquanto, não mudou. O GTA VI continua marcado para 19 de novembro de 2026, e a Rockstar mantém um Extended Look pela Netflix previsto para 27 de agosto — cinco dias depois de o site do grupo sair do ar.",
  {
    "figure": "/blog/gta6/barco.webp",
    "alt": "Dois personagens conversando em um barco parado, com cerveja na mão e o mar ao fundo.",
    "caption": "O que a Rockstar mostrou por vontade própria até aqui: material oficial de divulgação, o único que ilustra este post.",
    "credit": "Rockstar Games / divulgação."
  },
  {
    "h2": "Uma nota sobre este post"
  },
  "Não há aqui nenhum frame do material vazado, nem link para o site, o Telegram ou os arquivos do grupo. As imagens são material de divulgação da Rockstar; em duas delas, o mascote do grupo aparece sobreposto por terceiros. O conteúdo é propriedade da Rockstar e está sob notificação ativa de direitos autorais; republicá-lo mudaria a natureza deste texto de notícia para redistribuição. As citações são reproduzidas para comentário, com fonte e link logo abaixo."
]'::jsonb,
  '[
  {
    "url": "https://kotaku.com/gta-6-leak-group-end-digital-pre-orders-2000725477",
    "label": "Kotaku — Group Behind GTA 6 Leak Demands End to Digital Pre-Orders"
  },
  {
    "url": "https://www.tomshardware.com/video-games/catastrophic-gta-vi-leak-is-a-full-working-build-notorious-hacker-cyberleek-taunts-rockstar-games-by-spraying-the-word-leek-onto-a-wall-in-game-with-bullets",
    "label": "Tom’s Hardware — Catastrophic GTA VI leak is a full working build"
  },
  {
    "url": "https://insider-gaming.com/all-gta-6-cyberleek-leaks-so-far-map-honor-system-gameplay-videos/",
    "label": "Insider Gaming — All GTA 6 CYBERLEEK leaks so far"
  },
  {
    "url": "https://knowyourmeme.com/memes/events/august-2026-gta-6-leaks-2026-grand-theft-auto-vi-leak",
    "label": "Know Your Meme — August 2026 GTA 6 Leaks (linha do tempo)"
  },
  {
    "url": "https://www.dexerto.com/gta/who-is-cyberleek-gta-6-leaks-memecoin-explained-3400200/",
    "label": "Dexerto — Who is Cyberleek? GTA 6 leaks and memecoin explained"
  },
  {
    "url": "https://www.dexerto.com/gta/xqc-slams-gta-6-leaker-and-claims-real-fans-dont-want-to-see-leaks-3400047/",
    "label": "Dexerto — xQc slams GTA 6 leaker"
  },
  {
    "url": "https://gamerant.com/gta-6-cyberleek-leaker-explained/",
    "label": "Game Rant — Cyberleek, explained"
  },
  {
    "url": "https://www.thegamer.com/rockstar-gta6-offiical-leak-response/",
    "label": "TheGamer — GTA 6’s development team responds to the leaks"
  },
  {
    "url": "https://www.notebookcheck.net/GTA-6-hacker-CyberLeek-goes-offline-as-Take-Two-and-Microsoft-mount-legal-crackdown.1375698.0.html",
    "label": "Notebookcheck — CyberLeek goes offline as Take-Two and Microsoft mount legal crackdown"
  },
  {
    "url": "https://www.forbes.com/sites/danidiplacido/2026/08/20/the-gta-vi-leak-controversy-explained/",
    "label": "Forbes — The GTA VI leak controversy, explained"
  },
  {
    "url": "https://www.gtaboom.com/gta-6-leak-has-biggest-streamers-running-scared-39a2",
    "label": "GTA BOOM — Top streamers are running from the GTA 6 leak"
  }
]'::jsonb
)
on conflict (slug) do update set
  title = excluded.title, summary = excluded.summary, date = excluded.date,
  reading_time = excluded.reading_time, tag = excluded.tag, cover = excluded.cover,
  cover_alt = excluded.cover_alt, body = excluded.body, sources = excluded.sources;
