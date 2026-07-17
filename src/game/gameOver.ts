import { playerImages } from "../data/cardThemes";
import { gameState } from "../state/state";
import { resetScores } from "./player";

/**
 * Displays the game-over screen and then shows the winner screen.
 */
export function showGameOverScreen() {
    showGameOver();
    const gameOverScreen = document.getElementById("game-over-screen");
    gameOverScreen?.classList.remove("d-none");

    setTimeout(() => {
        gameOverScreen?.classList.add("d-none");
        showWinnerScreen();
    }, 3000);

}

/**
 * Displays the game result based on the current scores.
 */
function showGameOver() {
    const gameOverText = document.getElementById("game-over-text")!;
    if (gameState.blueScore > gameState.orangeScore) {
        gameOverText.textContent = "Blue Player Wins!";
    } else if (gameState.orangeScore > gameState.blueScore) {
        gameOverText.textContent = "Orange Player Wins!";
    } else {
        gameOverText.textContent = "It's a Tie!";
    }
}

/**
 * Displays the winner screen and its content.
 */
function showWinnerScreen() {
    const winnerScreen = document.getElementById("winner-screen");
    winnerScreen?.classList.remove("d-none");
    showWinner();
}

/**
 * Displays the winner or draw result and resets the scores.
 */
function showWinner() {
    const winnerImg = document.getElementById("winner-img") as HTMLImageElement;
    const winnerText = document.getElementById("winner-text") as HTMLElement;
    const playerText = document.getElementById("draw-text") as HTMLElement;

    resetWinnerScreen(winnerText, playerText);
    setWinnerContent(winnerImg, winnerText, playerText);
    resetScores();
}

/**
 * Resets the winner screen text and CSS classes.
 * @param winnerText - The element displaying the winner heading.
 * @param playerText - The element displaying the player or draw result.
 */
function resetWinnerScreen(
    winnerText: HTMLElement,
    playerText: HTMLElement
) {
    winnerText.textContent = "The winner is";
    playerText.textContent = "";
    playerText.className = "winner-screen__draw";
}

/**
 * Sets the winner screen content based on the current scores.
 * @param winnerImg - The image element displaying the result image.
 * @param winnerText - The element displaying the winner heading.
 * @param playerText - The element displaying the player or draw result.
 */
function setWinnerContent(
    winnerImg: HTMLImageElement,
    winnerText: HTMLElement,
    playerText: HTMLElement
) {
    if (gameState.blueScore > gameState.orangeScore) {
        setWinner(winnerImg, playerText, "blueWin", "Blue Player", "blue-player");
        return;
    }

    if (gameState.orangeScore > gameState.blueScore) {
        setWinner(winnerImg, playerText, "orangeWin", "Orange Player", "orange-player");
        return;
    }

    winnerImg.src = playerImages[gameState.selectedTheme].draw;
    winnerText.textContent = "It's a";
    playerText.textContent = "DRAW";
    playerText.classList.add("draw-player");
}

/**
 * Sets the image, label and CSS class for the winning player.
 * @param image - The image element displaying the winner.
 * @param text - The element displaying the winner label.
 * @param imageKey - The key of the winner image.
 * @param label - The winner label to display.
 * @param className - The CSS class for the winning player.
 */
function setWinner(
    image: HTMLImageElement,
    text: HTMLElement,
    imageKey: "blueWin" | "orangeWin",
    label: string,
    className: string
) {
    image.src = playerImages[gameState.selectedTheme][imageKey];
    text.textContent = label;
    text.classList.add(className);
}