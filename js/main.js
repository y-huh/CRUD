let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const submitBtn = document.getElementById('submit-btn');
const filterButtons = document.querySelectorAll('.filter-btn');

let editIndex = -1;

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        if (
            currentFilter === 'all' ||
            (currentFilter === 'done' && task.done) ||
            (currentFilter === 'undone' && !task.done)
        ) {
            const li = document.createElement('li');
            li.className = `task-item ${task.done ? 'done' : ''}`;
            li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="toggle-btn" onclick="toggleTask(${index})">${task.done ? 'Undo' : 'Done'}</button>
                    <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        }
    });
}

function handleSubmit(e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText) {
        if (editIndex === -1) {
            tasks.push({ text: taskText, done: false });
            console.log('Task added:', taskText);
        } else {
            tasks[editIndex].text = taskText;
            console.log('Task updated:', taskText);
            editIndex = -1;
            submitBtn.textContent = 'Add Task';
        }
        taskInput.value = '';
        saveTasks();
        renderTasks();
        console.log('Current tasks:', tasks);
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
    console.log('Task deleted at index:', index);
    console.log('Current tasks:', tasks);
}

function editTask(index) {
    editIndex = index;
    taskInput.value = tasks[index].text;
    submitBtn.textContent = 'Update Task';
    taskInput.focus();
    console.log('Editing task at index:', index);
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
    console.log('Task status toggled at index:', index);
    console.log('Current tasks:', tasks);
}

function setFilter(filter) {
    currentFilter = filter;
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    document.getElementById(`filter-${filter}`).classList.add('active');
    document.getElementById(`filter-${filter}`).setAttribute('aria-pressed', 'true');
    renderTasks();
    console.log('Filter set to:', filter);
}

taskForm.addEventListener('submit', handleSubmit);

filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        setFilter(e.target.id.split('-')[1]);
    });
});

renderTasks();

console.log('Initial tasks:', tasks);
