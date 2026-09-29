"use strict";

/* Identifica qual mapa deve ser carregado pela URL. */
const urlParameters = new URLSearchParams(window.location.search);
const mapId = urlParameters.get("id") || "shadows-of-evil";

const mapError = document.querySelector("#map-error");
const mapHero = document.querySelector("#map-hero");

/* Cria um elemento HTML com classe e texto opcionais. */
function createElement(tag, className = "", text = "") {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text) {
        element.textContent = text;
    }

    return element;
}

/* Adiciona uma informação com título em negrito. */
function addDetail(container, label, value) {
    if (!value) {
        return;
    }

    const paragraph = createElement("p", "map-card-detail");
    const strong = createElement("strong", "", `${label}: `);

    paragraph.append(strong, document.createTextNode(value));
    container.appendChild(paragraph);
}

/* Aplica as cores específicas do mapa. */
function applyTheme(theme = {}) {
    const root = document.documentElement;

    root.style.setProperty(
        "--map-primary",
        theme.primary || "#b988e2"
    );

    root.style.setProperty(
        "--map-primary-light",
        theme.primaryLight || "#dcb7ff"
    );

    root.style.setProperty(
        "--map-primary-dark",
        theme.primaryDark || "#281536"
    );

    root.style.setProperty(
        "--map-background",
        theme.background || "#08050d"
    );

    root.style.setProperty(
        "--map-surface",
        theme.surface || "#15101c"
    );

    root.style.setProperty(
        "--map-glow",
        theme.glow || "rgba(185, 136, 226, 0.32)"
    );
}

/* Preenche o topo da página. */
function renderHero(map) {
    document.title = `${map.title} | Aether Archives`;

    document.querySelector("#map-file").textContent =
        map.file || "Arquivo desconhecido";

    document.querySelector("#map-title").textContent =
        map.title || "Mapa desconhecido";

    document.querySelector("#map-location").textContent =
        map.location || "";

    document.querySelector("#map-introduction").textContent =
        map.introduction || "";

    if (map.heroImage) {
        mapHero.style.backgroundImage = `url("${map.heroImage}")`;
        mapHero.style.backgroundSize = "cover";
        mapHero.style.backgroundPosition = "center";
        mapHero.style.backgroundRepeat = "no-repeat";
    }
}

/* Preenche os cartões da visão geral. */
function renderOverview(items = []) {
    const container = document.querySelector("#map-overview");
    container.replaceChildren();

    items.forEach((item) => {
        const card = createElement("article", "map-overview-card");
        const label = createElement(
            "p",
            "map-overview-label",
            item.label
        );

        const value = createElement(
            "p",
            "map-overview-value",
            item.value
        );

        card.append(label, value);
        container.appendChild(card);
    });
}

/* Preenche uma seção formada por parágrafos. */
function renderTextSection(selector, paragraphs = []) {
    const container = document.querySelector(selector);
    container.replaceChildren();

    paragraphs.forEach((text) => {
        const paragraph = createElement("p", "", text);
        container.appendChild(paragraph);
    });
}

/* Preenche os dossiês dos personagens. */
function renderCharacters(characters = []) {
    const container = document.querySelector("#map-characters");
    container.replaceChildren();

    characters.forEach((character) => {
        const card = createElement("article", "map-character-card");

        const heading = createElement(
            "div",
            "map-character-heading"
        );

        const name = createElement(
            "h3",
            "map-character-name",
            character.name
        );

        const archetype = createElement(
            "span",
            "map-character-archetype",
            character.archetype
        );

        heading.append(name, archetype);
        card.appendChild(heading);

        addDetail(card, "Ator", character.actor);
        addDetail(card, "Função", character.role);
        addDetail(card, "Personalidade", character.personality);
        addDetail(card, "Crime", character.crime);
        addDetail(card, "Objeto do ritual", character.ritualItem);
        addDetail(card, "Local do ritual", character.ritualLocation);
        addDetail(card, "Inspiração", character.inspiration);

        container.appendChild(card);
    });
}

/* Preenche as mecânicas principais. */
function renderMechanics(mechanics = []) {
    const container = document.querySelector(
        "#map-mechanics-list"
    );

    container.replaceChildren();

    mechanics.forEach((mechanic) => {
        const card = createElement("article", "map-mechanic-card");

        const title = createElement(
            "h3",
            "",
            mechanic.title
        );

        const description = createElement(
            "p",
            "",
            mechanic.description
        );

        card.append(title, description);
        container.appendChild(card);
    });
}

/* Preenche músicas e informações sonoras. */
function renderSoundtrack(soundtrack = []) {
    const container = document.querySelector("#map-soundtrack");
    container.replaceChildren();

    soundtrack.forEach((track) => {
        const card = createElement("article", "map-soundtrack-card");

        const heading = createElement(
            "div",
            "map-soundtrack-heading"
        );

        const title = createElement("h3", "", track.title);
        const type = createElement(
            "span",
            "map-content-status",
            track.type
        );

        heading.append(title, type);
        card.appendChild(heading);

        addDetail(card, "Artista", track.artist);
        addDetail(card, "Contexto", track.description);
        addDetail(card, "Como ativar", track.activation);

        container.appendChild(card);
    });
}

