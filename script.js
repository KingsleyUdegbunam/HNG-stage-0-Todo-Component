import dayjs from "https://esm.sh/dayjs";
import utc from "https://esm.sh/dayjs/plugin/utc";
dayjs.extend(utc);

const dueTimeElem = document.querySelector(".due-date");
const taskElem = document.querySelector(".todo-title");
const inputElem = document.querySelector("#checkbox");
const todoStatusElem = document.querySelector(".todo-status");

const buttonContainerElem = document.querySelector(".buttons");

const dueLocalTime = dayjs("2026-04-16 23:59", "YYYY-MM-DD HH:mm");
const utcTime = dueLocalTime.utc().format();

dueTimeElem.setAttribute("datetime", utcTime);

const dueTimeFormatted = dayjs(utcTime).format("MMM DD,YYYY HH:mm");

const dueTimeHTML = `Due ${dueTimeFormatted}`;

dueTimeElem.innerHTML = dueTimeHTML;

function handleTaskCompletion() {
  taskElem.classList.toggle("completed-title-style");
  todoStatusElem.classList.toggle("completed-status");

  todoStatusElem.textContent = inputElem.checked ? "Done" : "In Progress";
}

inputElem.addEventListener("change", () => {
  handleTaskCompletion();
});

function handleButtonClick(e) {
  const button = e.target.closest("button");

  if (!button) return;
  if (button.classList.contains("edit-todo")) {
    console.log("edit clicked");
  } else if (button.classList.contains("delete-todo")) {
    alert("Delete clicked");
  }
}

buttonContainerElem.addEventListener("click", handleButtonClick);
