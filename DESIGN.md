---
name: Ucas — Perfil de Produção
description: Um portfólio compacto e direto para apresentar serviços, trabalhos e contatos sem ruído visual.
---

# Design System: Ucas — Perfil de Produção

## Direção

**Creative North Star: “Perfil de Produção”.** A página funciona como um perfil profissional concentrado: identidade, especialidades, provas e contato em uma única coluna. A referência estrutural é uma página pessoal de links bem editada, mas o conteúdo continua sendo um portfólio real. Não há portal, dashboard, cenário ou decoração gamer literal.

## Tokens

### Cor

| Token | Valor | Uso |
|---|---:|---|
| Night | `#0c0912` | Fundo global |
| Surface | `#14101c` | Linhas e blocos principais |
| Surface High | `#1a1524` | Hover e estados ativos |
| Violet | `#7c4de3` | Ação principal e foco |
| Violet Soft | `#a78bfa` | Detalhes e links |
| Text | `#f4f1f8` | Títulos e valores |
| Copy | `#c7bfce` | Texto de apoio |
| Muted | `#867e92` | Metadados |
| Line | `#26202f` | Divisores e contornos |
| Loud Green | `#00c46a` | Exclusivo da prova LOUD Comments |
| Surface Mark | `#21112f` | Azulejo atrás das marcas de projeto |
| YouTube | `#ff6b6b` | Marca do YouTube nas linhas de canal |
| YouTube Wash | `rgba(255, 76, 76, 0.08)` | Fundo da mesma marca |
| On Violet | `#fff` | Texto sobre a ação primária |
| On Violet Soft | `rgba(255, 255, 255, 0.78)` | Texto de apoio sobre a ação primária |
| Veil Weak | `rgba(255, 255, 255, 0.018)` | Hover das linhas editoriais |
| Veil | `rgba(255, 255, 255, 0.055)` | Fundo dos ícones de contato |
| Veil Strong | `rgba(255, 255, 255, 0.14)` | O mesmo ícone dentro da linha primária |

O roxo aparece em uma ação principal por contexto. O verde fica restrito à identidade da LOUD Comments.

Muted subiu de `#81788d` para `#867e92` em 22/08/2026: o valor antigo dava 4.47:1 sobre Surface e 4.25:1 sobre Surface High, abaixo do mínimo de 4.5:1 para texto normal. Mesmo matiz e mesma saturação, 2% a mais de luminância.

Os tokens de Surface Mark para baixo já existiam no CSS como valores cravados na mão, fora do sistema. Foram declarados em 22/08/2026 sem mudar nenhuma cor renderizada — a correção foi documentar a decisão, não trocar a cor.

### Tipografia

- Família de texto: `Geist`, com a pilha de sistema como reserva. Trocada em 22/08/2026: a pilha de sistema como voz dos títulos é o sinal mais barato de página não desenhada.
- Família de dados: `Geist Mono`, usada em código, na função das linhas editoriais e nas etiquetas de stack.
- Título principal: `2rem`, peso `750`, entrelinha `1.05`.
- Títulos de seção: `1rem`, peso `700`.
- Corpo: `0.9rem`, entrelinha `1.6`.
- Metadados: `0.72rem`, peso `600`.

### Forma e espaço

- Coluna principal: `min(620px, calc(100% - 32px))`.
- Blocos: raio de `14px`; controles compactos: `11px`.
- Espaçamento base: `8px`; separações principais de `44–64px`.
- Elevação: `--shadow-1` para linhas e cards, `--shadow-2` para hover e para o cartão do currículo. Toda sombra tem deslocamento **e** desfoque; halo sem deslocamento é decoração, não profundidade.
- Duas coisas saem da coluna para `860px` acima de `900px`: a lista de `/mods` e a galeria das páginas de projeto (bloco inteiro, título junto). São as únicas quebras de coluna do site, e existem onde a largura muda o que dá para entender.
- Alvos interativos têm no mínimo `48px`.

## Rotas

