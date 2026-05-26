import '../scss/main.scss';

init()

function init() {
const fieldRef = document.getElementById('field')
if (fieldRef) {
    fieldRef.addEventListener("click", e => {
        const card = (e.target as HTMLElement).closest(".card") as HTMLButtonElement // der nächstbeste der die class "card" hat, wird benutzt
        if (card) {
            card.classList.toggle("is-flipped")
        }
    })
}
}
