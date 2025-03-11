import {
  _createTask,
  _addTask,
  _getTasks
} from "./registry.js";
import { createTaskElem } from "./view.js";

const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const showArchivedToggle = document.getElementById('showArchivedToggle');

addTaskButton.addEventListener('click', () => {
  if (!taskInput.value.trim()) return;
  const newTask = _createTask(taskInput.value);
  _addTask(newTask);
  taskInput.value = '';
  renderTasks();
});

showArchivedToggle.addEventListener('change', renderTasks);

function addDragAndDropListeners() {
  taskList.addEventListener('dragover', handleDragOver);
  taskList.addEventListener('drop', handleDrop);

  const draggables = document.querySelectorAll('#taskList li');
  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', handleDragStart);
    draggable.addEventListener('dragend', handleDragEnd);
  });
}

function handleDragStart(e) {
  e.target.classList.add('dragging');
}

function handleDragEnd(e) {
  e.target.classList.remove('dragging');
}

function handleDragOver(e) {
  e.preventDefault();
  const dragging = document.querySelector('.dragging');
  if (!dragging) return;

  const afterElement = getDragAfterElement(taskList, e.clientY);
  if (afterElement == null) {
    taskList.appendChild(dragging);
  } else {
    taskList.insertBefore(dragging, afterElement);
  }
}

function handleDrop(e) {
  e.preventDefault();
  const dragging = document.querySelector('.dragging');
  if (dragging) {
    dragging.classList.remove('dragging');
  }
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - (box.top + box.height / 2);
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function renderTasks() {
  taskList.innerHTML = '';
  const tasks = _getTasks();
  const showArchived = showArchivedToggle.checked;

  tasks.forEach(task => {
    if (task.archived && !showArchived) return;
    taskList.appendChild(createTaskElem(task));
  });

  addDragAndDropListeners();
}

renderTasks();