| Rota | Papel |
|---|---|
| `/` | Apresentação. Perfil, trabalhos, canais, três projetos em destaque e contato. |
| `/mods` | Lista completa de projetos, com captura, frase e ficha breve. |
| `/blog` | Lista de posts, com capa, resumo, tag, data e tempo de leitura. |
| `/blog/<slug>` | O post inteiro. |
| `/projetos/<slug>` | O projeto inteiro: capturas, recursos, fluxo e ficha técnica. |
| `/sobre` | Trajetória. |
| `/curriculo` | Currículo profissional. |

## Componentes

### Projeto: dois formatos, dois lugares

**Na home**, o projeto é uma linha (`.project-row .project-row-featured`): marca de `68px`, nome, uma frase e a stack, dentro da coluna de `620px`. Compacta de propósito — a home apresenta, não cataloga. Fecha com um botão `.see-all` para a lista completa.

**Em `/mods`**, o projeto é um card (`.project-card`): captura real no topo em `16/9` com recorte pelo alto, depois o mesmo miolo da linha, e uma faixa `.mods-meta` com tipo, plataforma e situação do código. A lista sai da coluna para `860px` acima de `900px`.

Nos dois formatos a marca de `68px` é o elemento que viaja na transição para a página do projeto.

O card com captura esteve na home entre duas revisões de 22/08/2026 e saiu: dá peso demais a uma seção que é apresentação. As capturas continuam existindo em `public/` e agora aparecem em `/mods`.

### Regra de sobrancelha

Nenhum rótulo em caixa alta acima de um título. Quando a função é informação de verdade — o papel do Ucas na LOUD Comments, por exemplo — ela vem **depois** do nome, em `Geist Mono`.

### Card do blog na home

Fica logo abaixo do botão do currículo, com no máximo `460px`. Um post por vez: capa de `92×62`, título, resumo cortado em duas linhas e a linha de tag e data. Abaixo, um ponto por post.

O giro é de `6s`, e para sozinho quando o ponteiro entra no card, quando o foco entra nele, quando a aba sai de vista, quando o visitante escolhe um ponto, e quando o sistema pede movimento reduzido. Os slides inativos usam o atributo `hidden`, não opacidade: escondido por opacidade, um link continua recebendo foco pelo Tab. `.blog-slide[hidden]` precisa declarar `display: none` porque o `display: grid` do próprio `.blog-slide` ganha da folha do navegador.

Sem JavaScript, o card mostra o post mais recente e não gira — que é exatamente o que ele promete.

### Corpo de post

Um item de `body` é uma string (parágrafo) ou um bloco: `{ p }`, `{ h2 }`, `{ quote, by }`, `{ list }`. O renderizador está em `app/blog/post-body.jsx`.

Citação leva filete violeta de `2px` à esquerda, sem aspas decorativas e sem itálico — a atribuição embaixo, em `Geist Mono`, já diz que a fala é de outra pessoa. Lista usa ponto violeta de `5px`, não marcador do navegador. O bloco `Fontes` fecha o post com numeração e links que abrem em aba nova com `rel="noreferrer nofollow"`.

**Regra editorial:** post de notícia não hospeda nem embute o material que noticia quando esse material está sob disputa de direitos autorais. Cita, atribui e linka a fonte jornalística. Há um teste que falha se qualquer `img`, `video`, `iframe` ou `source` do post apontar para fora do domínio.

### Ícones

Todo ícone é desenhado, em SVG, com traço consistente. Marca de terceiro (Discord, X, GitHub, YouTube) é desenho cheio via `.brand-glyph`. Letra ou glifo Unicode no lugar de ícone não é ícone.

### Identidade

Avatar circular de `96px`, nome, função e uma frase de posicionamento. A primeira ação copia o Discord; o GitHub permanece como rota secundária.

Na home a identidade aparece uma única vez, no avatar do perfil. O topo traz só os atalhos (Sobre, GitHub, e-mail) centralizados, e o rodapé só o crédito, também centralizado — repetir a mini-marca em três lugares na mesma coluna não acrescentava informação. Nas rotas internas a mini-marca continua no topo e no rodapé, porque ali ela é o caminho de volta para a home.

### Especialidades

Quatro etiquetas compactas — edição, bots, launchers e mods — resumem a oferta sem abrir cards explicativos.

