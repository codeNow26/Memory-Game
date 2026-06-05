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