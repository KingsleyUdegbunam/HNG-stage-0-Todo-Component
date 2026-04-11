import { startDueLabelUpdate, stopDueLabelUpdate } from "./time.js";

const todoStatusElem = document.querySelector(".todo-status");
const taskElem = document.querySelector(".todo-title");
const inputElem = document.querySelector("#checkbox");
const dueLabelElem = document.querySelector(".remaining-time");

export function handleTaskCompletion() {
  taskElem.classList.toggle("completed-title-style");
  todoStatusElem.classList.toggle("completed-status");

  const isCompleted = inputElem.checked;
  if (isCompleted) {
    stopDueLabelUpdate();
    dueLabelElem.classList.add("end-timer");
  } else {
    startDueLabelUpdate();
    dueLabelElem.classList.remove("end-timer");
  }
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
