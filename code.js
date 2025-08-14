let input = document.getElementById("inpt-todo");
let ul = document.querySelector("ul");
function loadFunction() {
  if (localStorage.getItem("to-do-list") != null) {
    let str = localStorage.getItem("to-do-list");
    let js = JSON.parse(str);
    if (js == null) return;

    for (let i = 0; i < js.length; i++) {
      let li = document.createElement("li");
      li.innerHTML = `<span onclick="toggleDone(this)">${js[i].name}</span>
        <span class="delete" onclick="deleteTodo(this)">🗑</span>`;
      li.children[0].classList.add(js[i].status);
      ul.appendChild(li);
    }
  }
}
function Update_Todo() {
  let new_todo = [];
  for (let i = 0; i < ul.childElementCount; i++) {
    let obj;
    if (ul.children[i].children[0].classList.contains("done"))
      obj = { name: ul.children[i].childNodes[0].innerHTML, status: "done" };
    else obj = { name: ul.children[i].childNodes[0].innerHTML, status: "no" };
    new_todo.push(obj);
  }

  localStorage.setItem("to-do-list", JSON.stringify(new_todo));
}

function addTodo() {
  let li = document.createElement("li");
  let text = input.value.trim();
  if (text == "") return;
  li.innerHTML = `<span onclick="toggleDone(this)">${text}</span>
        <span class="delete" onclick="deleteTodo(this)">🗑</span>`;
  ul.appendChild(li);
  Update_Todo();
  input.value = "";
}
function deleteTodo(el) {
  let key = el.parentElement.id;
  localStorage.removeItem(key);
  el.parentElement.remove();
  Update_Todo();
}
function toggleDone(el) {
  el.classList.toggle("done");
  Update_Todo();
}