### Prova editorial

A LOUD Comments é uma única linha editorial com sua marca real, função de Ucas, descrição curta e link para o X. O bloco usa um contorno discreto e mantém o verde apenas na marca.

Os canais pessoais formam uma lista compacta em duas colunas no desktop e uma coluna no mobile. Cada linha usa o mesmo marcador do YouTube e deixa tema e nome do canal visíveis.

### Projetos

A seção reúne três linhas com a mesma leitura horizontal: logo, nome, descrição e metadados. No mobile, os metadados quebram sem alterar a ordem.

As três linhas são destacadas — Xenthor Launcher, Kryptós SMP e Eclipse Mod. Elas recebem contorno, um rótulo violeta "Ver o projeto" e uma seta de navegação interna em vez da seta de link externo, porque levam para páginas do próprio site. Seus metadados são fixos: o Xenthor Launcher tem repositório privado, o Kryptós não vive no GitHub e o Eclipse Mod também não é público, então nada aqui depende da API.

O Eclipse Mod não tem marca fornecida. Em vez de inventar um logo, o azulejo usa a própria arte do mod — a textura de corona sobre a textura de disco, no fundo Night — o que mantém a regra de preservar a identidade existente em vez de criar uma paralela.

A seção não lista mais repositórios crus do GitHub. Cada projeto exibido tem uma página própria que explica o trabalho; quem quiser o código chega pelo link "Ver GitHub" no cabeçalho da seção.

### Contatos

Discord é a única linha preenchida com roxo. E-mail, X e Instagram usam a superfície neutra e valores reais visíveis.

### Página Sobre

A rota `/sobre` herda a mesma coluna e transforma a biografia em leitura: retrato e função, quatro parágrafos, uma lista de interesses e uma trajetória vertical. Os marcos usam idade e sequência relativa quando não há ano confirmado.

### Páginas de projeto

As rotas `/projetos/xenthor-launcher`, `/projetos/kryptos-smp` e `/projetos/eclipse-mod` seguem o mesmo padrão. Mantêm a coluna de 620px e organizam a leitura em cinco blocos: capa com marca, nome, uma frase do que o produto faz e etiquetas de stack; capturas reais em largura total, com legenda e link para a imagem original; recursos em grade de dois para um; um fluxo em quatro passos reaproveitando a trajetória vertical; e uma ficha técnica em pares termo/valor que empilham no mobile.

Capturas mais altas que largas — uma tela de login, por exemplo — usam a variante `shot-narrow`, limitada a 340px e centralizada, para não dominar a coluna. Em telas de 900px ou mais, só a galeria se alarga para 860px: capturas de painel e de launcher ficam ilegíveis dentro dos 620px, e a coluna de texto continua onde estava. Quando o projeto está publicado, a capa ganha um link discreto para o site no ar.

Quando a interface do projeto concentra várias funções em uma tela, entra um bloco de tour — `tool-list`, linhas separadas por fio com nome da ferramenta e o que ela faz. Ele descreve a interface; a grade de cards ao lado fala de benefício. Os dois não repetem o mesmo item. Num projeto sem interface, como o Eclipse Mod, o mesmo par continua valendo com outra divisão: a lista descreve o que muda no mundo, a grade explica a decisão técnica por trás.

Quando o projeto se opera por comando, a lista de comandos usa a mesma `spec-list` da ficha técnica, com o comando no lugar do termo. Comando aparece em monoespaçada, mas com a cor e o peso do texto em volta — a página não tem bloco de código, e um trecho colorido no meio dela chamaria mais atenção do que merece.

O fecho é sempre um bloco de contato com a mesma dupla de botões da página Sobre, ligando o projeto mostrado ao serviço oferecido. Nenhum número, preço ou prazo aparece; só o que está confirmado no código do próprio projeto.

### Prévia de link

Cada rota tem uma carta de 1200×630 em `public/og/`, gerada por `node scripts/og.mjs` a partir das artes que já existem no site. São dois formatos, e a escolha entre eles é a mesma pergunta de sempre: existe produto para mostrar?

