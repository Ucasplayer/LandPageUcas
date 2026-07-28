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
| Muted | `#81788d` | Metadados |
| Line | `#26202f` | Divisores e contornos |
| Loud Green | `#00c46a` | Exclusivo da prova LOUD Comments |

O roxo aparece em uma ação principal por contexto. O verde fica restrito à identidade da LOUD Comments.

### Tipografia

- Família única: pilha de sistema `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- Título principal: `2rem`, peso `750`, entrelinha `1.05`.
- Títulos de seção: `1rem`, peso `700`.
- Corpo: `0.9rem`, entrelinha `1.6`.
- Metadados: `0.72rem`, peso `600`.

### Forma e espaço

- Coluna principal: `min(620px, calc(100% - 32px))`.
- Blocos: raio de `14px`; controles compactos: `11px`.
- Espaçamento base: `8px`; separações principais de `44–64px`.
- Superfícies usam diferença de cor ou borda, nunca borda e sombra simultaneamente.
- Alvos interativos têm no mínimo `48px`.

## Componentes

### Identidade

Avatar circular de `96px`, nome, função e uma frase de posicionamento. A primeira ação copia o Discord; o GitHub permanece como rota secundária.

### Especialidades

Quatro etiquetas compactas — edição, bots, launchers e mods — resumem a oferta sem abrir cards explicativos.

### Prova editorial

A LOUD Comments é uma única linha editorial com sua marca real, função de Ucas, descrição curta e link para o X. O bloco usa um contorno discreto e mantém o verde apenas na marca.

Os canais pessoais formam uma lista compacta em duas colunas no desktop e uma coluna no mobile. Cada linha usa o mesmo marcador do YouTube e deixa tema e nome do canal visíveis.

### Projetos

XenthorLauncher, OreonLauncher e XenthorFiles aparecem como linhas de repositório. Logo, nome, descrição, linguagem e atualização formam uma leitura horizontal; no mobile, os metadados quebram sem alterar a ordem.

### Contatos

Discord é a única linha preenchida com roxo. E-mail, X e Instagram usam a superfície neutra e valores reais visíveis.

### Página Sobre

A rota `/sobre` herda a mesma coluna e transforma a biografia em leitura: retrato e função, quatro parágrafos, uma lista de interesses e uma trajetória vertical. Os marcos usam idade e sequência relativa quando não há ano confirmado.

## Responsividade e acesso

A composição permanece em uma coluna em todos os tamanhos. No mobile, a margem reduz para `16px`, textos quebram naturalmente e nenhuma marca invade títulos. Há skip link, foco visível, estado ao vivo para cópia, texto alternativo na identidade e imagens decorativas vazias quando o nome textual já identifica a marca.

## Regras

### Fazer

- Colocar trabalho real antes de texto promocional.
- Manter uma ação evidente e poucos níveis de hierarquia.
- Usar espaço vazio para separar grupos.
- Preservar proporção e cor das identidades fornecidas.

### Não fazer

- Não usar canvas, partículas, portais, órbitas, cubos ou fundos texturizados.
- Não criar seções de tela cheia ou títulos monumentais.
- Não repetir o mesmo conteúdo em hero, navegação e rodapé.
- Não inventar métricas, clientes, depoimentos ou disponibilidade.
