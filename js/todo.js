import { fillEditForm, initializeEdit } from "./edit.js";
import { startDueLabelUpdate, stopDueLabelUpdate } from "./time.js";
import { showEditMode } from "./uiState.js";

const todoStatusElem = document.querySelector(".todo-status");
const taskElem = document.querySelector(".todo-title");
const inputElem = document.querySelector("#checkbox");
const dueLabelElem = document.querySelector(".remaining-time");

export function enhancePriority() {
  const priorityElem = document.querySelector(".priority");
  const todoContainer = document.querySelector(".todo-card");

  if (priorityElem.textContent.trim() === "Low") {
    if (priorityElem.classList.contains("high-priority-pill")) {
      priorityElem.classList.remove("high-priority-pill");
    }
    if (todoContainer.classList.contains("high-priority")) {
      todoContainer.classList.remove("high-priority");
    }
    if (priorityElem.classList.contains("medium-priority-pill")) {
      priorityElem.classList.remove("medium-priority-pill");
    }
    if (todoContainer.classList.contains("medium-priority")) {
      todoContainer.classList.remove("medium-priority");
    }
    todoContainer.classList.add("low-priority");
    priorityElem.classList.add("low-priority-pill");
  } else if (priorityElem.textContent.trim() === "Medium") {
    if (priorityElem.classList.contains("high-priority-pill")) {
      priorityElem.classList.remove("high-priority-pill");
    }
    if (todoContainer.classList.contains("high-priority")) {
      todoContainer.classList.remove("high-priority");
    }
    if (priorityElem.classList.contains("low-priority-pill")) {
      priorityElem.classList.remove("low-priority-pill");
    }
    if (todoContainer.classList.contains("low-priority")) {
      todoContainer.classList.remove("low-priority");
    }
    priorityElem.classList.add("medium-priority-pill");
    todoContainer.classList.add("medium-priority");
  } else if (priorityElem.textContent.trim() === "High") {
    if (priorityElem.classList.contains("medium-priority-pill")) {
      priorityElem.classList.remove("medium-priority-pill");
    }
    if (todoContainer.classList.contains("medium-priority")) {
      todoContainer.classList.remove("medium-priority");
    }
    if (priorityElem.classList.contains("low-priority-pill")) {
      priorityElem.classList.remove("low-priority-pill");
    }
    if (todoContainer.classList.contains("low-priority")) {
      todoContainer.classList.remove("low-priority");
    }

    todoContainer.classList.add("high-priority");
    priorityElem.classList.add("high-priority-pill");
  }
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
