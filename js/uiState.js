const todoCardWrapperElem = document.querySelector(".todo-card-wrapper");
const editFormElem = document.querySelector(".edit-container");

export function showEditMode() {
  todoCardWrapperElem.classList.add("isHidden");
  editFormElem.classList.add("isEditing");
}

export function showViewMode() {
  todoCardWrapperElem.classList.remove("isHidden");
  editFormElem.classList.remove("isEditing");
}
