import {
  _toggleStatus,
  _archiveTask,
  _restoreTask,
  _deleteTask
} from "./registry.js";

export function createTaskElem(taskObj) {
  const li = document.createElement('li');
  li.draggable = true;
  li.dataset.taskId = taskObj.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = taskObj.completed;
  checkbox.addEventListener('change', () => {
    _toggleStatus(taskObj.id);
    li.classList.toggle('completed');
  });
  li.appendChild(checkbox);

  const span = document.createElement('span');
  span.textContent = taskObj.name;
  li.appendChild(span);

  if (taskObj.completed) {
    li.classList.add('completed');
  }

  if (!taskObj.archived) {
    const archiveBtn = document.createElement('button');
    archiveBtn.textContent = "Archive";
    archiveBtn.addEventListener('click', () => {
      _archiveTask(taskObj.id);
      li.remove();
    });
    li.appendChild(archiveBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener('click', () => {
      _deleteTask(taskObj.id);
      li.remove();
    });
    li.appendChild(deleteBtn);
  } else {
    const restoreBtn = document.createElement('button');
    restoreBtn.textContent = "Restore";
    restoreBtn.addEventListener('click', () => {
      _restoreTask(taskObj.id);
      li.remove();
    });
    li.appendChild(restoreBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener('click', () => {
      _deleteTask(taskObj.id);
      li.remove();
    });
    li.appendChild(deleteBtn);
  }

  return li;
}
