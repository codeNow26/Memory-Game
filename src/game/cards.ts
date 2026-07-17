import {
    codingCards,
    gamingCards,
    DACards,
    foodCards,
    cardBacks
} from "../data/cardThemes";

import { gameState } from "../state/state";

/**
 * Creates the selected number of cards in the game field.
 * @param selectedBoard - The number of cards to create.
 */
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

/**
 * Creates and shuffles the image pairs for the selected board.
 * @param selectedBoard - The number of cards on the board.
 * @returns The shuffled card image paths.
 */
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

/**
 * Displays the card-back image for the selected theme.
 */
export function renderCardBack() {
    const cardFaces =
        document.querySelectorAll<HTMLElement>(".card__face--front");

    cardFaces.forEach(card => {
        card.style.backgroundImage =
            `url("${cardBacks[gameState.selectedTheme]}")`;
    });
}

/**
 * Assigns the shuffled images to the front of the cards.
 * @param selectedBoard - The number of cards on the board.
 */
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

/**
 * Checks whether all cards have been flipped.
 * @returns Whether all cards are flipped.
 */
export function areAllCardsFlipped() {
    const cards = document.querySelectorAll(".card");

    return [...cards].every(card =>
        card.classList.contains("is-flipped")
    );
}