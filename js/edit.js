const form = document.querySelector(".edit-container");

const todoCardElem = document.querySelector(".todo-card");
const editFormElem = document.querySelector(".edit-container");

export function handleFormSubmission() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    todoCardElem.classList.remove("isHidden");
    editFormElem.classList.remove("isEditing");
  });
}
