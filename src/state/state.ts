import type { Board, Player, Theme } from "../types/gameTypes";

export const gameState = {
    firstCard: null as HTMLButtonElement | null,
    secondCard: null as HTMLButtonElement | null,
    blueScore: 0,
    orangeScore: 0,
    isChecking: false,
    selectedThemeImage: 0,
    selectedTheme: "coding" as Theme,
    selectedPlayer: "blue" as Player,
    selectedBoardSize: 16 as Board
};