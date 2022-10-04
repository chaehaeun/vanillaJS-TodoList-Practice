const todoUl = document.querySelector(".todoListCont ul");
const input = document.querySelector(".todoInput");
const inputForm = document.querySelector(".inputForm");
let index = 0;
let toDos = [];
const dataKey = "dataKey";

const savedTodo = localStorage.getItem(dataKey);
const loadedData = JSON.parse(savedTodo);
function setTodo(toDo) {
  const toDoObj = {
    txt: toDo,
    id: toDos.length + 1,
  };
  toDos.push(toDoObj);
  localStorage.setItem(dataKey, JSON.stringify(toDos));
}

function putValue(toDo) {
  const todoLi = document.createElement("li");
  todoLi.innerHTML = `
    <input type="checkbox" id="check${index}" value="${index}">
    <label for="check${index}"></label>
    <p>${toDo}</p>
    <i class="fa-sharp fa-solid fa-trash-can delIcon"></i>
  `;
  todoUl.append(todoLi);
  todoLi.setAttribute("id", `${toDos.length + 1}`);
  index++;
  todoLi.scrollIntoView({ block: "center" });
}

function addTodo(e) {
  e.preventDefault();
  const toDo = input.value;
  putValue(toDo);
  setTodo(toDo);
  input.value = "";
}

function loadSavedList() {
  if (savedTodo !== null) {
    loadedData.forEach((data) => {
      let txt = data.txt;
      putValue(txt);
      setTodo(txt);
    });
  }
}

todoUl.addEventListener("click", (e) => {
  if (e.target.classList.contains("delIcon")) {
    let tmp = [];
    e.target.parentElement.remove();
    for (let i = 0; i < toDos.length; i++) {
      if (toDos[i]["id"] !== Number(e.target.parentElement.id)) {
        tmp.push(toDos[i]);
      }
    }

    localStorage.setItem(dataKey, JSON.stringify(tmp));
  }
});

function init() {
  loadSavedList(); //
  inputForm.addEventListener("submit", addTodo);
}

init();
//1
