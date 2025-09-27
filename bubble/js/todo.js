
// todo.js - Handles dynamic to-do list logic with PHP backend
// Uses AJAX to communicate with tasks.php

const plusBtn = document.getElementById('plus-btn');
const tasksContainer = document.getElementById('tasks-container');
let tasks = [];

function ajax(action, data, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'tasks.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        try {
            cb(JSON.parse(xhr.responseText));
        } catch {
            cb([]);
        }
    };
    let params = 'action=' + encodeURIComponent(action);
    if (data) {
        for (const k in data) {
            params += '&' + encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
        }
    }
    xhr.send(params);
}

function loadTasks() {
    ajax('list', null, function(res) {
        if (Array.isArray(res)) {
            tasks = res;
            renderTasks();
        }
    });
}

function promptTask() {
    if (tasks.length >= 3) return;
    const name = prompt('Enter your task:');
    if (name && name.trim()) {
        ajax('add', {name: name.trim()}, function(res) {
            if (Array.isArray(res)) {
                tasks = res;
                renderTasks();
            }
        });
    }
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
            ajax('toggle', {idx}, function(res) {
                if (Array.isArray(res)) {
                    tasks = res;
                    renderTasks();
                }
            });
        };
        // Delete
        div.querySelector('.delete-btn').onclick = () => {
            ajax('delete', {idx}, function(res) {
                if (Array.isArray(res)) {
                    tasks = res;
                    renderTasks();
                }
            });
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
                ajax('reorder', {from, to: idx}, function(res) {
                    if (Array.isArray(res)) {
                        tasks = res;
                        renderTasks();
                    }
                });
            }
        };
        tasksContainer.appendChild(div);
    });
}

plusBtn.onclick = promptTask;

// Initial render from PHP
loadTasks();
