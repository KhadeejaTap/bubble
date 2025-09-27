// todo.js - Handles dynamic to-do list logic
// Color scheme: soft off-white background, deep blue for text/icons, light lavender for tasks

// DOM elements
const plusBtn = document.getElementById('plus-btn');
const tasksContainer = document.getElementById('tasks-container');

let tasks = [];

function promptTask() {
    if (tasks.length >= 3) return;
    const name = prompt('Enter your task:');
    if (name && name.trim()) {
        addTask(name.trim());
    }
}

function addTask(name) {
    if (tasks.length >= 3) return;
    const task = {
        name,
        done: false
    };
    tasks.push(task);
    renderTasks();
}

function renderTasks() {
    tasksContainer.innerHTML = '';
    tasks.forEach((task, idx) => {
        const div = document.createElement('div');
        div.className = 'todo-task' + (task.done ? ' done' : '');
        div.innerHTML = `
            <span class="task-text">${task.name}</span>
            <button class="delete-btn" title="Delete">&times;</button>
        `;
        // Mark as done
        div.querySelector('.task-text').onclick = () => {
            task.done = !task.done;
            renderTasks();
        };
        // Delete
        div.querySelector('.delete-btn').onclick = () => {
            tasks.splice(idx, 1);
            renderTasks();
        };
        // Drag and drop
        div.draggable = true;
        div.ondragstart = (e) => {
            e.dataTransfer.setData('text/plain', idx);
        };
        div.ondragover = (e) => {
            e.preventDefault();
        };
        div.ondrop = (e) => {
            e.preventDefault();
            const from = Number(e.dataTransfer.getData('text/plain'));
            if (from !== idx) {
                const moved = tasks.splice(from, 1)[0];
                tasks.splice(idx, 0, moved);
                renderTasks();
            }
        };
        tasksContainer.appendChild(div);
    });
}

plusBtn.onclick = promptTask;

// Initial render
renderTasks();
