const todoUl = document.querySelector(".todoListCont ul");
const input = document.querySelector(".todoInput");
const inputForm = document.querySelector(".inputForm");
let index = 0;

function onAdd() {
  if (input.value == "") {
    input.focus();
    return;
  }
  const todoLi = document.createElement("li");
  todoLi.innerHTML = `
    <input type="checkbox" id="check${index}" value="${index}">
    <label for="check${index}"></label>
    <p>${input.value}</p>
    <i class="fa-sharp fa-solid fa-trash-can delIcon"></i>
  `;
  todoUl.append(todoLi);
  input.value = null;
  todoLi.scrollIntoView({ block: "center" });
  index++;
}

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  onAdd();
});

todoUl.addEventListener("click", (e) => {
  if (e.target.classList.contains("delIcon")) {
    e.target.parentElement.remove();
  }
});

// 1. 인풋이 서브밋 됐을 때
// 2. 템플릿을 넣어줘(인풋값도 같이 들어가지게)
// 3. 스크롤바 내려가면 같이 시점 따라가게 해줘
// 4. 쓰레기통 버튼 누르면 하나씩 삭제 시켜줘
