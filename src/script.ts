import { codingCards, gamingCards, DACards, foodCards, cardBacks } from "./data/cardThemes";

function initGame() {
    renderCards(selectedBoard);
    renderCardFront();
    renderCardBack();
}

document.getElementById("start-btn")?.addEventListener("click", () => {
    document.getElementById("start-screen")?.classList.add("d-none");
    document.getElementById("settings-screen")?.classList.remove("d-none");
});

document.getElementById("start-game-btn")?.addEventListener("click", () => {
    document.getElementById("settings-screen")?.classList.add("d-none");
    document.getElementById("game-screen")?.classList.remove("d-none");
    initGame();
});

const fieldRef = document.getElementById('field');

if (fieldRef) {
    fieldRef.addEventListener("click", e => {
        const card = (e.target as HTMLElement).closest(".card") as HTMLButtonElement;

        if (card) {
            card.classList.toggle("is-flipped");
        }
    });
}

function renderCards(selectedBoard: number) {
    const fieldRef = document.getElementById('field')!;
    fieldRef.innerHTML = "";
    if (fieldRef) {
        for (let i = selectedBoard; i > 0; i--) {
            const card = document.createElement("button");
            card.classList.add("card");
            card.innerHTML = `
                    <div class="card__inner">
                        <div class="card__face card__face--front"></div>
                        <div class="card__face card__face--back"></div>
                    </div>`;

            fieldRef.appendChild(card);
        }
    }
}

function renderCardBack() {
    const cardFaces = document.querySelectorAll<HTMLElement>(".card__face--front");

    cardFaces.forEach((card) => {
        card.style.backgroundImage = `url("${cardBacks[selectedTheme]}")`;
    });
}

function renderCardFront() {
    const gamingFront = gamingCards.concat(gamingCards);
    const daFront = DACards.concat(DACards);
    const foodFront = foodCards.concat(foodCards);
    const codingFront = codingCards.concat(codingCards);

    const fronts = {
        coding: codingFront,
        gaming: gamingFront,
        da: daFront,
        foods: foodFront
    };

    const cardFront = document.querySelectorAll<HTMLElement>(".card__face--back");
    cardFront.forEach((card, i) => {

        card.style.backgroundImage = `url("${fronts[selectedTheme][i]}")`;
    })
}

function changeTheme() {
    const previews = document.querySelectorAll(".theme-preview img");
    const radioInputs = document.querySelectorAll('input[name="theme"]');
    const themePreview = document.querySelectorAll(".theme-options .radio-option")
    let selectedImage = 0;

    themePreview.forEach((radio, i) => {
        radio.addEventListener("mouseenter", () => {
            previews.forEach((preview) => {
                preview.classList.remove("active");
            });
            previews[i].classList.add("active");
        });

        radio.addEventListener("mouseleave", () => {
            previews[selectedImage].classList.add("active");
        });
    });
    radioInputs.forEach((radio, i) => {
        radio.addEventListener("change", () => {
            selectedImage = i;
        })
    });
};

changeTheme();

const themes = ["Code Theme", "Gaming Theme", "DA Theme", "Food Theme"];
const players = ["Blue", "Orange"];
const boards = ["16 Cards", "24 cards", "36 cards"]

let selectedBoard = 16;

type Theme = "coding" | "gaming" | "da" | "foods";
let selectedTheme: Theme = "coding";

type Player = "blue" | "orange";
let selectedPlayer: Player = "blue"

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
            selectedBoard = Number(input.value);
        })
    });
}

function updateThemeSelection() {
    const themeInputs = document.querySelectorAll<HTMLInputElement>('input[name="theme"]');

    themeInputs.forEach((input) => {
        input.addEventListener("change", () => {
            selectedTheme = input.value as Theme;
        })
    });
}

function updatePlayerSelection() {
    const playerInputs = document.querySelectorAll<HTMLInputElement>('input[name="player"]');

    playerInputs.forEach((input) => {
        input.addEventListener("change", () => {
            selectedPlayer = input.value as Player;
        })
    });
}

updateSelection("theme", "theme", themes);
updateSelection("player", "player", players);
updateSelection("board", "board", boards);
updateBoardSelection();
updateThemeSelection();
updatePlayerSelection()