/* Preenche as ligações com outros mapas. */
function renderConnections(connections = []) {
    const container = document.querySelector("#map-connections");
    container.replaceChildren();

    connections.forEach((connection) => {
        const card = createElement("article", "map-connection-card");

        const title = createElement(
            "h3",
            "",
            connection.map
        );

        const description = createElement(
            "p",
            "",
            connection.description
        );

        card.append(title, description);
        container.appendChild(card);
    });
}

/* Define uma classe visual conforme o nível de confirmação. */
function getStatusClass(status = "") {
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus.includes("confirmado")) {
        return "status-confirmed";
    }

    if (normalizedStatus.includes("interpretação")) {
        return "status-interpretation";
    }

    return "status-theory";
}

/* Preenche segredos, interpretações e teorias. */
function renderSecrets(secrets = []) {
    const container = document.querySelector("#map-secrets");
    container.replaceChildren();

    secrets.forEach((secret) => {
        const card = createElement("article", "map-secret-card");

        const heading = createElement(
            "div",
            "map-secret-heading"
        );

        const title = createElement("h3", "", secret.title);

        const status = createElement(
            "span",
            `map-content-status ${getStatusClass(secret.status)}`,
            secret.status
        );

        const description = createElement(
            "p",
            "",
            secret.description
        );

        heading.append(title, status);
        card.append(heading, description);
        container.appendChild(card);
    });
}

/* Preenche a missão principal. */
function renderMainQuest(mainQuest = {}) {
    const title = document.querySelector("#map-main-quest");
    const warning = document.querySelector("#map-quest-warning");
    const container = document.querySelector("#map-quest-steps");

    title.textContent =
        mainQuest.title || "Missão principal";

    warning.textContent =
        mainQuest.warning || "Requisitos não informados.";

    container.replaceChildren();

    const steps = mainQuest.steps || [];

    steps.forEach((step) => {
        const card = createElement("article", "map-quest-step");

        const number = createElement(
            "span",
            "map-quest-number",
            String(step.number).padStart(2, "0")
        );

        const content = createElement(
            "div",
            "map-quest-content"
        );

        const stepTitle = createElement(
            "h3",
            "",
            step.title
        );

        const description = createElement(
            "p",
            "",
            step.description
        );

        content.append(stepTitle, description);
        card.append(number, content);
        container.appendChild(card);
    });
}

/* Preenche as referências utilizadas na pesquisa. */
function renderSources(sources = []) {
    const container = document.querySelector("#map-sources");
    container.replaceChildren();

    sources.forEach((source) => {
        const card = createElement("article", "map-source-card");

        const heading = createElement(
            "div",
            "map-source-heading"
        );

        const title = createElement("h3", "", source.title);

        const type = createElement(
            "span",
            "map-content-status",
            source.type
        );

        const description = createElement(
            "p",
            "",
            source.description
        );

        const link = createElement(
            "a",
            "map-source-link",
            "Acessar fonte ↗"
        );

        link.href = source.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        heading.append(title, type);
        card.append(heading, description, link);
        container.appendChild(card);
    });
}

/* Exibe uma mensagem quando o JSON ou o mapa não é encontrado. */
function showError(message) {
    document
        .querySelectorAll("#map-content > section:not(#map-error)")
        .forEach((section) => {
            section.hidden = true;
        });

    const errorParagraph = mapError.querySelector("p");

    errorParagraph.textContent =
        message ||
        "Não foi possível encontrar as informações deste mapa.";

    mapError.hidden = false;
}

/* Envia todas as informações do JSON para a página. */
function renderMap(map) {
    applyTheme(map.theme);
    renderHero(map);
    renderOverview(map.overview);
    renderTextSection("#map-story", map.story);
    renderTextSection("#map-development", map.development);
    renderCharacters(map.characters);
    renderMechanics(map.mechanics);
    renderSoundtrack(map.soundtrack);
    renderConnections(map.connections);
    renderSecrets(map.secrets);
    renderMainQuest(map.mainQuest);
    renderSources(map.sources);
}

/* Busca o arquivo JSON e inicia a página. */
async function loadMap() {
    try {
        const response = await fetch("data/maps.json");

        if (!response.ok) {
            throw new Error(
                `Erro ao carregar o JSON: ${response.status}`
            );
        }

        const maps = await response.json();
        const selectedMap = maps[mapId];

        if (!selectedMap) {
            showError(
                `O arquivo "${mapId}" não foi encontrado.`
            );

            return;
        }

        renderMap(selectedMap);
    } catch (error) {
        console.error("Erro ao carregar o mapa:", error);

        showError(
            "O conteúdo não pôde ser carregado. Confira o maps.json e abra o projeto com o Live Server."
        );
    }
}

loadMap();