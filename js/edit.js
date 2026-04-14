import { showViewMode } from "./uiState.js";

const form = document.querySelector(".edit-container");

export function handleFormSubmission() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    showViewMode();
  });
}
