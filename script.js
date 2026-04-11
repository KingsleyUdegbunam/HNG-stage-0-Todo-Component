import dayjs from "https://esm.sh/dayjs";
import utc from "https://esm.sh/dayjs/plugin/utc";
dayjs.extend(utc);

// GET ELEMENTS
const dueTimeElem = document.querySelector(".due-date");
const timeLeftElem = document.querySelector(".remaining-time");
const taskElem = document.querySelector(".todo-title");
const inputElem = document.querySelector("#checkbox");
const todoStatusElem = document.querySelector(".todo-status");
const buttonContainerElem = document.querySelector(".buttons");

// TIME LOGIC
const dueLocalTime = dayjs("2026-04-16 23:59", "YYYY-MM-DD HH:mm");
const utcTime = dueLocalTime.utc().format();

dueTimeElem.setAttribute("datetime", utcTime);

const dueTimeFormatted = dayjs(utcTime).format("MMM DD,YYYY HH:mm");

const dueTimeHTML = `Due ${dueTimeFormatted}`;
dueTimeElem.innerHTML = dueTimeHTML;

function getDueLabel() {
  const due = dayjs(utcTime);

  const today = dayjs();
  const minuteLeft = due.diff(today, "minute");
  if (minuteLeft < 0) {
    const abs = Math.abs(minuteLeft);
    if (abs >= 60) {
      const hours = Math.round(abs / 60);
      timeLeftElem.textContent = `Overdue ${hours} hour${hours > 1 ? "s" : ""}`;
    } else {
      const mins = Math.round(abs);
      timeLeftElem.textContent = `Overdue ${mins} min${mins > 1 ? "s" : ""}`;
    }
  } else if (minuteLeft <= 5) {
    timeLeftElem.textContent = "Due now";
  } else if (minuteLeft <= 30) {
    const mins = Math.round(minuteLeft);
    timeLeftElem.textContent = `Due in ${mins} mins`;
  } else if (minuteLeft <= 60) {
    timeLeftElem.textContent = "Due soon";
  } else if (minuteLeft <= 1440) {
    timeLeftElem.textContent = "Today";
  } else if (minuteLeft <= 2880) {
    timeLeftElem.textContent = "Tomorrow";
  } else {
    timeLeftElem.textContent = `${Math.round(minuteLeft / 1440)} days left`;
  }

  console.log(minuteLeft);
}

getDueLabel();

const intervalId = setInterval(getDueLabel, 60000);

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
    clearInterval(intervalId);
    alert("Delete clicked");
  }
}

buttonContainerElem.addEventListener("click", handleButtonClick);
