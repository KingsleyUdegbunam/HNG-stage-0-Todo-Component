const todoStatusElem = document.querySelector(".todo-status");
const taskElem = document.querySelector(".todo-title");
const inputElem = document.querySelector("#checkbox");

function handleTaskCompletion() {
  taskElem.classList.toggle("completed-title-style");
  todoStatusElem.classList.toggle("completed-status");

  todoStatusElem.textContent = inputElem.checked ? "Done" : "In Progress";
}

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
