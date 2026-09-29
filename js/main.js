"use strict";

(() => {
    const mapIds = [
        "shadows-of-evil",
        "the-giant",
        "der-eisendrache",
        "zetsubou-no-shima",
        "gorod-krovi",
        "revelations"
    ];

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    function safeStorageGet(key) {
        try {
            return localStorage.getItem(key);
        } catch {
            return null;
        }
    }

    function readProgress(mapId) {
        const raw = Number(safeStorageGet(`aether-map-summary-${mapId}`));
        return Number.isFinite(raw) ? Math.min(100, Math.max(0, raw)) : 0;
    }

    function createElement(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    }

    function setupHeader() {
        const header = document.querySelector("#site-header");
        const toggle = document.querySelector("#navigation-toggle");
        const navigation = document.querySelector("#main-navigation");
        const progress = document.querySelector("#header-scroll-progress");
        const links = [...document.querySelectorAll("#main-navigation a[href^='#']")];
        const sections = links
            .map((link) => document.querySelector(link.getAttribute("href")))
            .filter(Boolean);

        function closeNavigation() {
            if (!toggle || !navigation) return;
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Abrir menu");
            navigation.classList.remove("is-open");
            document.body.classList.remove("navigation-open");
        }

        toggle?.addEventListener("click", () => {
            const open = toggle.getAttribute("aria-expanded") !== "true";
            toggle.setAttribute("aria-expanded", String(open));
            toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
            navigation?.classList.toggle("is-open", open);
            document.body.classList.toggle("navigation-open", open);
        });

        links.forEach((link) => link.addEventListener("click", closeNavigation));

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeNavigation();
        });

        function updateHeaderState() {
            const y = window.scrollY;
            header?.classList.toggle("header-scrolled", y > 36);

            if (progress) {
                const max = Math.max(
                    1,
                    document.documentElement.scrollHeight - window.innerHeight
                );
                progress.style.transform = `scaleX(${Math.min(1, y / max)})`;
            }

            if (!sections.length) return;

            const marker = y + Math.min(window.innerHeight * 0.35, 320);
            let current = sections[0];

            sections.forEach((section) => {
                if (marker >= section.offsetTop) current = section;
            });

            links.forEach((link) => {
                const active = link.getAttribute("href") === `#${current.id}`;
                link.classList.toggle("is-active", active);
                if (active) link.setAttribute("aria-current", "location");
                else link.removeAttribute("aria-current");
            });
        }

        updateHeaderState();
        window.addEventListener("scroll", updateHeaderState, { passive: true });
        window.addEventListener("resize", () => {
            if (window.innerWidth > 820) closeNavigation();
            updateHeaderState();
        });
    }

    setupHeader();

    /* Entrada progressiva das seções, sem esconder conteúdo quando JS falha. */
    const revealElements = document.querySelectorAll(".reveal");

    if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
        revealElements.forEach((element) => element.classList.add("is-visible"));
    } else {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            { rootMargin: "0px 0px -8%", threshold: 0.08 }
        );

        revealElements.forEach((element) => observer.observe(element));
    }

    /* Movimento sutil do cenário inicial. */
    const hero = document.querySelector(".home-hero");

    hero?.addEventListener("pointermove", (event) => {
        if (prefersReducedMotion.matches || event.pointerType === "touch") return;

        const bounds = hero.getBoundingClientRect();
        const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
        const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;

        hero.style.setProperty("--hero-pan-x", `${normalizedX * -10}px`);
        hero.style.setProperty("--hero-pan-y", `${normalizedY * -7}px`);
    });

    hero?.addEventListener("pointerleave", () => {
        hero.style.setProperty("--hero-pan-x", "0px");
        hero.style.setProperty("--hero-pan-y", "0px");
    });

    const investigatedMaps = mapIds.filter((mapId) => readProgress(mapId) > 0).length;
    const homeProgressLabel = document.querySelector("#home-progress-label");

    if (homeProgressLabel) {
        homeProgressLabel.textContent = `${investigatedMaps} de ${mapIds.length} arquivos investigados`;
    }

    document.querySelector("#random-file-button")?.addEventListener("click", () => {
        const mapId = mapIds[Math.floor(Math.random() * mapIds.length)];
        window.location.href = `mapa.html?id=${mapId}`;
    });

    /* Vitrine rotativa dos mapas. */
    const carousel = document.querySelector("#map-carousel");
    const slides = [...document.querySelectorAll("[data-map-slide]")];
    const previousButton = document.querySelector("[data-map-previous]");
    const nextButton = document.querySelector("[data-map-next]");
    const counter = document.querySelector("#map-vault-counter");
    const record = document.querySelector("#map-active-record");
    const dotsContainer = document.querySelector("#map-vault-dots");
    const dots = [];
    let activeIndex = 0;
    let dragStartX = null;

    function normalizedOffset(index) {
        let offset = index - activeIndex;
        const half = Math.floor(slides.length / 2);
        if (offset > half) offset -= slides.length;
        if (offset < -half) offset += slides.length;
        return offset;
    }

    function renderMapRecord(slide) {
        if (!record) return;

        const progress = readProgress(slide.dataset.mapId);
        const tags = (slide.dataset.tags || "").split("|").filter(Boolean);
        record.replaceChildren();

        const file = createElement("div", "map-record-file", slide.dataset.file);
        const content = createElement("div", "map-record-content");
        const place = createElement("small", "", slide.dataset.place);
        const title = createElement("h3", "", slide.dataset.title);
        const summary = createElement("p", "", slide.dataset.summary);
        const tagList = createElement("ul", "map-record-tags");

        tags.forEach((tag) => tagList.append(createElement("li", "", tag)));
        content.append(place, title, summary, tagList);

        const action = createElement("div", "map-record-action");
        const progressLabel = createElement("span", "", "Investigação local");
        const progressValue = createElement("strong", "", `${progress}%`);
        const link = createElement(
            "a",
            "",
            progress > 0 ? "Continuar arquivo" : "Abrir arquivo"
        );
        link.href = slide.dataset.href;
        link.setAttribute("aria-label", `${link.textContent}: ${slide.dataset.title}`);
        action.append(progressLabel, progressValue, link);
        record.append(file, content, action);
    }

    function updateCarousel(nextIndex, focusSlide = false) {
        if (!slides.length) return;

        activeIndex = (nextIndex + slides.length) % slides.length;

        slides.forEach((slide, index) => {
            const offset = normalizedOffset(index);
            const distance = Math.abs(offset);
            const active = offset === 0;

            slide.style.setProperty("--offset", String(offset));
            slide.style.setProperty("--distance", String(Math.min(distance, 3)));
            slide.classList.toggle("is-active", active);
            slide.classList.toggle("is-near", distance === 1);
            slide.classList.toggle("is-far", distance > 1);
            slide.setAttribute("aria-hidden", active ? "false" : "true");
            slide.setAttribute("role", "button");
            slide.setAttribute("aria-label", `${slide.dataset.title}. ${active ? "Abrir arquivo" : "Selecionar mapa"}`);
            slide.tabIndex = active ? 0 : -1;
        });

        dots.forEach((dot, index) => {
            const active = index === activeIndex;
            dot.classList.toggle("is-active", active);
            dot.setAttribute("aria-current", active ? "true" : "false");
        });

        if (counter) {
            counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
        }

        renderMapRecord(slides[activeIndex]);
        if (focusSlide) slides[activeIndex].focus({ preventScroll: true });
    }

    slides.forEach((slide, index) => {
        slide.addEventListener("click", () => {
            if (index === activeIndex) {
                window.location.href = slide.dataset.href;
                return;
            }
            updateCarousel(index);
        });

        slide.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                window.location.href = slide.dataset.href;
            }
        });

        const dot = createElement("button", "map-vault-dot");
        dot.type = "button";
        dot.setAttribute("aria-label", `Selecionar ${slide.dataset.title}`);
        dot.addEventListener("click", () => updateCarousel(index));
        dots.push(dot);
        dotsContainer?.append(dot);
    });

    previousButton?.addEventListener("click", () => updateCarousel(activeIndex - 1, true));
    nextButton?.addEventListener("click", () => updateCarousel(activeIndex + 1, true));

    carousel?.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            updateCarousel(activeIndex - 1, true);
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            updateCarousel(activeIndex + 1, true);
        }
    });

    /* Não prende o scroll vertical da página. */
    carousel?.addEventListener(
        "wheel",
        (event) => {
            if (Math.abs(event.deltaX) < 28) return;
            event.preventDefault();
            updateCarousel(activeIndex + (event.deltaX > 0 ? 1 : -1));
        },
        { passive: false }
    );

    carousel?.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) return;
        dragStartX = event.clientX;
        carousel.setPointerCapture?.(event.pointerId);
    });

    function finishDrag(event) {
        if (dragStartX === null) return;
        const difference = event.clientX - dragStartX;
        dragStartX = null;
        if (Math.abs(difference) < 55) return;
        updateCarousel(activeIndex + (difference < 0 ? 1 : -1));
    }

    carousel?.addEventListener("pointerup", finishDrag);
    carousel?.addEventListener("pointercancel", () => {
        dragStartX = null;
    });

    updateCarousel(0);

    /* Rede de Morg City: personagem → distrito → objeto → ritual. */
    const characterData = {
        nero: {
            index: "Ficha 01",
            name: "Nero Blackstone",
            role: "O mágico",
            district: "Easy Street",
            item: "Lawyer's Pen",
            ritual: "Nero's Landing",
            summary: "Um mágico em decadência que é conduzido ao ritual de Easy Street após tentar escapar das consequências de seus atos."
        },
        jessica: {
            index: "Ficha 02",
            name: "Jessica Rose",
            role: "A dançarina",
            district: "Footlight District",
            item: "Producer's Toupee",
            ritual: "Black Lace Burlesque",
            summary: "Uma dançarina de Morg City cuja carreira e escolhas estão ligadas ao ritual realizado no distrito de Footlight."
        },
        jack: {
            index: "Ficha 03",
            name: "Jack Vincent",
            role: "O policial",
            district: "Canal District",
            item: "Detective's Badge",
            ritual: "Ruby Rabbit",
            summary: "Um detetive corrupto que percorre o Canal District e participa do ritual realizado no Ruby Rabbit."
        },
        floyd: {
            index: "Ficha 04",
            name: "Floyd Campbell",
            role: "O boxeador",
            district: "Waterfront District",
            item: "Championship Belt",
            ritual: "Boxing Gym",
            summary: "Um boxeador determinado a alcançar sua grande oportunidade, ligado ao Waterfront District e ao ritual do ginásio."
        }
    };

    const characterBrain = document.querySelector("#character-brain");
    const characterRecord = document.querySelector("#character-network-record");
    const characterButtons = [...document.querySelectorAll("[data-character]")];

    function renderCharacter(characterId, focus = false) {
        const character = characterData[characterId];
        if (!character || !characterRecord || !characterBrain) return;

        characterBrain.dataset.activeCharacter = characterId;
        characterButtons.forEach((button) => {
            const active = button.dataset.character === characterId;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", String(active));
            button.tabIndex = active ? 0 : -1;
        });

        characterRecord.replaceChildren();
        characterRecord.append(
            createElement("span", "character-record-index", character.index),
            createElement("h3", "", character.name),
            createElement("p", "character-record-role", character.role),
            createElement("p", "", character.summary)
        );

        const links = createElement("div", "character-links");
        [
            ["Distrito", character.district],
            ["Objeto", character.item],
            ["Ritual", character.ritual]
        ].forEach(([label, value]) => {
            const row = createElement("div", "character-link-row");
            row.append(createElement("small", "", label), createElement("strong", "", value));
            links.append(row);
        });

        const openLink = createElement("a", "", "Abrir rede de Shadows →");
        openLink.href = "mapa.html?id=shadows-of-evil#personagens-do-mapa";
        characterRecord.append(links, openLink);

        if (focus) {
            characterButtons.find((button) => button.dataset.character === characterId)?.focus();
        }
    }

    characterButtons.forEach((button, index) => {
        button.addEventListener("click", () => renderCharacter(button.dataset.character));
        button.addEventListener("keydown", (event) => {
            if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
            event.preventDefault();
            let next = index;
            if (event.key === "Home") next = 0;
            else if (event.key === "End") next = characterButtons.length - 1;
            else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + characterButtons.length) % characterButtons.length;
            else next = (index + 1) % characterButtons.length;
            renderCharacter(characterButtons[next].dataset.character, true);
        });
    });

    renderCharacter("nero");

    /* Linha conectada da campanha de Black Ops III Zombies. */
    const timelineData = [
        { number: "01", title: "Morg City", description: "Shadows of Evil apresenta os rituais, a Summoning Key e a presença Apothicon que atravessa o restante da jornada.", mapId: "shadows-of-evil" },
        { number: "02", title: "The Giant", description: "Primis altera um momento decisivo na instalação do Grupo 935 e inicia a sequência principal de Black Ops III.", mapId: "the-giant" },
        { number: "03", title: "Der Eisendrache", description: "O castelo amplia o plano de Richtofen e concentra a etapa pessoal de Dempsey entre dragões e caminhos elementais.", mapId: "der-eisendrache" },
        { number: "04", title: "Zetsubou No Shima", description: "A ilha da Divisão 9 transforma experimentos biológicos na etapa pessoal de Takeo e em uma nova ligação do plano.", mapId: "zetsubou-no-shima" },
        { number: "05", title: "Gorod Krovi", description: "Stalingrado reúne dragões, máquinas e o confronto que coloca Nikolai no centro da operação de Primis.", mapId: "gorod-krovi" },
        { number: "06", title: "Revelations", description: "Fragmentos de toda a jornada colidem em Agartha e conduzem Primis ao encerramento do ciclo de Black Ops III.", mapId: "revelations" }
    ];

    const timelineDetail = document.querySelector("#timeline-detail");
    const timelineNodes = [...document.querySelectorAll("[data-timeline-index]")];

    function renderTimeline(index, focus = false) {
        const item = timelineData[index];
        if (!timelineDetail || !item) return;

        timelineNodes.forEach((node, nodeIndex) => {
            const active = nodeIndex === index;
            node.classList.toggle("is-active", active);
            node.setAttribute("role", "tab");
            node.setAttribute("aria-selected", String(active));
            node.tabIndex = active ? 0 : -1;
        });

        timelineDetail.replaceChildren();
        const number = createElement("span", "timeline-detail-number", item.number);
        const content = createElement("div");
        content.append(createElement("h3", "", item.title), createElement("p", "", item.description));
        const link = createElement("a", "", "Abrir arquivo →");
        link.href = `mapa.html?id=${item.mapId}`;
        timelineDetail.append(number, content, link);

        if (focus) timelineNodes[index]?.focus();
    }

    timelineNodes.forEach((node, index) => {
        node.addEventListener("click", () => renderTimeline(Number(node.dataset.timelineIndex)));
        node.addEventListener("keydown", (event) => {
            if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
            event.preventDefault();
            let next = index;
            if (event.key === "Home") next = 0;
            else if (event.key === "End") next = timelineNodes.length - 1;
            else if (event.key === "ArrowLeft") next = (index - 1 + timelineNodes.length) % timelineNodes.length;
            else next = (index + 1) % timelineNodes.length;
            renderTimeline(next, true);
        });
    });

    renderTimeline(0);
})();
