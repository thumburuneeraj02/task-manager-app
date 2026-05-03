// =======================
// Task Class
// =======================
class Task {
    constructor(id, title, description, priority, category) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.category = category;
        this.completed = false;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}

// =======================
// Task Manager Class
// =======================
class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    getTasks() {
        return this.tasks;
    }
}

// =======================
// Initialize
// =======================
const manager = new TaskManager();
let editTaskId = null;
// =======================
// Get Elements
// =======================
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const priorityInput = document.getElementById("priority");
const categoryInput = document.getElementById("category");
const addBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const filterCategory = document.getElementById("filterCategory");
const searchInput = document.getElementById("search");

// =======================
// Render Tasks
// =======================
function renderTasks(tasks) {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const div = document.createElement("div");
        div.classList.add("task", task.priority);

        if (task.completed) {
            div.classList.add("completed");
        }

        div.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p><b>Priority:</b> ${task.priority}</p>
            <p><b>Category:</b> ${task.category}</p>
           <button onclick="editTask(${task.id})">Edit</button>
<button onclick="deleteTask(${task.id})">Delete</button>
<button onclick="toggleComplete(${task.id})">Complete</button>
        `;

        taskList.appendChild(div);
    });
}

// =======================
// Apply Search + Filter
// =======================
function applyFilters() {
    let tasks = manager.getTasks();

    const category = filterCategory.value;
    const searchText = searchInput.value.toLowerCase();

    // Filter by category
    if (category !== "all") {
        tasks = tasks.filter(task => task.category === category);
    }

    // Search filter
    if (searchText) {
        tasks = tasks.filter(task =>
            task.title.toLowerCase().includes(searchText) ||
            task.description.toLowerCase().includes(searchText)
        );
    }

    renderTasks(tasks);
}

// =======================
// Add Task
// =======================
addBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const priority = priorityInput.value;
    const category = categoryInput.value;

    // Validation
    if (!title) {
        alert("Title is required!");
        return;
    }

    if (editTaskId) {
    // UPDATE existing task
    const task = manager.tasks.find(t => t.id === editTaskId);

    if (task) {
        task.title = title;
        task.description = description;
        task.priority = priority;
        task.category = category;
    }

    editTaskId = null; // reset
} else {
    // CREATE new task
    const newTask = new Task(
        Date.now(),
        title,
        description,
        priority,
        category
    );

    manager.addTask(newTask);
    if (priority === "high") {
    showNotification("⚠️ High priority task added!");
}
}
    applyFilters();

    // Clear inputs
    titleInput.value = "";
    descInput.value = "";
});

// =======================
// Delete Task
// =======================
function deleteTask(id) {
    manager.deleteTask(id);
    applyFilters();
}

// =======================
// Toggle Complete
// =======================
function toggleComplete(id) {
    const task = manager.tasks.find(t => t.id === id);
    if (task) {
        task.toggleComplete();

        if (task.priority === "high") {
            showNotification("✅ High priority task completed!");
        }
    }
    applyFilters();
}

// =======================
// Event Listeners
// =======================
filterCategory.addEventListener("change", applyFilters);
searchInput.addEventListener("input", applyFilters);
function editTask(id) {
    const task = manager.tasks.find(t => t.id === id);

    if (task) {
        titleInput.value = task.title;
        descInput.value = task.description;
        priorityInput.value = task.priority;
        categoryInput.value = task.category;

        editTaskId = id; // mark editing mode
    }
}
function showNotification(message) {
    const notification = document.getElementById("notification");

    notification.textContent = message;
    notification.classList.remove("hidden");

    setTimeout(() => {
        notification.classList.add("hidden");
    }, 3000); // 3 seconds
}
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});