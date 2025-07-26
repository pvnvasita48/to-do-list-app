const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// === Function to add a new task ===
function addTask() {
  const taskText = taskInput.value.trim();

  // Don't allow empty tasks
  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  createTaskElement(taskText);
  taskInput.value = ""; // Clear input field
  saveTasks(); // Save to localStorage
}

// === Function to create a task element ===
function createTaskElement(text, isCompleted = false) {
  const li = document.createElement("li");

  // --- Left side: checkbox and text ---
  const left = document.createElement("div");
  left.className = "task-left";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isCompleted;

  const span = document.createElement("span");
  span.textContent = text;

  if (isCompleted) {
    li.classList.add("completed");
  }

  checkbox.onchange = () => {
    li.classList.toggle("completed");
    saveTasks();
  };

  left.appendChild(checkbox);
  left.appendChild(span);

  // --- Right side: edit & delete buttons ---
  const buttons = document.createElement("div");
  buttons.className = "task-buttons";

  // ✏️ Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.className = "edit-btn";
  editBtn.onclick = () => {
    const newText = prompt("Edit task:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText.trim();
      saveTasks();
    }
  };

  // ❌ Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  buttons.appendChild(editBtn);
  buttons.appendChild(deleteBtn);

  // Assemble list item
  li.appendChild(left);
  li.appendChild(buttons);

  // Add to list
  taskList.appendChild(li);
}

// === Function to save all tasks ===
function saveTasks() {
  const tasks = [];

  taskList.querySelectorAll("li").forEach((li) => {
    const text = li.querySelector("span").textContent;
    const checked = li.querySelector("input").checked;

    tasks.push({ text: text, completed: checked });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// === Load tasks from localStorage on startup ===
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    createTaskElement(task.text, task.completed);
  });
}

// Run this once page loads
window.onload = loadTasks;
