const todoCardElem = document.querySelector(".todo-card");
const editFormElem = document.querySelector(".edit-container");

export function showEditMode() {
  todoCardElem.classList.add("isHidden");
  editFormElem.classList.add("isEditing");
}

export function showViewMode() {
  todoCardElem.classList.remove("isHidden");
  editFormElem.classList.remove("isEditing");
}
