import { gameState } from "../state/state";
import type { Board, Player, Theme } from "../types/gameTypes";

const themes = ["Code Theme", "Gaming Theme", "DA Theme", "Food Theme"];
const players = ["Blue", "Orange"];
const boards = ["16 Cards", "24 cards", "36 cards"];

export function initSettings() {
    updateSelection("theme", "theme", themes);
    updateSelection("player", "player", players);
    updateSelection("board", "board", boards);

    updateBoardSelection();
    updateThemeSelection();
    updatePlayerSelection();
}

function updateSelection(
    inputName: string,
    outputId: string,
    value: string[],
) {
    const inputs = document.querySelectorAll(`input[name="${inputName}"]`);
    const output = document.getElementById(outputId)!;

    inputs.forEach((input, i) => {
        input.addEventListener("change", () => {
            output.textContent = value[i];

        });
    });
}

function updateBoardSelection() {
    const boardInputs = document.querySelectorAll<HTMLInputElement>('input[name="board"]');

    boardInputs.forEach((input) => {
        input.addEventListener("change", () => {
            gameState.selectedBoardSize = Number(input.value) as Board;
            switchBoardSize();
        })
    });

}

function switchBoardSize() {
    const field = document.getElementById("field");
    if (!field) return;

    field.classList.remove("field--16", "field--24", "field--36");
    field.classList.add(`field--${gameState.selectedBoardSize}`);
}

function updateThemeSelection() {
    const themeInputs = document.querySelectorAll<HTMLInputElement>('input[name="theme"]');

    themeInputs.forEach((input) => {
        input.addEventListener("change", () => {
            gameState.selectedTheme = input.value as Theme;
        })
    });
}

function updatePlayerSelection() {
    const playerInputs = document.querySelectorAll<HTMLInputElement>('input[name="player"]');

    playerInputs.forEach((input) => {
        input.addEventListener("change", () => {
            gameState.selectedPlayer = input.value as Player;
        })
    });
}

export function changeBackground() {
    const screen = document.getElementById("game-screen")!;

    screen.classList.remove(
        "game-screen--da",
        "game-screen--coding",
        "game-screen--gaming",
        "game-screen--foods"
    );

    screen.classList.add(
        `game-screen--${gameState.selectedTheme}`
    );
}