import { handleButtonClick, handleTaskCompletion } from "./todo.js";
import { getDueLabel, startDueLabelUpdate } from "./time.js";
import { handleFormSubmission } from "./edit.js";

const inputElem = document.querySelector("#checkbox");
const buttonContainerElem = document.querySelector(".buttons");

inputElem.addEventListener("change", handleTaskCompletion);

buttonContainerElem.addEventListener("click", handleButtonClick);

function updateTodoCard(todo) {
  document.querySelector(".todo-title").textContent = todo.title;
  document.querySelector(".todo-desc").textContent = todo.description;
  document.querySelector(".priority").textContent = todo.priority;
  document.querySelector(".due-date").textContent = todo.dueDate;
  document.querySelector(".due-date").setAttribute("datetime", todo.dueDate);
}

getDueLabel();
startDueLabelUpdate();

handleFormSubmission((todo) => {
  updateTodoCard(todo);
});
