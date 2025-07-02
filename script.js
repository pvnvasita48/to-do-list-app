const addBtn = document.getElementById("add-task");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach(li => {
    const text = li.querySelector(".task-text").textContent;
    const completed = li.querySelector("input[type='checkbox']").checked;
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach(task => addTask(task.text, task.completed));
}

function addTask(taskText, completed = false) {
  if (!taskText.trim()) return;

  const li = document.createElement("li");

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.addEventListener("change", () => {
    taskSpan.classList.toggle("completed", checkbox.checked);
    saveTasks();
  });

  // Task Text
  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;
  taskSpan.className = "task-text";
  if (completed) taskSpan.classList.add("completed");

  // Edit Button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";
  editBtn.addEventListener("click", () => {
    const newText = prompt("Edit task:", taskSpan.textContent);
    if (newText !== null && newText.trim() !== "") {
      taskSpan.textContent = newText.trim();
      saveTasks();
    }
  });

  // Delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(checkbox);
  li.appendChild(taskSpan);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  saveTasks();
}

addBtn.addEventListener("click", () => {
  addTask(taskInput.value);
  taskInput.value = "";
});

taskInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    addTask(taskInput.value);
    taskInput.value = "";
  }
});

loadTasks();


const themeSwitch = document.getElementById("theme-switch");

function applyTheme(theme) {
  document.body.classList.remove("light-mode", "dark-mode");
  document.body.classList.add(`${theme}-mode`);
  themeSwitch.checked = theme === "dark";
}

themeSwitch.addEventListener("change", () => {
  const newTheme = themeSwitch.checked ? "dark" : "light";
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});

// On load
const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);
