# Aether Archives — Geheimakte 115

Projeto não oficial, educacional e de portfólio inspirado no universo Zombies de Call of Duty: Black Ops III.

## Status

Versão final de portfólio com Home interativa e seis dossiês navegáveis: Shadows of Evil, The Giant, Der Eisendrache, Zetsubou No Shima, Gorod Krovi e Revelations.

## Como abrir

O projeto é totalmente estático. Você pode abrir `index.html` diretamente no navegador. Para desenvolvimento, a opção recomendada continua sendo abrir a pasta no VS Code e usar a extensão **Live Server**.

## Estrutura principal

- `index.html` — Home, vitrine rotativa dos mapas, rede de Morg City e linha do Aether.
- `mapa.html` — template dinâmico usado pelos seis dossiês.
- `404.html` — página de arquivo não encontrado para hospedagem estática.
- `css/global.css` — identidade visual global e estilos da Home.
- `css/map.css` — layout e componentes dos dossiês.
- `js/main.js` — navegação, carousel, personagens e cronologia da Home.
- `js/map.details.js` — renderização, progresso e experiências interativas dos mapas.
- `js/map-data.js` — cópia estática dos dados para permitir abertura local sem depender de `fetch`.
- `data/map.json` — fonte editável do conteúdo dos seis arquivos.
- `assets/images/` — imagens e referências visuais do projeto.

## Funcionalidades

- navegação responsiva para desktop e mobile;
- seis mapas acessíveis pela Home e pela navegação entre dossiês;
- estado de progresso salvo localmente quando o navegador permite `localStorage`;
- checklist da missão, arquivos secretos e consoles interativos específicos de cada mapa;
- navegação por teclado, foco visível e suporte a `prefers-reduced-motion`;
- fallback visual quando uma imagem fiel de personagem ainda não existe;
- layout responsivo sem rolagem horizontal nas resoluções testadas.

## Atualização dos dados

Ao alterar `data/map.json`, regenere `js/map-data.js` para manter a versão local sincronizada. O arquivo usa o formato:

```js
"use strict";
window.AETHER_MAPS = { /* conteúdo de data/map.json */ };
```

## Publicação

Por ser um projeto estático, a pasta pode ser publicada em GitHub Pages, Netlify, Vercel ou qualquer servidor HTTP estático sem etapa de build.

## Regra visual

Personagens, armas, criaturas, itens, locais e efeitos diretamente ligados ao jogo devem usar referências fiéis. Quando ainda não existe uma imagem aprovada, o painel permanece identificado como pendente em vez de usar uma representação incorreta.

Consulte também [`NOTICE.md`](NOTICE.md) para o aviso de projeto não oficial.
