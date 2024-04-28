document.addEventListener("DOMContentLoaded", function () {
  const todoForm = document.querySelector(".todo-form");
  const todoinput = document.querySelector(".todo-input");
  const todobtn = document.querySelector(".todo-btn");
  const todolist = document.querySelector(".todo-list");
  let editMode = false;
  let editItem = null;
  todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const todoTxt = todoinput.value.trim();
    if (todoTxt !== "") {
      if (editMode) {
        editItem.firstChild.textContent = todoTxt;
        todobtn.innerText = "Add task";
        editItem = null;
        editMode = false;
      } else {
        addTodoItem(todoTxt);
      }
      todoinput.value = "";
    } else {
      alert("Enter valid task");
    }
  });
  todolist.addEventListener("click", function (event) {
    const target = event.target;
    if (target.tagName === "BUTTON") {
      const item = target.parentNode;
      if (target.innerText === "Delete") {
        item.remove();
      } else if (target.innerText === "Edit") {
        editMode = true;
        editItem = item;
        todobtn.innerText = "Edit task";
        todoinput.value = item.firstChild.textContent;
        todoinput.focus();
      }
    }
  });
  function addTodoItem(txt) {
    const todoItem = document.createElement("li");
    const todoedit = document.createElement("button");
    const todoDelete = document.createElement("button");

    todoItem.innerHTML = `<span>${txt}</span>`;
    todoedit.innerText = "Edit";
    todoDelete.innerText = "Delete";
    todoItem.appendChild(todoedit);
    todoItem.appendChild(todoDelete);
    todolist.appendChild(todoItem);
  }
});
