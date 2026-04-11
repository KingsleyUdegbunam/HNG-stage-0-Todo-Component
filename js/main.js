const inputElem = document.querySelector("#checkbox");
const buttonContainerElem = document.querySelector(".buttons");

inputElem.addEventListener("change", handleTaskCompletion);

buttonContainerElem.addEventListener("click", handleButtonClick);

getDueLabel();

const intervalId = setInterval(getDueLabel, 60000);
