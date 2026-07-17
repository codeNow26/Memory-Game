import { resetScores } from "../game/player";

/**
 * Initializes the navigation button event listeners.
 */
export function initNavigation() {
    document.getElementById("exit-select-btn")
        ?.addEventListener("click", exitGame);

    document.getElementById("exit-btn")
        ?.addEventListener("click", showExitScreen);

    document.getElementById("back-btn")
        ?.addEventListener("click", backToGame);
}

/**
 * Exits the game, returns to the settings screen and resets the scores.
 */
function exitGame() {
    const exitScreen = document.getElementById("exit-select-screen");
    exitScreen?.classList.remove("active");
    document.getElementById("game-screen")?.classList.add("d-none");
    document.getElementById("settings-screen")?.classList.remove("d-none");
    resetScores();
}

/**
 * Displays the exit confirmation screen.
 */
function showExitScreen() {
    const exitScreen = document.getElementById("exit-select-screen");
    exitScreen?.classList.add("active");
}

/**
 * Closes the exit confirmation screen and returns to the game.
 */
function backToGame() {
    const exitScreen = document.getElementById("exit-select-screen");
    exitScreen?.classList.remove("active");
}