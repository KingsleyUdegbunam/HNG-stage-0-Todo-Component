import { toDateTimeLocal } from "./time.js";
import { showViewMode } from "./uiState.js";

const form = document.querySelector(".edit-container");
const cancelBtn = document.querySelector(".edit-btn--cancel");

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

cancelBtn.addEventListener("click", () => {
  showViewMode();
});

export function initializeEdit() {
  const todoDetails = {
    title: document.querySelector(".todo-title").textContent,
    description: document.querySelector(".todo-desc").textContent,
    priority: document.querySelector(".priority").textContent,
    dueDate: document.querySelector(".due-date").getAttribute("datetime"),
  };

  return todoDetails;
}

export function fillEditForm(todoDetails) {
  document.querySelector("#edit-title").value = todoDetails.title;
  document.querySelector("#edit-desc").value = todoDetails.description;
  document.querySelector("#edit-priority").value = todoDetails.priority;
  document.querySelector("#edit-due-date").value = toDateTimeLocal(
    todoDetails.dueDate,
  );
}
