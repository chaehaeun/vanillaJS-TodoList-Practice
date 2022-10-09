const todoForm = document.querySelector(".inputForm");
const input = document.querySelector(".todoInput");
const todoCont = document.querySelector(".todoListCont ul");

const TODO_KEY = "todoKey";
let todos = [];

function saveTodo() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function delTodo(e) {
  const li = e.target.parentElement;
  li.remove();
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodo();
}

function paintTodo(todoObj) {
  const li = document.createElement("li");
  li.id = todoObj.id;
  li.innerHTML = `
    <input type="checkbox" id="check${li.id}" value="${li.id}">
    <label for="check${li.id}"></label>
    <p>${todoObj.name}</p>
  `;
  li.setAttribute("class", "todo_li");
  todoCont.appendChild(li);
  const button = document.createElement("i");
  button.setAttribute("class", "fa-sharp fa-solid fa-trash-can delIcon");
  li.appendChild(button);
  button.addEventListener("click", delTodo);
  todoForm.focus();
  li.scrollIntoView({ block: "center" });
}

function handleEvent(e) {
  e.preventDefault();
  const todoValue = input.value;
  input.value = "";
  const todoObj = {
    name: todoValue,
    id: Date.now(),
  };
  todos.push(todoObj);
  paintTodo(todoObj);
  saveTodo();
}

todoForm.addEventListener("submit", handleEvent);

const loadData = localStorage.getItem(TODO_KEY);

if (loadData !== null) {
  const savedTodo = JSON.parse(loadData);
  todos = savedTodo;
  savedTodo.forEach(paintTodo);
}
