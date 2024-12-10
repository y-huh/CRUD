let tasks = [];

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span>${task}</span>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function addTask(e) {
    e.preventDefault();
    const newTask = taskInput.value.trim();
    if (newTask) {
        tasks.push(newTask);
        taskInput.value = '';
        renderTasks();
        console.log('Task added:', newTask);
        console.log('Current tasks:', tasks);
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
    console.log('Task deleted at index:', index);
    console.log('Current tasks:', tasks);
}

taskForm.addEventListener('submit', addTask);

renderTasks();

setTimeout(() => {
    if (tasks.length > 0) {
        deleteTask(0);
    }
}, 4000);

