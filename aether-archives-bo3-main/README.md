# Aether Archives — Geheimakte 115

Aplicação web interativa inspirada no universo Zombies de *Call of Duty: Black Ops III*. O projeto cataloga mapas e elementos da narrativa do jogo com uma interface temática.

**Acesse o projeto online:** [Aether Archives](https://augstconsagrado.github.io/aether-archives-bo3/)

---

## Sobre o Projeto

Criei o Aether Archives para treinar consumo de JSON e manipulação de DOM com JavaScript puro, unindo desenvolvimento front-end com meu interesse pela lore do jogo.

### Destaques
- **Home (`index.html`):** Vitrine rotativa e navegação temática.
- **Dossiês (`mapa.html`):** Carregamento dos dados dos 6 mapas consumindo arquivo JSON.
- **UI/UX (`ui-ux.html`):** Interface fiel à estética original do game.

---

## Tecnologias Utilizadas

- **HTML5** (Estrutura semântica)
- **CSS3** (Estilo, animações e responsividade)
- **JavaScript Vanilla** (Manipulação de DOM e requisições assíncronas)
- **JSON** (Base de dados centralizada)

---

## Estrutura do Projeto

```text
├── index.html         # Página principal
├── mapa.html          # Dossiê dinâmico de mapas
├── ui-ux.html         # Design da interface
├── css/
│   ├── global.css     # Estilos globais
│   └── map.css        # Estilos dos dossiês
├── js/
│   ├── main.js        # Lógica da Home
│   └── map.details.js # Carregamento de dados
└── data/
    └── map.json       # Conteúdo dos mapas em JSON
