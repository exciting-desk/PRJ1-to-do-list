let tasks = [];
let nextId = 1;

export function loadTasks() {
  const stored = localStorage.getItem('tasks');
  if (stored) {
    tasks = JSON.parse(stored);
    nextId = tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
  }
}
loadTasks();

export function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function _createTask(name, completed = false) {
  return {
    id: nextId++,
    name,
    completed,
    archived: false
  };
}

export function _addTask(taskObj) {
  tasks.push(taskObj);
  saveTasks();
  return taskObj;
}

export function _getTasks() {
  return tasks;
}

export function _toggleStatus(taskId) {
  const t = tasks.find(t => t.id === taskId);
  if (t) {
    t.completed = !t.completed;
    saveTasks();
  }
}

export function _archiveTask(taskId) {
  const t = tasks.find(t => t.id === taskId);
  if (t) {
    t.archived = true;
    saveTasks();
  }
}

export function _restoreTask(taskId) {
  const t = tasks.find(t => t.id === taskId);
  if (t) {
    t.archived = false;
    saveTasks();
  }
}

export function _deleteTask(taskId) {
  const idx = tasks.findIndex(t => t.id === taskId);
  if (idx !== -1) {
    tasks.splice(idx, 1);
    saveTasks();
  }
}

export function getTask(taskId) {
  return tasks.find(t => t.id === taskId);
}
