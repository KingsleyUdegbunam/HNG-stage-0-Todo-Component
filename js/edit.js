import { showViewMode } from "./uiState.js";

const form = document.querySelector(".edit-container");

export function handleFormSubmission(onSave) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Get form values
    const formData = new FormData(form);

    const todo = {
      title: formData.get("edit-title"),
      description: formData.get("edit-desc"),
      priority: formData.get("edit-priority"),
      dueDate: formData.get("edit-due-date"),
    };

    // callback to hold updateTodo Function
    onSave(todo);
    //

    showViewMode();
  });
}
