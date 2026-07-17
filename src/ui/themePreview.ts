import { gameState } from "../state/state";

export function initThemePreview() {
    const previews = document.querySelectorAll<HTMLImageElement>(
        ".theme-preview img"
    );

    addPreviewHoverEvents(previews);
    addThemeSelectionEvents();
}

function addPreviewHoverEvents(
    previews: NodeListOf<HTMLImageElement>
) {
    const options = document.querySelectorAll(
        ".theme-options .radio-option"
    );

    options.forEach((option, index) => {
        option.addEventListener("mouseenter", () => {
            showThemePreview(previews, index);
        });

        option.addEventListener("mouseleave", () => {
            showThemePreview(previews, gameState.selectedThemeImage);
        });
    });
}

function addThemeSelectionEvents() {
    const radios = document.querySelectorAll<HTMLInputElement>(
        'input[name="theme"]'
    );

    radios.forEach((radio, index) => {
        radio.addEventListener("change", () => {
            gameState.selectedThemeImage = index;
        });
    });
}

function showThemePreview(
    previews: NodeListOf<HTMLImageElement>,
    index: number
) {
    previews.forEach(preview => {
        preview.classList.remove("active");
    });

    previews[index]?.classList.add("active");
}