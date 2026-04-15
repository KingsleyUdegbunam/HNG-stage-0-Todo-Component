import { fillEditForm, initializeEdit } from "./edit.js";
import { startDueLabelUpdate, stopDueLabelUpdate } from "./time.js";
import { showEditMode } from "./uiState.js";

const todoStatusElem = document.querySelector(".todo-status");
const taskElem = document.querySelector(".todo-title");
const inputElem = document.querySelector("#checkbox");
const dueLabelElem = document.querySelector(".remaining-time");

const priorityElem = document.querySelector(".priority");
const todoContainer = document.querySelector(".todo-card");

function setPriority(level) {
  todoContainer.classList.remove(
    "low-priority",
    "medium-priority",
    "high-priority",
  );

  priorityElem.classList.remove(
    "low-priority-pill",
    "medium-priority-pill",
    "high-priority-pill",
  );

  todoContainer.classList.add(`${level}-priority`);
  priorityElem.classList.add(`${level}-priority-pill`);
}

export function enhancePriority() {
  const level = priorityElem.textContent.trim().toLowerCase();
  setPriority(level);
}

enhancePriority();

export function handleTaskCompletion() {
  taskElem.classList.toggle("completed-title-style");
  todoStatusElem.classList.toggle("completed-status");
  todoStatusElem.classList.toggle("stop-animation");

  dueLabelElem.classList.toggle("end-timer");

  const isCompleted = inputElem.checked;
  if (isCompleted) {
    todoStatusElem.textContent = "Done";
    stopDueLabelUpdate();
  } else {
    todoStatusElem.textContent = "In Progress";
    startDueLabelUpdate();
  }
}

export function handleButtonClick(e) {
  const button = e.target.closest("button");

  if (!button) return;
  if (button.classList.contains("edit-todo")) {
    console.log("edit clicked");
    showEditMode();
    fillEditForm(initializeEdit());
  } else if (button.classList.contains("delete-todo")) {
    stopDueLabelUpdate();
    alert("Delete clicked");
  }
}
