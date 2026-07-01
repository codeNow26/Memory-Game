import { codingCards, gamingCards, DACards, foodCards, cardBacks, playerImages } from "./data/cardThemes";
const fieldRef = document.getElementById('field');
let firstCard = null;
let secondCard = null;
document.getElementById("exit-select-btn")?.addEventListener("click", exitGame);
document.getElementById("exit-btn")?.addEventListener("click", showExitScreen);
document.getElementById("back-btn")?.addEventListener("click", backToGame);

document.getElementById("start-btn")?.addEventListener("click", () => {
    document.getElementById("start-screen")?.classList.add("d-none");
    document.getElementById("settings-screen")?.classList.remove("d-none");
});

document.getElementById("start-game-btn")?.addEventListener("click", () => {
    document.getElementById("settings-screen")?.classList.add("d-none");
    document.getElementById("game-screen")?.classList.remove("d-none");
    initGame();
});

function initGame() {
    const images = getCardFrontImages(selectedBoard)
    renderCards(selectedBoard);
    renderCardFront(selectedBoard);
    renderCardBack();
    showCurrentPlayer();
    showPlayerImages();
}

if (fieldRef) {
    let isChecking = false;

    fieldRef.addEventListener("click", e => {
        if (isChecking === true) {
            return;
        }

        let card = (e.target as HTMLElement).closest(".card") as HTMLButtonElement;

        if (card) {

            if (card === firstCard) {
                return;
            }

            card.classList.add("is-flipped");

            if (!firstCard) {
                firstCard = card;
            } else {
                secondCard = card;
            }


            if (firstCard && secondCard) {
                 isChecking = true;
                const firstCardImage = firstCard.getAttribute("data-card");
                const secondCardImage = secondCard.getAttribute("data-card");

                if (firstCardImage === secondCardImage) {
                    firstCard = null;
                    secondCard = null;
                    isChecking = false;
                } else {
                    setTimeout(() => {
                        firstCard.classList.remove("is-flipped");
                        secondCard.classList.remove("is-flipped");

                        firstCard = null;
                        secondCard = null;
                         isChecking = false;
                    }, 1000);
                }
            }
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

function getCardFrontImages(selectedBoard: number) {
    const pairs = selectedBoard / 2;

    const fronts = {
        coding: codingCards,
        gaming: gamingCards,
        da: DACards,
        foods: foodCards
    };

    const selectedImages = fronts[selectedTheme].slice(0, pairs);
    return [...selectedImages, ...selectedImages.sort(() => Math.random() - 0.5)];

}

function renderCardBack() {
    const cardFaces = document.querySelectorAll<HTMLElement>(".card__face--front");

    cardFaces.forEach((card) => {
        card.style.backgroundImage = `url("${cardBacks[selectedTheme]}")`;
    });
}

function renderCardFront(selectedBoard: number) {
    const images = getCardFrontImages(selectedBoard);
    const cardFront = document.querySelectorAll<HTMLElement>(".card__face--back");
    cardFront.forEach((card, i,) => {

        const cardElement = cardFront[i].closest(".card");
        cardElement?.setAttribute("data-card", images[i]);
        card.style.backgroundImage = `url("${images[i]}")`;
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

function exitGame() {
    const exitScreen = document.getElementById("exit-select-screen");
    exitScreen?.classList.remove("active");
    document.getElementById("game-screen")?.classList.add("d-none");
    document.getElementById("settings-screen")?.classList.remove("d-none");
}

function showExitScreen() {
    const exitScreen = document.getElementById("exit-select-screen");
    exitScreen?.classList.add("active");
}

function backToGame() {
    const exitScreen = document.getElementById("exit-select-screen");
    exitScreen?.classList.remove("active");
}

function showPlayerImages() {
    const bluePlayerImg = document.getElementById("blue-player-img") as HTMLImageElement;
    const orangePlayerImg = document.getElementById("orange-player-img") as HTMLImageElement;

    bluePlayerImg.src = playerImages[selectedTheme].blue;
    orangePlayerImg.src = playerImages[selectedTheme].orange;
}

function showCurrentPlayer() {
    const currentPlayerImg = document.getElementById("current-player") as HTMLImageElement;
    currentPlayerImg.src = playerImages[selectedTheme][selectedPlayer];
}

function switchPlayer() {
    selectedPlayer = selectedPlayer === "blue" ? "orange" : "blue";
    showCurrentPlayer();
}