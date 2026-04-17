import { fillEditForm, initializeEdit } from "./edit.js";
import {
  startDueLabelUpdate,
  stopDueLabelUpdate,
  updateDueLabelOnce,
} from "./time.js";
import { showEditMode } from "./uiState.js";

const todoStatusElem = document.querySelector(".todo-status");
const taskElem = document.querySelector(".todo-title");
const inputElem = document.querySelector("#checkbox");
const dueLabelElem = document.querySelector(".remaining-time");

const priorityElem = document.querySelector(".priority");

const todoContainerWrapper = document.querySelector(".todo-card-wrapper");

const prioritySelector = document.querySelector(".status-selector");

function setPriority(level) {
  todoContainerWrapper.classList.remove(
    "low-priority",
    "medium-priority",
    "high-priority",
  );

  priorityElem.classList.remove(
    "low-priority-pill",
    "medium-priority-pill",
    "high-priority-pill",
  );

  todoContainerWrapper.classList.add(`${level}-priority`);
  priorityElem.classList.add(`${level}-priority-pill`);
}

export function enhancePriority() {
  const level = priorityElem.textContent.trim().toLowerCase();
  setPriority(level);
}

enhancePriority();

function selectPriority(e) {
  const button = e.target.closest("button");
  if (!button) return;

  const buttons = prioritySelector.querySelectorAll("button");

  buttons.forEach((button) =>
    button.classList.remove(
      "completed-status",
      "pending-select",
      "in-progress-select",
    ),
  );

  todoStatusElem.classList.remove(
    "completed-status",
    "pending-select",
    "in-progress-select",
  );

  dueLabelElem.classList.remove("end-timer");

  taskElem.classList.remove("completed-title-style");
  inputElem.checked = false;

  if (button.classList.contains("pending-status")) {
    button.classList.add("pending-select");
    todoStatusElem.classList.add("pending-select");
    todoStatusElem.textContent = button.textContent;
    updateDueLabelOnce();
    startDueLabelUpdate();
  } else if (button.classList.contains("in-progress-status")) {
    button.classList.add("in-progress-select");
    todoStatusElem.classList.add("in-progress-select");
    todoStatusElem.textContent = button.textContent;
    updateDueLabelOnce();
    startDueLabelUpdate();
  } else if (button.classList.contains("done-status")) {
    button.classList.add("completed-status");
    todoStatusElem.textContent = button.textContent;
    handleTaskCompletion("status");
  }
}

prioritySelector.addEventListener("click", (e) => {
  selectPriority(e);
});

const doneStatusElem = document.querySelector(".done-status");
const inProgressStatusElem = document.querySelector(".in-progress-status");
const pendingStatusElem = document.querySelector(".pending-status");

function remmoveStatusIndicator() {
  todoStatusElem.classList.remove(
    "completed-status",
    "pending-select",
    "in-progress-select",
  );

  pendingStatusElem.classList.remove("pending-select");
  inProgressStatusElem.classList.remove("in-progress-select");
  doneStatusElem.classList.remove("completed-status");
}

export function handleTaskCompletion(method) {
  if (method === "checkbox") {
    const isCompleted = inputElem.checked;
    if (isCompleted) {
      taskElem.classList.add("completed-title-style");

      remmoveStatusIndicator();

      todoStatusElem.textContent = "Done";
      todoStatusElem.classList.add("completed-status");
      doneStatusElem.classList.add("completed-status");
      dueLabelElem.classList.add("end-timer");

      dueLabelElem.textContent = "Completed";
      stopDueLabelUpdate();
    } else {
      remmoveStatusIndicator();

      taskElem.classList.remove("completed-title-style");
      todoStatusElem.textContent = "Pending";

      pendingStatusElem.classList.add("pending-select");
      todoStatusElem.classList.add("pending-select");

      dueLabelElem.classList.remove("end-timer");
      updateDueLabelOnce();
      startDueLabelUpdate();
    }
  } else if (method === "status") {
    if (inputElem.checked) return;
    inputElem.checked = true;
    taskElem.classList.add("completed-title-style");
    todoStatusElem.classList.add("completed-status");

    dueLabelElem.textContent = "Completed";
    stopDueLabelUpdate();
    dueLabelElem.classList.add("end-timer");
  }
}

export function handleButtonClick(e) {
  const button = e.target.closest("button");

  if (!button) return;
  if (button.classList.contains("edit-todo")) {
    console.log("edit clicked");
    showEditMode();
    resetToggle();
    fillEditForm(initializeEdit());
  } else if (button.classList.contains("delete-todo")) {
    stopDueLabelUpdate();
    alert("Delete clicked");
  }
}

const container = document.querySelector(".collapsible-container");
const text = document.querySelector(".todo-desc");
const btn = document.querySelector(".expand-toggle");

btn.addEventListener("click", () => {
  const isExpanded = container.classList.toggle("expanded");
  btn.textContent = isExpanded ? "Read less" : "Read more";
});

export function toggleDescCollapse() {
  const containerHeight = container.clientHeight;
  const textHeight = text.scrollHeight;

  if (textHeight > containerHeight) {
    btn.classList.add("isVisible");
  }
}

export function resetToggle() {
  container.classList.remove("expanded");
  btn.classList.remove("isVisible");
  console.log("reset");
}

toggleDescCollapse();
