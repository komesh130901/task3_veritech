document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
});

document.getElementById("addTaskBtn").addEventListener("click", function () {
  addTask();
});

function addTask() {
  var inputField = document.getElementById("taskInput");
  var task = inputField.value.trim();
  if (task !== "") {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ name: task, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    inputField.value = "";
    loadTasks();
  }
}

function loadTasks() {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  var taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach(function (task, index) {
    var li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" onchange="toggleTask(${index})" ${
      task.completed ? "checked" : ""
    }>
      <span class="${task.completed ? "completed" : ""}">${task.name}</span>
      <button onclick="editTask(${index})">Edit</button>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

function toggleTask(index) {
  var tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}
//edit
function editTask(index) {
  var newName = prompt(
    "Edit task:",
    JSON.parse(localStorage.getItem("tasks"))[index].name
  );
  if (newName !== null) {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].name = newName.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
}

function deleteTask(index) {
  var tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}
