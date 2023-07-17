// Selecteurs
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")
//Ecouteurs
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("input", filterTodo)

//Fonctions
function addTodo(event){
    event.preventDefault();
    //Todo DIV
    const todoDIV = document.createElement("div");
    todoDIV.classList.add("todo");
    //Création du li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDIV.appendChild(newTodo);
    // Ajouter la todo au localstorage
    saveLocalTodos(todoInput.value);
    //Bouton Check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDIV.appendChild(completedButton);
    //Bouton delete
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDIV.appendChild(trashButton);
    //Ajouter notre todo à notre todo-list
    todoList.appendChild(todoDIV);
    todoInput.value="";
}

function deleteCheck(e) {
    const item = e.target;
    //Delete todo
    if(item.classList.contains("trash-btn")) {
        const todo = item.parentElement;
        todo.addEventListener("transitionned", function() {
            todo.remove();
        });
        todo.remove();
    }
    //Check todo
    if(item.classList.contains("complete-btn")) {
        const todo = item.parentElement;
        todo.classList.toggle("completed-check");
        item.remove();
    }
}

function filterTodo() {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
      switch (filterOption.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed-check")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed-check")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
      }
    });
  }
  
  function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos=[];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
      //Todo DIV
      const todoDIV = document.createElement("div");
      todoDIV.classList.add("todo");
      //Création du li
      const newTodo = document.createElement("li");
      newTodo.innerText = todo; // Utiliser 'todo' au lieu de 'todoInput.value'
      newTodo.classList.add("todo-item");
      todoDIV.appendChild(newTodo);
      //Bouton Check
      const completedButton = document.createElement("button");
      completedButton.innerHTML = '<i class="fas fa-check"></i>';
      completedButton.classList.add("complete-btn");
      todoDIV.appendChild(completedButton);
      //Bouton delete
      const trashButton = document.createElement("button");
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashButton.classList.add("trash-btn");
      todoDIV.appendChild(trashButton);
      //Ajouter notre todo à notre todo-list
      todoList.appendChild(todoDIV);
    });
  }
  
  
  
  
  