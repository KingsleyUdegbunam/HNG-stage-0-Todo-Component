import { stopDueLabelUpdate } from "./time.js";

const todoStatusElem = document.querySelector(".todo-status");
const taskElem = document.querySelector(".todo-title");
const inputElem = document.querySelector("#checkbox");

export function handleTaskCompletion() {
  taskElem.classList.toggle("completed-title-style");
  todoStatusElem.classList.toggle("completed-status");

  todoStatusElem.textContent = inputElem.checked ? "Done" : "In Progress";
}

export function handleButtonClick(e) {
  const button = e.target.closest("button");

  if (!button) return;
  if (button.classList.contains("edit-todo")) {
    console.log("edit clicked");
  } else if (button.classList.contains("delete-todo")) {
    stopDueLabelUpdate();
    alert("Delete clicked");
  }
}
