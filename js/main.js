import { handleButtonClick, handleTaskCompletion } from "./todo.js";
import { getDueLabel, startDueLabelUpdate } from "./time.js";
import { handleFormSubmission } from "./edit.js";

const inputElem = document.querySelector("#checkbox");
const buttonContainerElem = document.querySelector(".buttons");

inputElem.addEventListener("change", handleTaskCompletion);

buttonContainerElem.addEventListener("click", handleButtonClick);

getDueLabel();
startDueLabelUpdate();
handleFormSubmission();
