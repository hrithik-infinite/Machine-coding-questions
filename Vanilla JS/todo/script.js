document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("todo-form");
  const list = document.getElementById("todo-list");
  const button = document.getElementById("todo-button");
  const input = document.getElementById("todo-input");
  let editMode = false;
  let editItem;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const val = input.value.trim();
    if (val !== "") {
      if (editMode) {
        editItem.firstChild.textContent = val;
        button.innerText = "Add Task";
        editItem = null;
        editMode = false;
      } else {
        addItem(val);
      }
      input.value = "";
    }
  });

  function addItem(val) {
    const item = document.createElement("li");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    item.innerText = val;
    editBtn.innerText = "✏️";
    deleteBtn.innerText = "❌";
    item.appendChild(editBtn);
    item.appendChild(deleteBtn);
    list.appendChild(item);
  }

  list.addEventListener("click", function (e) {
    const elem = e.target;
    if (elem.tagName === "BUTTON") {
      const item = elem.parentNode;
      if (elem.innerText === "❌") {
        item.remove();
      } else if (elem.innerText === "✏️") {
        editMode = true;
        editItem = item;
        button.innerText = "Edit Task";
        input.value = item.firstChild.textContent;
        input.focus();
      }
    }
  });
});
