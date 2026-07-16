import { codingCards, gamingCards, DACards, foodCards, cardBacks, playerImages } from "./data/cardThemes";
const fieldRef = document.getElementById('field');
let firstCard: HTMLButtonElement | null = null;
let secondCard: HTMLButtonElement | null = null;
document.getElementById("exit-select-btn")?.addEventListener("click", exitGame);
document.getElementById("exit-btn")?.addEventListener("click", showExitScreen);
document.getElementById("back-btn")?.addEventListener("click", backToGame);

document.getElementById("start-btn")?.addEventListener("click", () => {
    document.getElementById("start-screen")?.classList.add("d-none");
    document.getElementById("settings-screen")?.classList.remove("d-none");
});

document.getElementById("back-to-settings-btn")?.addEventListener("click", () => {
    document.getElementById("winner-screen")?.classList.add("d-none");
    document.getElementById("settings-screen")?.classList.remove("d-none");
});

document.getElementById("start-game-btn")?.addEventListener("click", () => {
    document.getElementById("settings-screen")?.classList.add("d-none");
    document.getElementById("game-screen")?.classList.remove("d-none");
    initGame();
});

function initGame() {
    renderCards(selectedBoardSize);
    renderCardFront(selectedBoardSize);
    renderCardBack();
    showCurrentPlayer();
    showPlayerImages();
    changeBackground();
}

if (fieldRef) {
    let isChecking = false;

    fieldRef.addEventListener("click", e => {
        if (isChecking) {
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
                const first = firstCard
                const second = secondCard
                if (firstCardImage === secondCardImage) {
                    addPlayerScore();

                    if (areAllCardsFlipped()) {
                        showGameOverScreen();
                    }
                    
                    firstCard.disabled = true;
                    secondCard.disabled = true;
                    
                    firstCard = null;
                    secondCard = null;
                    isChecking = false;
                } else {
                    switchPlayer();
                    setTimeout(() => {
                        first.classList.remove("is-flipped");
                        second.classList.remove("is-flipped");

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
    const pairedImages = [...selectedImages, ...selectedImages];
    return pairedImages.sort(() => Math.random() - 0.5);
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
            previews.forEach((preview) => {
                preview.classList.remove("active");
            });
            previews[selectedImage].classList.add("active");
        });
        radioInputs.forEach((radio, i) => {
            radio.addEventListener("change", () => {
                selectedImage = i;
            })
        });
    });
}

changeTheme();

function changeBackground() {
    const screen = document.getElementById("game-screen")!;

    screen.classList.remove("game-screen--da", "game-screen--coding", "game-screen--gaming", "game-screen--foods");
    screen.classList.add(`game-screen--${selectedTheme}`);
}

const themes = ["Code Theme", "Gaming Theme", "DA Theme", "Food Theme"];
const players = ["Blue", "Orange"];
const boards = ["16 Cards", "24 cards", "36 cards"]

type Theme = "coding" | "gaming" | "da" | "foods";
let selectedTheme: Theme = "coding";

type Player = "blue" | "orange";
let selectedPlayer: Player = "blue"

type Board = 16 | 24 | 36;
let selectedBoardSize: Board = 16;

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
            selectedBoardSize = Number(input.value) as Board;
            switchBoardSize();
        })
    });

}

function switchBoardSize() {
    const field = document.getElementById("field");
    if (!field) return;

    field.classList.remove("field--16", "field--24", "field--36");
    field.classList.add(`field--${selectedBoardSize}`);
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

function showPlayerImages() {
    const bluePlayerImg = document.getElementById("blue-player-img") as HTMLImageElement;
    const orangePlayerImg = document.getElementById("orange-player-img") as HTMLImageElement;
    const gameOverbluePlayerImg = document.getElementById("game-over-blue-player-img") as HTMLImageElement;
    const gameOverorangePlayerImg = document.getElementById("game-over-orange-player-img") as HTMLImageElement;

    bluePlayerImg.src = playerImages[selectedTheme].blue;
    orangePlayerImg.src = playerImages[selectedTheme].orange;
    gameOverbluePlayerImg.src = playerImages[selectedTheme].blue;
    gameOverorangePlayerImg.src = playerImages[selectedTheme].orange;
}

function showCurrentPlayer() {
    const currentPlayerImg = document.getElementById("current-player") as HTMLImageElement;
    currentPlayerImg.src = playerImages[selectedTheme][selectedPlayer];
}

function switchPlayer() {
    selectedPlayer = selectedPlayer === "blue" ? "orange" : "blue";
    showCurrentPlayer();
}

let blueScore: number = 0;
let orangeScore: number = 0;

function addPlayerScore() {
    if (selectedPlayer === "blue") {
        blueScore++;
        document.getElementById("blue-score")!.textContent = blueScore.toString();
    } else {
        orangeScore++;
        document.getElementById("orange-score")!.textContent = orangeScore.toString();
    }
}

function resetScores() {
    blueScore = 0;
    orangeScore = 0;
    document.getElementById("blue-score")!.textContent = blueScore.toString();
    document.getElementById("orange-score")!.textContent = orangeScore.toString();
}

function areAllCardsFlipped() {
    const cards = document.querySelectorAll(".card");
    return [...cards].every(card => card.classList.contains("is-flipped"));
}

function showGameOverScreen() {
    showGameOver();
    const gameOverScreen = document.getElementById("game-over-screen");
    gameOverScreen?.classList.remove("d-none");


    setTimeout(() => {
        gameOverScreen?.classList.add("d-none");
    showWinnerScreen();
    }, 3000);

}

function showGameOver() {
    const gameOverText = document.getElementById("game-over-text")!;
    if (blueScore > orangeScore) {
        gameOverText.textContent = "Blue Player Wins!";
    } else if (orangeScore > blueScore) {
        gameOverText.textContent = "Orange Player Wins!";
    } else {
        gameOverText.textContent = "It's a Tie!";
    }
}

function showWinnerScreen() {
    const winnerScreen = document.getElementById("winner-screen");
    winnerScreen?.classList.remove("d-none");
    showWinner();
}

function showWinner() {
    const winnerImg = document.getElementById("winner-img") as HTMLImageElement;
    const winnerText = document.getElementById("winner-text") as HTMLElement;
    const playerText = document.getElementById("draw-text") as HTMLElement;
    winnerText.innerHTML = "The winner is";
    playerText.className = "winner-screen__draw";

    if (blueScore > orangeScore) {
        winnerImg.src = playerImages[selectedTheme].blueWin;
        playerText.innerHTML = "Blue Player";
         playerText.classList.add("blue-player");
    } else if (orangeScore > blueScore) {
        winnerImg.src = playerImages[selectedTheme].orangeWin;
        playerText.innerHTML = "Orange Player";
         playerText.classList.add("orange-player");
    } else {
        winnerImg.src = playerImages[selectedTheme].draw;
        playerText.innerHTML = "DRAW";
        winnerText.innerHTML = "It's a";
           playerText.classList.add("draw-player");
    }
    resetScores();
}

