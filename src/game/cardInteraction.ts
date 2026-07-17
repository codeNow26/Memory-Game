import { gameState } from "../state/state";
import { addPlayerScore, switchPlayer } from "./player";
import { areAllCardsFlipped } from "./cards";
import { showGameOverScreen } from "./gameOver";

export function initCardClickListener() {
    const fieldRef = document.getElementById("field");
    fieldRef?.addEventListener("click", handleCardClick);
}

function handleCardClick(event: MouseEvent) {
    if (gameState.isChecking) return;

    const card = getClickedCard(event);
    if (!isCardSelectable(card)) return;

    flipCard(card);
    selectCard(card);

    if (gameState.firstCard && gameState.secondCard) {
        checkSelectedCards();
    }
}

function getClickedCard(event: MouseEvent) {
    const target = event.target as HTMLElement;
    return target.closest(".card") as HTMLButtonElement | null;
}

function isCardSelectable(card: HTMLButtonElement | null): card is HTMLButtonElement {
    return card !== null && card !== gameState.firstCard && !card.disabled;
}

function flipCard(card: HTMLButtonElement) {
    card.classList.add("is-flipped");
}

function selectCard(card: HTMLButtonElement) {
    if (!gameState.firstCard) {
        gameState.firstCard = card;
        return;
    }

    gameState.secondCard = card;
}

function checkSelectedCards() {
    if (!gameState.firstCard || !gameState.secondCard) return;

    gameState.isChecking = true;

    if (cardsMatch(gameState.firstCard, gameState.secondCard)) {
        handleMatchingCards();
        return;
    }

    handleDifferentCards();
}

function cardsMatch(
    first: HTMLButtonElement,
    second: HTMLButtonElement
) {
    return first.dataset.card === second.dataset.card;
}

function handleMatchingCards() {
    if (!gameState.firstCard || !gameState.secondCard) return;

    addPlayerScore();
    disableSelectedCards();
    resetCardSelection();

    if (areAllCardsFlipped()) {
        showGameOverScreen();
    }
}



function disableSelectedCards() {
    if (!gameState.firstCard || !gameState.secondCard) return;

    gameState.firstCard.disabled = true;
    gameState.secondCard.disabled = true;
}

function handleDifferentCards() {
    if (!gameState.firstCard || !gameState.secondCard) return;

    const first = gameState.firstCard;
    const second = gameState.secondCard;

    switchPlayer();
    resetDifferentCards(first, second);
}

function resetDifferentCards(
    first: HTMLButtonElement,
    second: HTMLButtonElement
) {
    setTimeout(() => {
        first.classList.remove("is-flipped");
        second.classList.remove("is-flipped");
        resetCardSelection();
    }, 1000);
}

function resetCardSelection() {
    gameState.firstCard = null;
    gameState.secondCard = null;
    gameState.isChecking = false;
}