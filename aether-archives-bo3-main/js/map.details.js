"use strict";

(() => {
    const mapId =
        new URLSearchParams(window.location.search).get("id") ||
        "shadows-of-evil";

    const storageKey = `aether-progress-${mapId}`;

    let currentMap = null;
    let progressState = loadProgress();
    let beastTimeout = null;

    function loadProgress() {
        try {
            const savedProgress = JSON.parse(
                localStorage.getItem(storageKey)
            );

            return {
                quest: Array.isArray(savedProgress?.quest)
                    ? savedProgress.quest
                    : [],
                secrets: Array.isArray(savedProgress?.secrets)
                    ? savedProgress.secrets
                    : [],
                interaction: Array.isArray(savedProgress?.interaction)
                    ? savedProgress.interaction
                    : []
            };
        } catch {
            return {
                quest: [],
                secrets: [],
                interaction: []
            };
        }
    }

    function saveProgress() {
        localStorage.setItem(
            storageKey,
            JSON.stringify(progressState)
        );

        updateProgressDisplay();
    }

    function createElement(tagName, className, text) {
        const element = document.createElement(tagName);

        if (className) {
            element.className = className;
        }

        if (text !== undefined && text !== null) {
            element.textContent = text;
        }

        return element;
    }

    function clearElement(element) {
        element.replaceChildren();
    }

    function setActiveState(elements, activeIndex) {
        elements.forEach((element, index) => {
            element.classList.toggle("is-active", index === activeIndex);
            element.setAttribute(
                "aria-selected",
                String(index === activeIndex)
            );
        });
    }

    function registerProgress(group, key) {
        if (!progressState[group].includes(key)) {
            progressState[group].push(key);
            saveProgress();
        }
    }

    function unregisterProgress(group, key) {
        progressState[group] = progressState[group].filter(
            (savedKey) => savedKey !== key
        );

        saveProgress();
    }

    function getInteractionTotal(interaction) {
        switch (interaction.type) {
            case "beast":
                return interaction.districts.length + 1;
            case "teleporters":
                return interaction.stations.length;
            case "bows":
                return interaction.bows.length;
            case "lab":
                return interaction.waters.length;
            case "dragon":
                return interaction.challenges.length;
            case "fragments":
                return interaction.fragments.length;
            default:
                return 1;
        }
    }

    function getInteractionCompleted(interaction) {
        if (interaction.type !== "beast") {
            return Math.min(
                progressState.interaction.length,
                getInteractionTotal(interaction)
            );
        }

        const completedDistricts = progressState.interaction.filter(
            (key) => /^district-\d+$/.test(key)
        ).length;
        const sacredPlaceComplete = progressState.interaction.includes(
            "sacred-place"
        )
            ? 1
            : 0;

        return Math.min(
            completedDistricts + sacredPlaceComplete,
            getInteractionTotal(interaction)
        );
    }

    function updateProgressDisplay() {
        if (!currentMap) {
            return;
        }

        const questTotal = currentMap.quest.length;
        const secretsTotal = currentMap.secrets.length;
        const interactionTotal = getInteractionTotal(
            currentMap.interaction
        );

        const total = questTotal + secretsTotal + interactionTotal;
        const completed =
            progressState.quest.length +
            progressState.secrets.length +
            getInteractionCompleted(currentMap.interaction);

        const percentage = total
            ? Math.min(100, Math.round((completed / total) * 100))
            : 0;

        const progressValue = document.querySelector(
            "#map-progress-value"
        );
        const progressBar = document.querySelector(
            "#map-progress-bar"
        );

        progressValue.textContent = `${percentage}%`;
        progressBar.style.width = `${percentage}%`;

        localStorage.setItem(
            `aether-map-summary-${currentMap.id}`,
            String(percentage)
        );

        const completedCount = document.querySelector(
            "#quest-completed-count"
        );

        completedCount.textContent =
            `${progressState.quest.length}/${questTotal}`;
    }

    function applyTheme(map) {
        const root = document.documentElement;

        document.body.dataset.mapId = map.id;
        const mapImageUrl = new URL(map.image, document.baseURI).href;
        root.style.setProperty("--map-image", `url("${mapImageUrl}")`);

        root.style.setProperty("--map-primary", map.theme.primary);
        root.style.setProperty(
            "--map-primary-light",
            map.theme.primaryLight
        );
        root.style.setProperty(
            "--map-primary-dark",
            map.theme.primaryDark
        );
        root.style.setProperty("--map-glow", map.theme.glow);
    }

    function buildAmbientLayer(map) {
        const ambientLayer = document.querySelector("#map-ambient-layer");
        clearElement(ambientLayer);

        const motifMap = {
            ritual: 10,
            energia: 8,
            neve: 16,
            esporos: 14,
            cinzas: 16,
            meteoro: 10
        };

        const total = motifMap[map.presence?.motif] || 10;

        for (let index = 0; index < total; index += 1) {
            const particle = createElement("span", "ambient-particle");
            const motif = map.presence?.motif;

            particle.style.animationDelay = `${Math.random() * 6}s`;
            particle.style.animationDuration = `${5 + Math.random() * 9}s`;
            particle.style.opacity = String(0.2 + Math.random() * 0.6);

            if (motif === "meteoro") {
                particle.classList.add("ambient-meteor");
                particle.style.top = `${5 + Math.random() * 55}%`;
                particle.style.left = `${95 + Math.random() * 20}%`;
            } else if (motif === "neve") {
                particle.style.top = `${-10 - Math.random() * 20}%`;
                particle.style.left = `${Math.random() * 100}%`;
            } else {
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.bottom = "-8%";
            }

            ambientLayer.append(particle);
        }
    }

    function renderHero(map) {
        document.querySelector("#map-hero").style.backgroundImage = `url("${map.image}")`;
        document.querySelector("#map-file").textContent = map.file;
        document.querySelector("#map-title").textContent = map.title;
        document.querySelector("#map-location").textContent = map.location;
        document.querySelector("#map-introduction").textContent =
            map.introduction;
        document.querySelector("#map-status").textContent = map.status;

        document.title = `${map.title} | Aether Archives`;
    }

    function renderBriefing(map) {
        const directiveTitle = document.querySelector(
            "#map-directive-title"
        );
        const directiveText = document.querySelector("#map-directive");
        const spotlights = document.querySelector("#map-spotlights");
        const presenceTitle = document.querySelector("#presence-title");
        const presenceSubtitle = document.querySelector(
            "#presence-subtitle"
        );
        const presenceDescription = document.querySelector(
            "#presence-description"
        );
        const presenceVisual = document.querySelector(
            "#map-presence-visual"
        );

        directiveTitle.textContent = map.welcome;
        directiveText.textContent = map.directive;
        clearElement(spotlights);

        map.spotlights.forEach((item) => {
            const listItem = createElement("li", "directive-point");
            const label = createElement("span", "", item.label);
            const title = createElement("strong", "", item.title);
            const description = createElement("p", "", item.description);

            listItem.append(label, title, description);
            spotlights.append(listItem);
        });

        presenceTitle.textContent = map.presence.name;
        presenceSubtitle.textContent = map.presence.subtitle;
        presenceDescription.textContent = map.presence.description;
        presenceVisual.dataset.motif = map.presence.motif;
        presenceVisual.classList.toggle("has-image", Boolean(map.presence.image));
        presenceVisual.closest(".presence-card")?.classList.toggle(
            "has-faithful-image",
            Boolean(map.presence.image)
        );
        presenceVisual.style.backgroundImage = map.presence.image
            ? `linear-gradient(180deg, rgba(5, 4, 9, 0.04), rgba(5, 4, 9, 0.46)), url("${map.presence.image}")`
            : "";
        presenceVisual.setAttribute("role", map.presence.image ? "img" : "presentation");
        if (map.presence.imageAlt) {
            presenceVisual.setAttribute("aria-label", map.presence.imageAlt);
        } else {
            presenceVisual.removeAttribute("aria-label");
        }
    }

    function renderArsenal(map) {
        const container = document.querySelector("#map-arsenal");
        clearElement(container);

        map.arsenal.forEach((item, index) => {
            const card = createElement("article", "arsenal-card");
            const visual = createElement("div", "arsenal-visual");
            const code = createElement(
                "span",
                "arsenal-visual-code",
                item.type
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 3)
                    .toUpperCase()
            );
            const number = createElement(
                "span",
                "arsenal-index",
                String(index + 1).padStart(2, "0")
            );
            const type = createElement("span", "arsenal-type", item.type);
            const title = createElement("h3", "", item.name);
            const description = createElement("p", "", item.description);

            if (item.image) {
                visual.style.backgroundImage =
                    `linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.80)), url("${item.image}")`;
                visual.style.backgroundPosition = item.imagePosition || "center";
                visual.classList.add("uses-specific-image");
            } else {
                visual.classList.add("has-no-image");
                visual.setAttribute(
                    "aria-label",
                    `Imagem fiel de ${item.name} ainda não selecionada`
                );
            }

            visual.append(code, number);
            card.append(visual, type, title, description);
            container.append(card);
        });
    }

    function renderOverview(map) {
        const container = document.querySelector("#map-overview");
        clearElement(container);

        map.overview.forEach((item) => {
            const card = createElement("article", "map-information-card");
            const label = createElement("span", "", item.label);
            const value = createElement("strong", "", item.value);

            card.append(label, value);
            container.append(card);
        });
    }

    function renderStory(map) {
        const container = document.querySelector("#map-story");
        clearElement(container);

        map.story.forEach((paragraph, index) => {
            const details = createElement("details", "map-accordion");
            const summary = createElement(
                "summary",
                "",
                `Registro ${String(index + 1).padStart(2, "0")}`
            );
            const content = createElement(
                "div",
                "map-accordion-content",
                paragraph
            );

            if (index === 0) {
                details.open = true;
            }

            details.append(summary, content);
            container.append(details);
        });
    }

    function renderCharacters(map) {
        const container = document.querySelector("#map-characters");
        clearElement(container);

        const experience = createElement("div", "character-experience");
        const tabs = createElement("div", "character-tabs");
        const stage = createElement("article", "character-stage");

        tabs.setAttribute("role", "tablist");
        tabs.setAttribute("aria-label", "Personagens do mapa");

        const tabButtons = [];

        function updateStage(character, index) {
            setActiveState(tabButtons, index);
            clearElement(stage);

            const portrait = createElement("div", "character-portrait");
            const portraitCode = createElement(
                "span",
                "character-portrait-code",
                character.code
            );
            const portraitLabel = createElement(
                "span",
                "character-portrait-label",
                character.role
            );
            const characterImage = character.image || map.image;
            portrait.style.backgroundImage =
                `linear-gradient(135deg, rgba(0,0,0,0.06), rgba(0,0,0,0.70)), url("${characterImage}")`;
            portrait.style.backgroundPosition = character.imagePosition || "center";
            portrait.classList.toggle("uses-specific-image", Boolean(character.image));
            stage.classList.toggle("has-character-image", Boolean(character.image));
            portrait.append(portraitCode, portraitLabel);

            const information = createElement(
                "div",
                "character-information"
            );
            const label = createElement(
                "p",
                "section-label",
                `Ficha ${String(index + 1).padStart(2, "0")}`
            );
            const title = createElement("h3", "", character.name);
            const role = createElement(
                "p",
                "character-role",
                character.role
            );
            const summary = createElement("p", "", character.summary);

            information.append(label, title, role, summary);
            stage.append(portrait, information);
        }

        map.characters.forEach((character, index) => {
            const button = createElement("button", "character-tab");
            const code = createElement(
                "span",
                "character-tab-code",
                character.code
            );
            const text = createElement("span", "");
            const name = createElement("strong", "", character.name);
            const role = createElement("small", "", character.role);

            button.type = "button";
            button.setAttribute("role", "tab");
            button.setAttribute("aria-selected", "false");

            text.append(name, role);
            button.append(code, text);

            button.addEventListener("click", () => {
                updateStage(character, index);
            });

            tabButtons.push(button);
            tabs.append(button);
        });

        experience.append(tabs, stage);
        container.append(experience);

        updateStage(map.characters[0], 0);
    }

    function renderMechanics(map) {
        const container = document.querySelector("#map-mechanics-list");
        clearElement(container);

        map.mechanics.forEach((mechanic, index) => {
            const card = createElement("article", "mechanic-card");
            const title = createElement("h3", "", mechanic.title);
            const summary = createElement("p", "", mechanic.summary);
            const details = createElement(
                "p",
                "mechanic-details",
                mechanic.details
            );
            const toggle = createElement(
                "button",
                "mechanic-toggle",
                "Abrir detalhes"
            );

            card.dataset.index = String(index + 1).padStart(2, "0");
            toggle.type = "button";
            toggle.setAttribute("aria-expanded", "false");

            toggle.addEventListener("click", () => {
                const isOpen = card.classList.toggle("is-open");

                toggle.textContent = isOpen
                    ? "Fechar detalhes"
                    : "Abrir detalhes";
                toggle.setAttribute("aria-expanded", String(isOpen));
            });

            card.append(title, summary, details, toggle);
            container.append(card);
        });
    }

    function renderQuest(map) {
        const container = document.querySelector("#map-quest-steps");
        clearElement(container);

        map.quest.forEach((step, index) => {
            const key = `quest-${index}`;
            const label = createElement("label", "quest-step");
            const number = createElement(
                "span",
                "quest-step-number",
                String(index + 1).padStart(2, "0")
            );
            const content = createElement("span", "");
            const title = createElement("h3", "", step.title);
            const description = createElement(
                "p",
                "",
                step.description
            );
            const input = createElement("input", "quest-native-input");
            const checkbox = createElement(
                "span",
                "quest-checkbox",
                "✓"
            );

            input.type = "checkbox";
            input.hidden = true;
            input.checked = progressState.quest.includes(key);
            label.classList.toggle("is-complete", input.checked);

            input.addEventListener("change", () => {
                label.classList.toggle("is-complete", input.checked);

                if (input.checked) {
                    registerProgress("quest", key);
                } else {
                    unregisterProgress("quest", key);
                }
            });

            content.append(title, description);
            label.append(number, content, input, checkbox);
            container.append(label);
        });

        updateProgressDisplay();
    }

    function renderSecrets(map) {
        const container = document.querySelector("#map-secrets");
        clearElement(container);

        map.secrets.forEach((secret, index) => {
            const key = `secret-${index}`;
            const card = createElement("button", "secret-card");
            const lock = createElement("span", "secret-lock", "◇");
            const title = createElement("h3", "", secret.title);
            const description = createElement(
                "p",
                "",
                secret.description
            );
            const action = createElement(
                "span",
                "secret-action",
                "Desbloquear arquivo"
            );

            card.type = "button";

            const isUnlocked = progressState.secrets.includes(key);
            card.classList.toggle("is-unlocked", isUnlocked);
            action.textContent = isUnlocked
                ? "Arquivo registrado"
                : "Desbloquear arquivo";

            card.addEventListener("click", () => {
                const unlocked = card.classList.toggle("is-unlocked");

                if (unlocked) {
                    registerProgress("secrets", key);
                    action.textContent = "Arquivo registrado";
                } else {
                    unregisterProgress("secrets", key);
                    action.textContent = "Desbloquear arquivo";
                }
            });

            card.append(lock, title, description, action);
            container.append(card);
        });
    }

    function renderSoundtrack(map) {
        const container = document.querySelector("#map-soundtrack");
        clearElement(container);

        map.soundtrack.forEach((track, index) => {
            const card = createElement("article", "soundtrack-card");
            const number = createElement(
                "span",
                "soundtrack-index",
                String(index + 1).padStart(2, "0")
            );
            const title = createElement("h3", "", track.title);
            const note = createElement("p", "", track.note);

            card.append(number, title, note);
            container.append(card);
        });
    }

    function createConsole(type, stateText) {
        const consoleElement = createElement(
            "div",
            `interaction-console ${type}-console`
        );
        const header = createElement("div", "interaction-header");
        const systemLabel = createElement(
            "span",
            "",
            "Aether interactive system"
        );
        const state = createElement(
            "span",
            "interaction-state",
            stateText
        );
        const body = createElement("div", "interaction-body");
        const controls = createElement("div", "interaction-controls");
        const controlList = createElement(
            "div",
            "interaction-control-list"
        );
        const stage = createElement("div", "interaction-stage");

        header.append(systemLabel, state);
        controls.append(controlList);
        body.append(controls, stage);
        consoleElement.append(header, body);

        return {
            consoleElement,
            state,
            controlList,
            stage
        };
    }

    function createControlButton(title, code) {
        const button = createElement("button", "interaction-control");
        const name = createElement("strong", "", title);
        const codeElement = createElement("span", "", code);

        button.type = "button";
        button.append(name, codeElement);

        return button;
    }

    function createStageContent({
        kicker,
        title,
        description,
        code,
        details = []
    }) {
        const content = createElement("div", "interaction-stage-content");
        const seal = createElement("div", "interaction-seal");
        const sealCore = createElement(
            "span",
            "interaction-seal-core",
            code || "115"
        );

        seal.setAttribute("aria-hidden", "true");
        seal.append(sealCore);

        const kickerElement = createElement(
            "p",
            "interaction-kicker",
            kicker
        );
        const titleElement = createElement("h3", "", title);
        const descriptionElement = createElement(
            "p",
            "",
            description
        );

        content.append(seal, kickerElement, titleElement, descriptionElement);

        if (details.length) {
            const detailList = createElement(
                "div",
                "interaction-detail-list"
            );

            details.forEach((detail) => {
                const item = createElement("div", "interaction-detail");
                const label = createElement("span", "", detail.label);
                const value = createElement("strong", "", detail.value);

                item.append(label, value);
                detailList.append(item);
            });

            content.append(detailList);
        }

        return { content, code };
    }

    function renderBeastInteraction(interaction, container) {
        const ui = createConsole("beast", "Forma humana");
        const districtButtons = [];
        const duration = Number(interaction.duration) || 12;

        let selectedDistrict = 0;
        let activeRun = false;
        let completedTasks = new Set();
        let timerInterval = null;
        let deadline = 0;
        let finalButton = null;
        let resultMessage = "";

        const districtKey = (index) => `district-${index}`;
        const altarKey = (index) => `altar-${index}`;

        function isDistrictComplete(index) {
            return progressState.interaction.includes(districtKey(index));
        }

        function allDistrictsComplete() {
            return interaction.districts.every((_, index) =>
                isDistrictComplete(index)
            );
        }

        function stopTimer() {
            window.clearInterval(timerInterval);
            timerInterval = null;
        }

        function updateControlStates() {
            districtButtons.forEach((button, index) => {
                button.classList.toggle(
                    "is-complete",
                    isDistrictComplete(index)
                );
                button.classList.toggle(
                    "is-active",
                    index === selectedDistrict && !finalButton?.classList.contains("is-active")
                );
                button.setAttribute(
                    "aria-selected",
                    String(index === selectedDistrict)
                );
            });

            if (finalButton) {
                const unlocked = allDistrictsComplete();
                finalButton.disabled = !unlocked;
                finalButton.classList.toggle("is-locked", !unlocked);
                finalButton.classList.toggle(
                    "is-complete",
                    progressState.interaction.includes("sacred-place")
                );
            }
        }

        function createGatewormRack() {
            const rack = createElement("div", "gateworm-rack");
            const header = createElement("div", "gateworm-rack-header");
            const title = createElement("strong", "", "Gateworms recuperados");
            const count = interaction.districts.filter((_, index) =>
                isDistrictComplete(index)
            ).length;
            const counter = createElement(
                "span",
                "",
                `${count}/${interaction.districts.length}`
            );
            const worms = createElement("div", "gateworm-list");

            header.append(title, counter);

            interaction.districts.forEach((district, index) => {
                const worm = createElement("div", "gateworm-slot");
                const core = createElement("span", "gateworm-core", district.code);
                const label = createElement("small", "", district.name);

                worm.classList.toggle(
                    "is-collected",
                    isDistrictComplete(index)
                );
                worm.append(core, label);
                worms.append(worm);
            });

            rack.append(header, worms);
            return rack;
        }

        function updateTimerDisplay() {
            if (!activeRun) {
                return;
            }

            const remaining = Math.max(0, deadline - Date.now());
            const seconds = Math.ceil(remaining / 1000);
            const percentage = Math.max(
                0,
                Math.min(100, (remaining / (duration * 1000)) * 100)
            );
            const value = ui.stage.querySelector(".beast-countdown-value");
            const bar = ui.stage.querySelector(".beast-countdown-bar span");

            if (value) {
                value.textContent = `${seconds}s`;
            }

            if (bar) {
                bar.style.width = `${percentage}%`;
            }

            if (remaining <= 0) {
                failRun();
            }
        }

        function finishRun(index) {
            stopTimer();
            activeRun = false;
            ui.consoleElement.classList.remove("is-beast-active");
            registerProgress("interaction", districtKey(index));
            resultMessage = "Rota concluída. Gateworm recuperado.";
            ui.state.textContent = `${interaction.districts[index].name} concluído`;
            updateControlStates();
            renderDistrict(index);
        }

        function failRun() {
            stopTimer();
            activeRun = false;
            completedTasks = new Set();
            ui.consoleElement.classList.remove("is-beast-active");
            resultMessage = "O Beast Mode terminou antes da rota ser concluída.";
            ui.state.textContent = "Tempo esgotado — tente novamente";
            renderDistrict(selectedDistrict);
        }

        function activateTask(taskIndex) {
            if (!activeRun || completedTasks.has(taskIndex)) {
                return;
            }

            completedTasks.add(taskIndex);
            resultMessage = "Ponto energizado. Continue a rota.";

            if (
                completedTasks.size ===
                interaction.districts[selectedDistrict].tasks.length
            ) {
                finishRun(selectedDistrict);
                return;
            }

            renderDistrict(selectedDistrict);
            updateTimerDisplay();
        }

        function startRun(index) {
            stopTimer();
            selectedDistrict = index;
            activeRun = true;
            completedTasks = new Set();
            resultMessage = "Elementos ocultos revelados. Complete a rota antes do tempo acabar.";
            deadline = Date.now() + duration * 1000;

            ui.consoleElement.classList.add("is-beast-active");
            ui.state.textContent = `Beast Mode ativo — ${duration} segundos`;
            renderDistrict(index);
            updateTimerDisplay();
            timerInterval = window.setInterval(updateTimerDisplay, 100);
        }

        function createDistrictMap(district, index) {
            const board = createElement("div", "beast-mission-board");
            const skyline = createElement("div", "beast-skyline");
            const route = createElement("div", "beast-route-line");
            const districtTag = createElement(
                "span",
                "beast-district-tag",
                district.code
            );

            board.dataset.district = String(index + 1);
            board.classList.toggle("is-active", activeRun);
            board.classList.toggle("is-complete", isDistrictComplete(index));
            board.append(skyline, route, districtTag);

            district.tasks.forEach((task, taskIndex) => {
                const node = createElement("button", "beast-energy-node");
                const pulse = createElement("span", "beast-node-pulse");
                const number = createElement(
                    "strong",
                    "",
                    String(taskIndex + 1).padStart(2, "0")
                );
                const label = createElement("small", "", task.verb);

                node.type = "button";
                node.dataset.step = String(taskIndex + 1);
                node.disabled = !activeRun || completedTasks.has(taskIndex);
                node.classList.toggle(
                    "is-complete",
                    completedTasks.has(taskIndex) || isDistrictComplete(index)
                );
                node.setAttribute(
                    "aria-label",
                    `${task.verb}: ${task.label}`
                );
                node.addEventListener("click", () => activateTask(taskIndex));
                node.append(pulse, number, label);
                board.append(node);
            });

            return board;
        }

        function renderDistrict(index) {
            selectedDistrict = index;
            const district = interaction.districts[index];
            const complete = isDistrictComplete(index);

            finalButton?.classList.remove("is-active");
            updateControlStates();
            clearElement(ui.stage);
            ui.stage.dataset.code = district.code;

            const layout = createElement("div", "beast-operation-layout");
            const visualColumn = createElement("div", "beast-visual-column");
            const missionColumn = createElement("div", "beast-mission-column");
            const map = createDistrictMap(district, index);
            const kicker = createElement(
                "p",
                "interaction-kicker",
                complete ? "Ritual disponível" : "Rota de Beast Mode"
            );
            const title = createElement("h3", "", district.name);
            const note = createElement("p", "beast-mission-note", district.note);
            const metadata = createElement("div", "beast-metadata");
            const character = createElement("div", "beast-meta-item");
            const object = createElement("div", "beast-meta-item");
            const ritual = createElement("div", "beast-meta-item");
            const objectives = createElement("ol", "beast-objective-list");

            character.append(
                createElement("span", "", "Personagem"),
                createElement("strong", "", district.character)
            );
            object.append(
                createElement("span", "", "Objeto ritual"),
                createElement("strong", "", district.object)
            );
            ritual.append(
                createElement("span", "", "Destino"),
                createElement("strong", "", district.ritual)
            );
            metadata.append(character, object, ritual);

            district.tasks.forEach((task, taskIndex) => {
                const item = createElement("li", "beast-objective");
                const marker = createElement(
                    "span",
                    "beast-objective-marker",
                    completedTasks.has(taskIndex) || complete ? "✓" : String(taskIndex + 1)
                );
                const copy = createElement("div", "");
                const taskTitle = createElement("strong", "", task.label);
                const status = createElement(
                    "small",
                    "",
                    completedTasks.has(taskIndex) || complete
                        ? "Concluído"
                        : activeRun
                            ? "Ponto revelado"
                            : "Oculto na forma humana"
                );

                item.classList.toggle(
                    "is-complete",
                    completedTasks.has(taskIndex) || complete
                );
                copy.append(taskTitle, status);
                item.append(marker, copy);
                objectives.append(item);
            });

            const timer = createElement("div", "beast-countdown");
            const timerHeader = createElement("div", "beast-countdown-header");
            const timerLabel = createElement("span", "", "Janela de transformação");
            const timerValue = createElement(
                "strong",
                "beast-countdown-value",
                activeRun ? `${duration}s` : "Pronto"
            );
            const timerBar = createElement("div", "beast-countdown-bar");
            const timerFill = createElement("span", "");

            timerHeader.append(timerLabel, timerValue);
            timerBar.append(timerFill);
            timer.append(timerHeader, timerBar);

            if (activeRun) {
                timerFill.style.width = "100%";
            } else if (complete) {
                timerFill.style.width = "100%";
            }

            const action = createElement(
                "button",
                "interaction-primary-button beast-activate-button",
                complete ? "Repetir rota" : "Ativar Beast Mode"
            );
            action.type = "button";
            action.disabled = activeRun;
            action.addEventListener("click", () => startRun(index));

            const feedback = createElement(
                "p",
                "beast-feedback",
                complete
                    ? "Gateworm registrado. Esta rota permanece disponível para revisão."
                    : resultMessage || "Escolha o momento certo e conclua os três pontos antes do tempo acabar."
            );
            feedback.setAttribute("aria-live", "polite");

            visualColumn.append(map, createGatewormRack());
            missionColumn.append(
                kicker,
                title,
                note,
                metadata,
                objectives,
                timer,
                action,
                feedback
            );
            layout.append(visualColumn, missionColumn);
            ui.stage.append(layout);

            updateTimerDisplay();
        }

        function renderFinale() {
            stopTimer();
            activeRun = false;
            ui.consoleElement.classList.remove("is-beast-active");
            districtButtons.forEach((button) => button.classList.remove("is-active"));
            finalButton.classList.add("is-active");
            clearElement(ui.stage);
            ui.stage.dataset.code = interaction.finale.code;

            const finalComplete = progressState.interaction.includes("sacred-place");
            const placedCount = interaction.districts.filter((_, index) =>
                progressState.interaction.includes(altarKey(index))
            ).length;
            const layout = createElement("div", "sacred-place-layout");
            const chamber = createElement("div", "sacred-place-chamber");
            const portal = createElement("div", "sacred-portal");
            const portalCore = createElement("div", "sacred-portal-core");
            const altarRing = createElement("div", "sacred-altar-ring");
            const content = createElement("div", "sacred-place-content");
            const kicker = createElement(
                "p",
                "interaction-kicker",
                finalComplete ? "Arquivo transformado" : "Missão final"
            );
            const title = createElement("h3", "", interaction.finale.title);
            const description = createElement(
                "p",
                "",
                interaction.finale.description
            );

            portal.classList.toggle("is-open", finalComplete);
            portal.append(portalCore);

            interaction.districts.forEach((district, index) => {
                const placed = progressState.interaction.includes(altarKey(index));
                const altar = createElement("button", "sacred-altar");
                const symbol = createElement("span", "", district.code);
                const label = createElement("small", "", district.name);

                altar.type = "button";
                altar.dataset.position = String(index + 1);
                altar.disabled = placed || finalComplete;
                altar.classList.toggle("is-placed", placed || finalComplete);
                altar.setAttribute(
                    "aria-label",
                    placed
                        ? `${district.name}: Gateworm posicionado`
                        : `Posicionar Gateworm de ${district.name}`
                );
                altar.addEventListener("click", () => {
                    registerProgress("interaction", altarKey(index));
                    renderFinale();
                });
                altar.append(symbol, label);
                altarRing.append(altar);
            });

            chamber.append(portal, altarRing);

            const status = createElement("div", "sacred-status");
            const statusLabel = createElement("span", "", "Gateworms posicionados");
            const statusValue = createElement(
                "strong",
                "",
                `${finalComplete ? interaction.districts.length : placedCount}/${interaction.districts.length}`
            );
            status.append(statusLabel, statusValue);

            content.append(kicker, title, description, status);

            if (placedCount === interaction.districts.length && !finalComplete) {
                const ritualButton = createElement(
                    "button",
                    "interaction-primary-button sacred-ritual-button",
                    "Iniciar ritual final"
                );
                ritualButton.type = "button";
                ritualButton.addEventListener("click", () => {
                    registerProgress("interaction", "sacred-place");
                    localStorage.setItem(
                        `aether-map-state-${currentMap.id}`,
                        "mastered"
                    );
                    ui.state.textContent = "Portal do Pack-a-Punch revelado";
                    updateControlStates();
                    renderFinale();
                });
                content.append(ritualButton);
            }

            if (finalComplete) {
                localStorage.setItem(
                    `aether-map-state-${currentMap.id}`,
                    "mastered"
                );

                const reward = createElement("section", "master-archive-reward");
                const rewardHeader = createElement("div", "master-archive-header");
                const rewardLabel = createElement(
                    "span",
                    "",
                    "Recompensa permanente"
                );
                const rewardTitle = createElement(
                    "h4",
                    "",
                    interaction.finale.rewardTitle
                );
                const rewardDescription = createElement(
                    "p",
                    "",
                    interaction.finale.rewardDescription
                );
                const rewardGrid = createElement("div", "master-reward-grid");

                interaction.finale.rewards.forEach((item) => {
                    const card = createElement("article", "master-reward-card");
                    card.append(
                        createElement("span", "", item.label),
                        createElement("strong", "", item.value)
                    );
                    rewardGrid.append(card);
                });

                rewardHeader.append(rewardLabel, rewardTitle, rewardDescription);
                reward.append(rewardHeader, rewardGrid);
                content.append(reward);
                ui.state.textContent = "Morg City investigada";
            }

            layout.append(chamber, content);
            ui.stage.append(layout);
        }

        interaction.districts.forEach((district, index) => {
            const button = createControlButton(district.name, district.code);

            button.addEventListener("click", () => {
                stopTimer();
                activeRun = false;
                completedTasks = new Set();
                resultMessage = "";
                ui.consoleElement.classList.remove("is-beast-active");
                renderDistrict(index);
            });

            districtButtons.push(button);
            ui.controlList.append(button);
        });

        finalButton = createControlButton(
            interaction.finale.name,
            interaction.finale.code
        );
        finalButton.classList.add("interaction-final-control");
        finalButton.addEventListener("click", renderFinale);
        ui.controlList.append(finalButton);

        container.append(ui.consoleElement);
        updateControlStates();

        const firstIncomplete = interaction.districts.findIndex(
            (_, index) => !isDistrictComplete(index)
        );

        if (
            firstIncomplete === -1 &&
            !progressState.interaction.includes("sacred-place")
        ) {
            renderFinale();
        } else {
            renderDistrict(firstIncomplete === -1 ? 0 : firstIncomplete);
        }
    }

    function renderTeleportersInteraction(interaction, container) {
        const ui = createConsole("teleporters", "Rede desconectada");
        const buttons = [];

        function updateTeleporterStage(station, index) {
            setActiveState(buttons, index);
            clearElement(ui.stage);
            ui.stage.dataset.code = "935";

            const key = `station-${index}`;
            const completed = progressState.interaction.includes(key);

            const stageData = createStageContent({
                kicker: completed ? "Estação sincronizada" : "Estação offline",
                title: station.name,
                description: completed
                    ? `${station.record} liberado no setor ${station.sector}.`
                    : `Sincronize a estação localizada no setor ${station.sector}.`,
                code: "935",
                details: [
                    { label: "Setor", value: station.sector },
                    { label: "Registro", value: station.record }
                ]
            });

            const activationButton = createElement(
                "button",
                "interaction-primary-button",
                completed ? "Estação ativa" : "Sincronizar estação"
            );

            activationButton.type = "button";
            activationButton.disabled = completed;

            activationButton.addEventListener("click", () => {
                registerProgress("interaction", key);
                buttons[index].classList.add("is-complete");
                updateTeleporterStage(station, index);

                const allComplete = interaction.stations.every(
                    (_, stationIndex) =>
                        progressState.interaction.includes(
                            `station-${stationIndex}`
                        )
                );

                ui.state.textContent = allComplete
                    ? "Rede sincronizada"
                    : "Sincronização parcial";
            });

            const network = createElement("div", "teleporter-network");
            const networkCore = createElement(
                "div",
                "teleporter-network-core",
                "935"
            );
            network.append(networkCore);

            interaction.stations.forEach((item, stationIndex) => {
                const stationNode = createElement(
                    "button",
                    "teleporter-node",
                    String.fromCharCode(65 + stationIndex)
                );
                stationNode.type = "button";
                stationNode.dataset.position = String(stationIndex + 1);
                stationNode.classList.toggle(
                    "is-active",
                    stationIndex === index
                );
                stationNode.classList.toggle(
                    "is-complete",
                    progressState.interaction.includes(
                        `station-${stationIndex}`
                    )
                );
                stationNode.addEventListener("click", () => {
                    updateTeleporterStage(item, stationIndex);
                });
                network.append(stationNode);
            });

            stageData.content.prepend(network);
            stageData.content.append(activationButton);
            ui.stage.append(stageData.content);
        }

        interaction.stations.forEach((station, index) => {
            const button = createControlButton(
                station.name,
                String(index + 1).padStart(2, "0")
            );

            if (progressState.interaction.includes(`station-${index}`)) {
                button.classList.add("is-complete");
            }

            button.addEventListener("click", () => {
                updateTeleporterStage(station, index);
            });

            buttons.push(button);
            ui.controlList.append(button);
        });

        container.append(ui.consoleElement);
        updateTeleporterStage(interaction.stations[0], 0);
    }

    function renderBowsInteraction(interaction, container) {
        const ui = createConsole("bows", "Forja aguardando seleção");
        const buttons = [];

        function showBow(bow, index) {
            setActiveState(buttons, index);
            clearElement(ui.stage);
            ui.stage.dataset.code = bow.code;

            const symbol = createElement("div", "bow-symbol", bow.code);
            symbol.style.borderColor = bow.tone;
            symbol.style.color = bow.tone;
            symbol.style.boxShadow = `0 0 35px ${bow.tone}55`;

            const stageData = createStageContent({
                kicker: "Caminho elemental",
                title: bow.name,
                description:
                    "Cada arco oferece um estilo de progressão próprio dentro do castelo e serve como motivo claro para o visitante continuar explorando.",
                code: bow.code
            });

            const forgeVisual = createElement("div", "bow-forge-visual");
            forgeVisual.style.setProperty("--bow-tone", bow.tone);
            const bowArcLeft = createElement("span", "bow-arc bow-arc-left");
            const bowArcRight = createElement("span", "bow-arc bow-arc-right");
            const bowString = createElement("span", "bow-string");
            const bowEnergy = createElement("span", "bow-energy");
            const bowRune = createElement("strong", "bow-rune", bow.code);
            forgeVisual.append(
                bowArcLeft,
                bowArcRight,
                bowString,
                bowEnergy,
                bowRune
            );

            const steps = createElement("div", "bow-steps");

            bow.steps.forEach((step) => {
                steps.append(createElement("div", "bow-step", step));
            });

            const registerButton = createElement(
                "button",
                "interaction-primary-button",
                progressState.interaction.includes(`bow-${index}`)
                    ? "Caminho registrado"
                    : "Registrar caminho"
            );

            registerButton.type = "button";
            registerButton.disabled = progressState.interaction.includes(
                `bow-${index}`
            );

            registerButton.addEventListener("click", () => {
                registerProgress("interaction", `bow-${index}`);
                registerButton.textContent = "Caminho registrado";
                registerButton.disabled = true;
                buttons[index].classList.add("is-complete");
                ui.state.textContent = "Caminho armazenado";
            });

            stageData.content.prepend(forgeVisual, symbol);
            stageData.content.append(steps, registerButton);
            ui.stage.append(stageData.content);
        }

        interaction.bows.forEach((bow, index) => {
            const button = createControlButton(bow.name, bow.code);

            if (progressState.interaction.includes(`bow-${index}`)) {
                button.classList.add("is-complete");
            }

            button.addEventListener("click", () => {
                showBow(bow, index);
            });

            buttons.push(button);
            ui.controlList.append(button);
        });

        container.append(ui.consoleElement);
        showBow(interaction.bows[0], 0);
    }

    function renderLabInteraction(interaction, container) {
        const ui = createConsole("lab", "Aguardando amostra");
        const waterButtons = [];
        let selectedWaterIndex = 0;
        let selectedTreatmentIndex = 0;

        interaction.waters.forEach((water, index) => {
            const button = createControlButton(water.name, water.code);

            if (progressState.interaction.includes(`water-${index}`)) {
                button.classList.add("is-complete");
            }

            button.addEventListener("click", () => {
                selectedWaterIndex = index;
                setActiveState(waterButtons, index);
                renderExperiment();
            });

            waterButtons.push(button);
            ui.controlList.append(button);
        });

        function renderExperiment() {
            const water = interaction.waters[selectedWaterIndex];
            const treatment =
                interaction.treatments[selectedTreatmentIndex];

            clearElement(ui.stage);
            ui.stage.dataset.code = water.code;

            const content = createElement(
                "div",
                "interaction-stage-content"
            );
            const specimen = createElement("div", "lab-chamber");
            specimen.style.setProperty("--sample-tone", water.tone);
            const chamberGlass = createElement("div", "lab-chamber-glass");
            const chamberLiquid = createElement("span", "lab-liquid");
            const chamberSkull = createElement("span", "lab-skull", "AMOSTRA");
            const bubbleLayer = createElement("span", "lab-bubbles");
            chamberGlass.append(chamberLiquid, chamberSkull, bubbleLayer);
            specimen.append(chamberGlass);

            const kicker = createElement(
                "p",
                "interaction-kicker",
                "Amostra selecionada"
            );
            const title = createElement(
                "h3",
                "",
                `${water.name} + ${treatment.name}`
            );
            const description = createElement(
                "p",
                "",
                treatment.description
            );
            const treatmentOptions = createElement(
                "div",
                "lab-options"
            );

            interaction.treatments.forEach((item, index) => {
                const button = createElement(
                    "button",
                    "lab-option",
                    item.name
                );

                button.type = "button";
                button.classList.toggle(
                    "is-active",
                    index === selectedTreatmentIndex
                );
                button.style.setProperty("--option-tone", water.tone);

                button.addEventListener("click", () => {
                    selectedTreatmentIndex = index;
                    renderExperiment();
                });

                treatmentOptions.append(button);
            });

            const result = createElement("div", "lab-result");
            const resultTitle = createElement(
                "strong",
                "",
                `Resultado previsto: ${treatment.effect}`
            );
            const resultText = createElement(
                "p",
                "",
                "Execute a simulação para registrar a combinação no arquivo."
            );
            const simulateButton = createElement(
                "button",
                "interaction-primary-button",
                progressState.interaction.includes(
                    `water-${selectedWaterIndex}`
                )
                    ? "Amostra registrada"
                    : "Executar simulação"
            );

            simulateButton.type = "button";
            simulateButton.disabled = progressState.interaction.includes(
                `water-${selectedWaterIndex}`
            );

            simulateButton.addEventListener("click", () => {
                registerProgress(
                    "interaction",
                    `water-${selectedWaterIndex}`
                );
                waterButtons[selectedWaterIndex].classList.add(
                    "is-complete"
                );
                resultText.textContent =
                    "Combinação registrada. A amostra foi adicionada ao dossiê.";
                ui.state.textContent = "Experimento concluído";
                simulateButton.disabled = true;
                simulateButton.textContent = "Amostra registrada";
            });

            result.append(resultTitle, resultText);
            content.append(
                specimen,
                kicker,
                title,
                description,
                treatmentOptions,
                result,
                simulateButton
            );
            ui.stage.append(content);
        }

        container.append(ui.consoleElement);
        setActiveState(waterButtons, 0);
        renderExperiment();
    }

    function renderDragonInteraction(interaction, container) {
        const ui = createConsole("dragon", "Cerco não preparado");
        const buttons = [];

        function showChallenge(challenge, index) {
            setActiveState(buttons, index);
            clearElement(ui.stage);
            ui.stage.dataset.code = challenge.code;

            const completed = progressState.interaction.includes(
                `challenge-${index}`
            );
            const symbol = createElement(
                "div",
                "dragon-symbol",
                "DR"
            );
            const stageData = createStageContent({
                kicker: completed ? "Desafio concluído" : "Desafio de cerco",
                title: challenge.name,
                description: challenge.description,
                code: challenge.code
            });

            const siegeVisual = createElement("div", "siege-visual");
            const skyline = createElement("span", "siege-skyline");
            const dragonRoute = createElement("span", "dragon-route");
            const dragonBody = createElement("span", "dragon-flight", "ROTA AÉREA");
            siegeVisual.append(skyline, dragonRoute, dragonBody);

            interaction.challenges.forEach((item, challengeIndex) => {
                const routeNode = createElement(
                    "span",
                    "siege-node",
                    String(challengeIndex + 1).padStart(2, "0")
                );
                routeNode.dataset.position = String(challengeIndex + 1);
                routeNode.classList.toggle(
                    "is-active",
                    challengeIndex === index
                );
                routeNode.classList.toggle(
                    "is-complete",
                    progressState.interaction.includes(
                        `challenge-${challengeIndex}`
                    )
                );
                siegeVisual.append(routeNode);
            });

            const action = createElement(
                "button",
                "interaction-primary-button",
                completed ? "Desafio concluído" : "Concluir desafio"
            );

            action.type = "button";
            action.disabled = completed;

            action.addEventListener("click", () => {
                registerProgress("interaction", `challenge-${index}`);
                buttons[index].classList.add("is-complete");
                showChallenge(challenge, index);

                const allComplete = interaction.challenges.every(
                    (_, challengeIndex) =>
                        progressState.interaction.includes(
                            `challenge-${challengeIndex}`
                        )
                );

                ui.state.textContent = allComplete
                    ? "Rota do dragão liberada"
                    : "Cerco parcialmente preparado";
            });

            stageData.content.prepend(siegeVisual, symbol);
            stageData.content.append(action);
            ui.stage.append(stageData.content);
        }

        interaction.challenges.forEach((challenge, index) => {
            const button = createControlButton(
                challenge.name,
                challenge.code
            );

            if (
                progressState.interaction.includes(`challenge-${index}`)
            ) {
                button.classList.add("is-complete");
            }

            button.addEventListener("click", () => {
                showChallenge(challenge, index);
            });

            buttons.push(button);
            ui.controlList.append(button);
        });

        container.append(ui.consoleElement);
        showChallenge(interaction.challenges[0], 0);
    }

    function renderFragmentsInteraction(interaction, container) {
        const ui = createConsole("fragments", "Rota dimensional incompleta");
        const buttons = [];

        function showFragment(fragment, index, shouldRegister = true) {
            setActiveState(buttons, index);
            clearElement(ui.stage);
            ui.stage.dataset.code = String(index + 1).padStart(2, "0");

            if (shouldRegister) {
                registerProgress("interaction", `fragment-${index}`);
                buttons[index].classList.add("is-complete");
            }

            const symbol = createElement(
                "div",
                "fragment-symbol",
                "◇"
            );
            const stageData = createStageContent({
                kicker: "Fragmento dimensional",
                title: fragment.name,
                description: fragment.note,
                code: String(index + 1).padStart(2, "0"),
                details: [
                    { label: "Origem", value: fragment.origin },
                    {
                        label: "Registro",
                        value: `${progressState.interaction.filter(
                            (key) => key.startsWith("fragment-")
                        ).length}/${interaction.fragments.length} fragmentos`
                    }
                ]
            });

            const agarthaVisual = createElement("div", "agartha-visual");
            const portal = createElement("span", "agartha-portal");
            const apothicon = createElement("span", "agartha-presence", "NÚCLEO DIMENSIONAL");
            agarthaVisual.append(portal, apothicon);

            for (let meteorIndex = 0; meteorIndex < 5; meteorIndex += 1) {
                const meteor = createElement("span", "agartha-meteor");
                meteor.style.animationDelay = `${meteorIndex * 0.7}s`;
                meteor.style.top = `${8 + meteorIndex * 14}%`;
                agarthaVisual.append(meteor);
            }

            interaction.fragments.forEach((item, fragmentIndex) => {
                const floatingFragment = createElement(
                    "button",
                    "agartha-fragment",
                    String(fragmentIndex + 1).padStart(2, "0")
                );
                floatingFragment.type = "button";
                floatingFragment.dataset.position = String(fragmentIndex + 1);
                floatingFragment.classList.toggle(
                    "is-active",
                    fragmentIndex === index
                );
                floatingFragment.classList.toggle(
                    "is-complete",
                    progressState.interaction.includes(
                        `fragment-${fragmentIndex}`
                    )
                );
                floatingFragment.addEventListener("click", () => {
                    showFragment(item, fragmentIndex);
                });
                agarthaVisual.append(floatingFragment);
            });

            const fragmentCloud = createElement(
                "div",
                "fragment-cloud"
            );

            interaction.fragments.forEach((item, fragmentIndex) => {
                const chip = createElement(
                    "button",
                    "fragment-chip",
                    item.name
                );

                chip.type = "button";
                chip.classList.toggle(
                    "is-active",
                    fragmentIndex === index
                );
                chip.addEventListener("click", () => {
                    showFragment(item, fragmentIndex);
                });

                fragmentCloud.append(chip);
            });

            stageData.content.prepend(agarthaVisual, symbol);
            stageData.content.append(fragmentCloud);
            ui.stage.append(stageData.content);

            const foundCount = progressState.interaction.filter((key) =>
                key.startsWith("fragment-")
            ).length;

            ui.state.textContent =
                foundCount === interaction.fragments.length
                    ? "Rota dimensional reconstruída"
                    : `${foundCount}/${interaction.fragments.length} fragmentos registrados`;
        }

        interaction.fragments.forEach((fragment, index) => {
            const button = createControlButton(
                fragment.name,
                String(index + 1).padStart(2, "0")
            );

            if (
                progressState.interaction.includes(`fragment-${index}`)
            ) {
                button.classList.add("is-complete");
            }

            button.addEventListener("click", () => {
                showFragment(fragment, index);
            });

            buttons.push(button);
            ui.controlList.append(button);
        });

        container.append(ui.consoleElement);
        showFragment(interaction.fragments[0], 0, false);
    }

    function activatePointerLighting() {
        document.querySelectorAll(
            ".interaction-stage, .character-stage, .presence-card"
        ).forEach((element) => {
            element.addEventListener("pointermove", (event) => {
                const bounds = element.getBoundingClientRect();
                const x = ((event.clientX - bounds.left) / bounds.width) * 100;
                const y = ((event.clientY - bounds.top) / bounds.height) * 100;

                element.style.setProperty("--stage-x", `${x}%`);
                element.style.setProperty("--stage-y", `${y}%`);
            });
        });
    }

    function renderInteraction(map) {
        const container = document.querySelector("#map-interaction");
        clearElement(container);

        document.querySelector("#interaction-title").textContent =
            map.interaction.title;
        document.querySelector("#interaction-description").textContent =
            map.interaction.description;

        switch (map.interaction.type) {
            case "beast":
                renderBeastInteraction(map.interaction, container);
                break;
            case "teleporters":
                renderTeleportersInteraction(map.interaction, container);
                break;
            case "bows":
                renderBowsInteraction(map.interaction, container);
                break;
            case "lab":
                renderLabInteraction(map.interaction, container);
                break;
            case "dragon":
                renderDragonInteraction(map.interaction, container);
                break;
            case "fragments":
                renderFragmentsInteraction(map.interaction, container);
                break;
            default:
                container.append(
                    createElement(
                        "div",
                        "map-loading-card",
                        "Interação em preparação"
                    )
                );
        }
    }

    function setupNavigationObserver() {
        const sections = [
            ...document.querySelectorAll(".map-section[id]")
        ];
        const links = [
            ...document.querySelectorAll(".map-index-links a")
        ];

        if (!("IntersectionObserver" in window)) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (first, second) =>
                            second.intersectionRatio -
                            first.intersectionRatio
                    )[0];

                if (!visibleEntry) {
                    return;
                }

                links.forEach((link) => {
                    link.classList.toggle(
                        "is-active",
                        link.getAttribute("href") ===
                            `#${visibleEntry.target.id}`
                    );
                });
            },
            {
                rootMargin: "-28% 0px -58% 0px",
                threshold: [0.05, 0.2, 0.5]
            }
        );

        sections.forEach((section) => observer.observe(section));
    }

    function setupResetButton() {
        const resetButton = document.querySelector("#map-reset-button");

        resetButton.addEventListener("click", () => {
            const shouldReset = window.confirm(
                "Deseja reiniciar o progresso deste dossiê?"
            );

            if (!shouldReset) {
                return;
            }

            localStorage.removeItem(storageKey);
            localStorage.removeItem(`aether-map-summary-${mapId}`);
            window.location.reload();
        });
    }

    function renderMap(map) {
        currentMap = map;

        applyTheme(map);
        buildAmbientLayer(map);
        renderHero(map);
        renderBriefing(map);
        renderInteraction(map);
        renderArsenal(map);
        renderOverview(map);
        renderStory(map);
        renderCharacters(map);
        renderMechanics(map);
        renderQuest(map);
        renderSecrets(map);
        renderSoundtrack(map);
        activatePointerLighting();
        updateProgressDisplay();
        setupNavigationObserver();
        setupResetButton();
    }

    function showError(error) {
        console.error(error);

        document.querySelector("#map-error").hidden = false;

        document
            .querySelectorAll(".map-hero, .map-index, .map-section")
            .forEach((element) => {
                element.hidden = true;
            });
    }

    async function loadMap() {
        try {
            const response = await fetch("data/map.json");

            if (!response.ok) {
                throw new Error(
                    `Falha ao carregar os dados: ${response.status}`
                );
            }

            const maps = await response.json();
            const map = maps[mapId];

            if (!map) {
                throw new Error(`Mapa não encontrado: ${mapId}`);
            }

            renderMap(map);
        } catch (error) {
            showError(error);
        }
    }

    loadMap();
})();
