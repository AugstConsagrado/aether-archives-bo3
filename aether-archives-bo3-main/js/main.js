(() => {
    "use strict";

    const mapIds = [
        "shadows-of-evil",
        "the-giant",
        "der-eisendrache",
        "zetsubou-no-shima",
        "gorod-krovi",
        "revelations"
    ];

    function readProgress(mapId) {
        try {
            const raw = Number(localStorage.getItem(`aether-map-summary-${mapId}`));
            return Number.isFinite(raw) ? Math.min(100, Math.max(0, raw)) : 0;
        } catch (error) {
            return 0;
        }
    }

    function createElement(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    }

    /* Entrada progressiva das seções. */
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.1 }
        );

        revealElements.forEach((element) => observer.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add("is-visible"));
    }

    /* Movimento sutil do cenário inicial, sem criar elementos que não existem na arte. */
    const hero = document.querySelector(".home-hero");

    hero?.addEventListener("pointermove", (event) => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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

    const randomFileButton = document.querySelector("#random-file-button");
    randomFileButton?.addEventListener("click", () => {
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

        const mapId = slide.dataset.mapId;
        const progress = readProgress(mapId);
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
        const link = createElement("a", "", progress > 0 ? "Continuar arquivo" : "Abrir arquivo");
        link.href = slide.dataset.href;
        action.append(progressLabel, progressValue, link);

        record.append(file, content, action);
    }

    function updateCarousel(nextIndex) {
        if (!slides.length) return;

        activeIndex = (nextIndex + slides.length) % slides.length;

        slides.forEach((slide, index) => {
            const offset = normalizedOffset(index);
            const distance = Math.abs(offset);

            slide.style.setProperty("--offset", String(offset));
            slide.style.setProperty("--distance", String(Math.min(distance, 3)));
            slide.classList.toggle("is-active", offset === 0);
            slide.classList.toggle("is-near", distance === 1);
            slide.classList.toggle("is-far", distance > 1);
            slide.setAttribute("aria-hidden", offset === 0 ? "false" : "true");
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle("is-active", index === activeIndex);
            dot.setAttribute("aria-current", index === activeIndex ? "true" : "false");
        });

        if (counter) {
            counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
        }

        renderMapRecord(slides[activeIndex]);
    }

    slides.forEach((slide, index) => {
        slide.addEventListener("click", () => {
            if (index === activeIndex) return;
            updateCarousel(index);
        });

        const dot = createElement("button", "map-vault-dot");
        dot.type = "button";
        dot.setAttribute("aria-label", `Selecionar ${slide.dataset.title}`);
        dot.addEventListener("click", () => updateCarousel(index));
        dots.push(dot);
        dotsContainer?.append(dot);
    });

    previousButton?.addEventListener("click", () => updateCarousel(activeIndex - 1));
    nextButton?.addEventListener("click", () => updateCarousel(activeIndex + 1));

    carousel?.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            updateCarousel(activeIndex - 1);
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            updateCarousel(activeIndex + 1);
        }

        if (event.key === "Enter") {
            window.location.href = slides[activeIndex].dataset.href;
        }
    });

    carousel?.addEventListener("wheel", (event) => {
        if (Math.abs(event.deltaX) < 16 && Math.abs(event.deltaY) < 28) return;
        event.preventDefault();
        updateCarousel(activeIndex + (event.deltaY > 0 || event.deltaX > 0 ? 1 : -1));
    }, { passive: false });

    carousel?.addEventListener("pointerdown", (event) => {
        dragStartX = event.clientX;
        carousel.setPointerCapture?.(event.pointerId);
    });

    carousel?.addEventListener("pointerup", (event) => {
        if (dragStartX === null) return;
        const difference = event.clientX - dragStartX;
        dragStartX = null;

        if (Math.abs(difference) < 55) return;
        updateCarousel(activeIndex + (difference < 0 ? 1 : -1));
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

    function renderCharacter(characterId) {
        const character = characterData[characterId];
        if (!character || !characterRecord) return;

        characterBrain.dataset.activeCharacter = characterId;
        characterButtons.forEach((button) => {
            button.classList.toggle("is-active", button.dataset.character === characterId);
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
    }

    characterButtons.forEach((button) => {
        button.addEventListener("click", () => renderCharacter(button.dataset.character));
    });

    renderCharacter("nero");

    /* Linha conectada da campanha de Black Ops III Zombies. */
    const timelineData = [
        {
            number: "01",
            title: "Morg City",
            description: "Shadows of Evil apresenta os rituais, a Summoning Key e a presença Apothicon que atravessa o restante da jornada.",
            mapId: "shadows-of-evil"
        },
        {
            number: "02",
            title: "The Giant",
            description: "Primis altera um momento decisivo na instalação do Grupo 935 e inicia a sequência principal de Black Ops III.",
            mapId: "the-giant"
        },
        {
            number: "03",
            title: "Der Eisendrache",
            description: "O castelo amplia o plano de Richtofen e concentra a etapa pessoal de Dempsey entre dragões e caminhos elementais.",
            mapId: "der-eisendrache"
        },
        {
            number: "04",
            title: "Zetsubou No Shima",
            description: "A ilha da Divisão 9 transforma experimentos biológicos na etapa pessoal de Takeo e em uma nova ligação do plano.",
            mapId: "zetsubou-no-shima"
        },
        {
            number: "05",
            title: "Gorod Krovi",
            description: "Stalingrado reúne dragões, máquinas e o confronto que coloca Nikolai no centro da operação de Primis.",
            mapId: "gorod-krovi"
        },
        {
            number: "06",
            title: "Revelations",
            description: "Fragmentos de toda a jornada colidem em Agartha e conduzem Primis ao encerramento do ciclo de Black Ops III.",
            mapId: "revelations"
        }
    ];

    const timelineDetail = document.querySelector("#timeline-detail");
    const timelineNodes = [...document.querySelectorAll("[data-timeline-index]")];

    function renderTimeline(index) {
        const item = timelineData[index];
        if (!timelineDetail || !item) return;

        timelineNodes.forEach((node, nodeIndex) => {
            node.classList.toggle("is-active", nodeIndex === index);
        });

        timelineDetail.replaceChildren();
        const number = createElement("span", "timeline-detail-number", item.number);
        const content = createElement("div");
        content.append(
            createElement("h3", "", item.title),
            createElement("p", "", item.description)
        );
        const link = createElement("a", "", "Abrir arquivo →");
        link.href = `mapa.html?id=${item.mapId}`;
        timelineDetail.append(number, content, link);
    }

    timelineNodes.forEach((node) => {
        node.addEventListener("click", () => renderTimeline(Number(node.dataset.timelineIndex)));
    });

    renderTimeline(0);
})();
