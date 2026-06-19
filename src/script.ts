document.getElementById("start-btn")?.addEventListener("click", () => {
    document.getElementById("start-screen")?.classList.add("d-none");
    document.getElementById("settings-screen")?.classList.remove("d-none");
});

document.getElementById("start-game-btn")?.addEventListener("click", () => {
    document.getElementById("settings-screen")?.classList.add("d-none");
    document.getElementById("game-screen")?.classList.remove("d-none");
    console.log("geklickt")
});

export function initGame() {
    renderCards()
}

function renderCards() {
    const fieldRef = document.getElementById('field')
    if (fieldRef) {
        for (let i = 15; i > 0; i--) {
            const card = document.createElement("button");
            card.classList.add("card");
            card.innerHTML = `
                    <div class="card__inner">
                        <div class="card__face"></div>
                        <div class="card__face card__face--back"></div>
                    </div>`;

            fieldRef.appendChild(card);
        }
    }
}

function changeTheme() {
    const previews = document.querySelectorAll(".theme-preview img");
    const radioInputs = document.querySelectorAll(".radio-option");
    let selectedImage = 0;

    radioInputs.forEach((radio, i) => {
        radio.addEventListener("mouseenter", () => {
            previews.forEach((preview) => {
                preview.classList.remove("active");
            });
            previews[i].classList.add("active");
        });

        radio.addEventListener("mouseleave", () => {
            previews[selectedImage].classList.add("active");
        });

        radio.addEventListener("change", () => {
            selectedImage = i;
        });

    });
};

changeTheme();


const themes = ["Code Theme", "Gaming Theme", "DA Theme", "Food Theme"];
const players = ["Blue", "Orange"];
const boards = ["16 cards", "24 cards", "36 cards"];

function updateSelection(
    inputName: string,
    outputId: string,
    values: string[]
) {
    const inputs = document.querySelectorAll(`input[name="${inputName}"]`);
    const output = document.getElementById(outputId)!;

    inputs.forEach((input, i) => {
        input.addEventListener("change", () => {
            output.textContent = values[i];
        });
    });
}

updateSelection("theme", "theme", themes);
updateSelection("player", "player", players);
updateSelection("board", "board", boards);



const cards = [
    ""
]