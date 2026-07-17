import { gameState } from "../state/state";
import { addPlayerScore, switchPlayer } from "./player";
import { areAllCardsFlipped } from "./cards";
import { showGameOverScreen } from "./gameOver";

/**
 * Initializes the click listener for the game field.
 */
export function initCardClickListener() {
    const fieldRef = document.getElementById("field");
    fieldRef?.addEventListener("click", handleCardClick);
}

/**
 * Handles a card click and checks the selected cards.
 * @param event - The mouse click event.
 */
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

/**
 * Gets the card element that was clicked.
 * @param event - The mouse click event.
 * @returns The clicked card or null.
 */
function getClickedCard(event: MouseEvent) {
    const target = event.target as HTMLElement;
    return target.closest(".card") as HTMLButtonElement | null;
}

/**
 * Checks whether a card can be selected.
 * @param card - The card to check.
 * @returns Whether the card can be selected.
 */
function isCardSelectable(card: HTMLButtonElement | null): card is HTMLButtonElement {
    return card !== null && card !== gameState.firstCard && !card.disabled;
}

/**
 * Flips the selected card.
 * @param card - The card to flip.
 */
function flipCard(card: HTMLButtonElement) {
    card.classList.add("is-flipped");
}

/**
 * Stores the selected card in the game state.
 * @param card - The selected card.
 */
function selectCard(card: HTMLButtonElement) {
    if (!gameState.firstCard) {
        gameState.firstCard = card;
        return;
    }

    gameState.secondCard = card;
}

/**
 * Checks whether the two selected cards match.
 */
function checkSelectedCards() {
    if (!gameState.firstCard || !gameState.secondCard) return;

    gameState.isChecking = true;

    if (cardsMatch(gameState.firstCard, gameState.secondCard)) {
        handleMatchingCards();
        return;
    }

    handleDifferentCards();
}

/**
 * Compares the image values of two cards.
 * @param first - The first selected card.
 * @param second - The second selected card.
 * @returns Whether the cards match.
 */
function cardsMatch(
    first: HTMLButtonElement,
    second: HTMLButtonElement
) {
    return first.dataset.card === second.dataset.card;
}

/**
 * Handles matching cards and checks whether the game is finished.
 */
function handleMatchingCards() {
    if (!gameState.firstCard || !gameState.secondCard) return;

    addPlayerScore();
    disableSelectedCards();
    resetCardSelection();

    if (areAllCardsFlipped()) {
        showGameOverScreen();
    }
}



/**
 * Disables the two matching cards.
 */
function disableSelectedCards() {
    if (!gameState.firstCard || !gameState.secondCard) return;

    gameState.firstCard.disabled = true;
    gameState.secondCard.disabled = true;
}

/**
 * Handles different cards and switches the current player.
 */
function handleDifferentCards() {
    if (!gameState.firstCard || !gameState.secondCard) return;

    const first = gameState.firstCard;
    const second = gameState.secondCard;

    switchPlayer();
    resetDifferentCards(first, second);
}

/**
 * Flips two different cards back after a short delay.
 * @param first - The first selected card.
 * @param second - The second selected card.
 */
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

/**
 * Clears the selected cards and unlocks card checking.
 */
function resetCardSelection() {
    gameState.firstCard = null;
    gameState.secondCard = null;
    gameState.isChecking = false;
}