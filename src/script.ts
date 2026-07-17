import { gameState } from "./state/state";

import {
    renderCards,
    renderCardFront,
    renderCardBack
} from "./game/cards";

import {
    showCurrentPlayer,
    showPlayerImages
} from "./game/player";

import { initCardClickListener } from "./game/cardInteraction";
import { initSettings, changeBackground } from "./ui/settings";
import { initThemePreview } from "./ui/themePreview";
import { initNavigation } from "./ui/navigation";

function init() {
    initCardClickListener();
    initThemePreview();
    initSettings();
    initNavigation();
}

init();

document.getElementById("start-btn")?.addEventListener("click", () => {
    document.getElementById("start-screen")?.classList.add("d-none");
    document.getElementById("settings-screen")?.classList.remove("d-none");
});

document.getElementById("back-to-settings-btn")?.addEventListener("click", () => {
    document.getElementById("winner-screen")?.classList.add("d-none");
    document.getElementById("game-screen")?.classList.add("d-none");
    document.getElementById("settings-screen")?.classList.remove("d-none");
});

document.getElementById("start-game-btn")?.addEventListener("click", () => {
    document.getElementById("settings-screen")?.classList.add("d-none");
    document.getElementById("game-screen")?.classList.remove("d-none");
    initGame();
});

function initGame() {
    renderCards(gameState.selectedBoardSize);
    renderCardFront(gameState.selectedBoardSize);
    renderCardBack();
    showCurrentPlayer();
    showPlayerImages();
    changeBackground();
}