**Carta de projeto** — duas colunas. A captura real ocupa a direita, no recorte em que o assunto cabe inteiro, e some para dentro do fundo Night por um degradê, sem véu por cima. À esquerda, a mesma pilha da capa da página: azulejo da marca, rótulo, nome, uma frase e as etiquetas de stack. O produto aparece antes do nome de quem fez; a assinatura fica no rodapé da carta, em Muted.

**Carta de perfil** — sem captura, porque não há produto. Repete a composição centrada da própria home: avatar, nome, função em Violet Soft, uma frase e as especialidades.

Nenhuma das duas usa texto sobre imagem clara, gradiente decorativo ou moldura de navegador. Capturas de jogo entram com o HUD cortado fora do recorte — a hotbar não é parte do trabalho.

Os arquivos são JPEG commitados, não gerados em tempo de requisição: Discord, X e WhatsApp fazem cache agressivo da prévia e leem JPEG sem discussão, e um arquivo no repositório pode ser conferido a olho antes de subir.

## Movimento

**Tese: sala de corte.** Trocar de página é um corte de edição, não uma dissolvência. A saída é seca (`180ms`, linear) e a entrada é confiante (`400ms`, `--ease-out`); é a assimetria que separa um corte de um fade. A página entra pelo lado do movimento — mais funda entra pela direita, de volta entra pela esquerda —, e a direção vem da profundidade da URL, marcada como tipo de view transition durante a navegação.

A navegação é entre documentos, com links comuns. Isso permite declarar `@view-transition { navigation: auto }` e ficar sem dependência nenhuma: onde o navegador não suporta, a navegação é a de sempre.

**O momento autoral** é único: a marca do projeto viaja da linha da lista até a capa da página. A caixa leva `520ms`, mas as duas fotos da marca cruzam em `150ms` — é a mesma arte nas duas pontas, então um cruzamento longo viraria fantasma em vez de um objeto só se movendo.

Um elemento só é pareado quando tem continuidade real a preservar:

- A **topbar** não é pareada. Com a home rolada ela já saiu da tela, e parear as duas a faria descer voando justamente no caminho mais comum — rolar até os projetos e clicar.
- O **avatar** não é pareado. Entre a home e a Sobre ele anda 4px e encolhe 8px: um morph que ninguém vê, cobrando o preço de ficar parado enquanto a página desliza.
- As **marcas de projeto** perdem o nome quando estão fora da tela no instante da captura. Vale o scroll do momento, não o de destino: numa navegação com âncora o navegador só rola depois que a transição termina.

O resto é feedback quieto, nunca decoração. As três funções no perfil trocam por corte de `90ms`, não por dissolvência. A seta de cada linha diz para onde o link leva — a externa viaja para fora, a interna avança na direção da leitura. A ficha de stack das páginas de projeto resolve item a item, com atraso total limitado, porque uma lista aparecendo como lista é o único stagger que se justifica.

A barra de progresso escala em vez de animar largura, para rodar no compositor. Com `prefers-reduced-motion`, as transições caem para `1ms` e as entradas escalonadas somem — a navegação continua inteira.

## Responsividade e acesso

A composição permanece em uma coluna em todos os tamanhos. No mobile, a margem reduz para `16px`, textos quebram naturalmente e nenhuma marca invade títulos. Há skip link, foco visível, estado ao vivo para cópia, texto alternativo na identidade e imagens decorativas vazias quando o nome textual já identifica a marca.

## Regras

### Fazer

- Colocar trabalho real antes de texto promocional.
- Manter uma ação evidente e poucos níveis de hierarquia.
- Usar espaço vazio para separar grupos.
- Preservar proporção e cor das identidades fornecidas.

### Não fazer

- Não usar canvas, partículas, portais, órbitas, cubos ou fundos texturizados. O tema de games, código e edição entra na gramática do movimento — o corte, a marca que viaja, a ficha que resolve —, nunca como enfeite na tela.
- Não animar seção por seção na rolagem, nem esconder conteúdo esperando script.
- Não criar seções de tela cheia ou títulos monumentais.
- Não repetir o mesmo conteúdo em hero, navegação e rodapé.
- Não inventar métricas, clientes, depoimentos ou disponibilidade.
