import { playerImages } from "../data/cardThemes";
import { gameState } from "../state/state";

/**
 * Displays the player images for the selected theme.
 */
export function showPlayerImages() {
    const { blue, orange } = playerImages[gameState.selectedTheme];

    setImage("blue-player-img", blue);
    setImage("orange-player-img", orange);
    setImage("game-over-blue-player-img", blue);
    setImage("game-over-orange-player-img", orange);
}

/**
 * Sets the source of an image element.
 * @param id - The ID of the image element.
 * @param src - The path to the image.
 */
function setImage(id: string, src: string) {
    const image = document.getElementById(id) as HTMLImageElement;
    image.src = src;
}

/**
 * Displays the image of the current player.
 */
export function showCurrentPlayer() {
    const currentPlayerImg = document.getElementById(
        "current-player"
    ) as HTMLImageElement;

    currentPlayerImg.src =
        playerImages[gameState.selectedTheme][gameState.selectedPlayer];
}

/**
 * Switches between the blue and orange player.
 */
export function switchPlayer() {
    gameState.selectedPlayer = gameState.selectedPlayer === "blue" ? "orange" : "blue";
    showCurrentPlayer();
}

/**
 * Updates all score displays with the current scores.
 */
function updateScoreDisplay() {
    setScore("blue-score", gameState.blueScore);
    setScore("orange-score", gameState.orangeScore);
    setScore("game-over-blue-score", gameState.blueScore);
    setScore("game-over-orange-score", gameState.orangeScore);
}

/**
 * Sets the score text of an element.
 * @param id - The ID of the score element.
 * @param score - The score to display.
 */
function setScore(id: string, score: number) {
    const element = document.getElementById(id);
    if (!element) return;

    element.textContent = score.toString();
}

/**
 * Adds one point to the current player's score.
 */
export function addPlayerScore() {
    if (gameState.selectedPlayer === "blue") {
        gameState.blueScore++;
    } else {
        gameState.orangeScore++;
    }

    updateScoreDisplay();
}

/**
 * Resets both player scores to zero.
 */
export function resetScores() {
    gameState.blueScore = 0;
    gameState.orangeScore = 0;
    updateScoreDisplay();
}