import { resetScores } from "../game/player";

export function initNavigation() {
    document.getElementById("exit-select-btn")
        ?.addEventListener("click", exitGame);

    document.getElementById("exit-btn")
        ?.addEventListener("click", showExitScreen);

    document.getElementById("back-btn")
        ?.addEventListener("click", backToGame);
}

function exitGame() {
    const exitScreen = document.getElementById("exit-select-screen");
    exitScreen?.classList.remove("active");
    document.getElementById("game-screen")?.classList.add("d-none");
    document.getElementById("settings-screen")?.classList.remove("d-none");
    resetScores();
}

function showExitScreen() {
    const exitScreen = document.getElementById("exit-select-screen");
    exitScreen?.classList.add("active");
}

function backToGame() {
    const exitScreen = document.getElementById("exit-select-screen");
    exitScreen?.classList.remove("active");
}

