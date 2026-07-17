import { playerImages } from "../data/cardThemes";
import { gameState } from "../state/state";

export function showPlayerImages() {
    const { blue, orange } = playerImages[gameState.selectedTheme];

    setImage("blue-player-img", blue);
    setImage("orange-player-img", orange);
    setImage("game-over-blue-player-img", blue);
    setImage("game-over-orange-player-img", orange);
}

function setImage(id: string, src: string) {
    const image = document.getElementById(id) as HTMLImageElement;
    image.src = src;
}

export function showCurrentPlayer() {
    const currentPlayerImg = document.getElementById(
        "current-player"
    ) as HTMLImageElement;

    currentPlayerImg.src =
        playerImages[gameState.selectedTheme][gameState.selectedPlayer];
}

export function switchPlayer() {
    gameState.selectedPlayer = gameState.selectedPlayer === "blue" ? "orange" : "blue";
    showCurrentPlayer();
}

function updateScoreDisplay() {
    setScore("blue-score", gameState.blueScore);
    setScore("orange-score", gameState.orangeScore);
    setScore("game-over-blue-score", gameState.blueScore);
    setScore("game-over-orange-score", gameState.orangeScore);
}

function setScore(id: string, score: number) {
    const element = document.getElementById(id);
    if (!element) return;

    element.textContent = score.toString();
}

export function addPlayerScore() {
    if (gameState.selectedPlayer === "blue") {
        gameState.blueScore++;
    } else {
        gameState.orangeScore++;
    }

    updateScoreDisplay();
}

export function resetScores() {
    gameState.blueScore = 0;
    gameState.orangeScore = 0;
    updateScoreDisplay();
}