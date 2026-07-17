import {
    codingCards,
    gamingCards,
    DACards,
    foodCards,
    cardBacks
} from "../data/cardThemes";

import { gameState } from "../state/state";

export function renderCards(selectedBoard: number) {
    const fieldRef = document.getElementById("field");
    if (!fieldRef) return;

    fieldRef.innerHTML = "";

    for (let i = selectedBoard; i > 0; i--) {
        const card = document.createElement("button");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card__inner">
                <div class="card__face card__face--front"></div>
                <div class="card__face card__face--back"></div>
            </div>
        `;

        fieldRef.appendChild(card);
    }
}

function getCardFrontImages(selectedBoard: number) {
    const pairs = selectedBoard / 2;

    const fronts = {
        coding: codingCards,
        gaming: gamingCards,
        da: DACards,
        foods: foodCards
    };

    const selectedImages = fronts[gameState.selectedTheme].slice(0, pairs);
    const pairedImages = [...selectedImages, ...selectedImages];

    return pairedImages.sort(() => Math.random() - 0.5);
}

export function renderCardBack() {
    const cardFaces =
        document.querySelectorAll<HTMLElement>(".card__face--front");

    cardFaces.forEach(card => {
        card.style.backgroundImage =
            `url("${cardBacks[gameState.selectedTheme]}")`;
    });
}

export function renderCardFront(selectedBoard: number) {
    const images = getCardFrontImages(selectedBoard);
    const cardFront =
        document.querySelectorAll<HTMLElement>(".card__face--back");

    cardFront.forEach((card, index) => {
        const cardElement = card.closest(".card");

        cardElement?.setAttribute("data-card", images[index]);
        card.style.backgroundImage = `url("${images[index]}")`;
    });
}

export function areAllCardsFlipped() {
    const cards = document.querySelectorAll(".card");

    return [...cards].every(card =>
        card.classList.contains("is-flipped")
    );
}