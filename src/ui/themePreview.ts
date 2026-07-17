import { gameState } from "../state/state";

/**
 * Initializes the theme preview and its event listeners.
 */
export function initThemePreview() {
    const previews = document.querySelectorAll<HTMLImageElement>(
        ".theme-preview img"
    );

    addPreviewHoverEvents(previews);
    addThemeSelectionEvents();
}

/**
 * Adds hover events to the theme options.
 * @param previews - The available theme preview images.
 */
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

/**
 * Updates the selected theme when a radio button changes.
 */
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

/**
 * Displays the preview image at the given index.
 * @param previews - The available theme preview images.
 * @param index - The index of the preview to display.
 */
function showThemePreview(
    previews: NodeListOf<HTMLImageElement>,
    index: number
) {
    previews.forEach(preview => {
        preview.classList.remove("active");
    });

    previews[index]?.classList.add("active");
}