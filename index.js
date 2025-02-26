const taskInput = document.getElementById('taskInput');   
const addTaskButton = document.getElementById('addTaskButton'); 
const taskList = document.getElementById('taskList');     
const archList = document.getElementById('archivedList'); 

const activeTab = document.getElementById('activeTab');
const archivedTab = document.getElementById('archivedTab');

const archIcon = document.createElement('img');
archIcon.src = 'assets/archive.png'; 
archIcon.alt = 'Archive';

const delIcon = document.createElement('img');
delIcon.src = 'assets/trash-can.png'; 
delIcon.alt = 'Delete';

const restIcon = document.createElement('img');
restIcon.src = 'assets/restore.png'; 
restIcon.alt = 'Restore';

let draggedItem = null;

addTaskButton.addEventListener('click', addTask);  
activeTab.addEventListener('click', showActiveTasks);
archivedTab.addEventListener('click', showArchivedTasks); 

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.setAttribute('draggable', 'true');

  const archiveButton = document.createElement('button');
  archiveButton.appendChild(archIcon);

  const unarchiveButton = document.createElement('button');
  unarchiveButton.appendChild(restIcon);

  const checkComplete = document.createElement('input');
  checkComplete.type = 'checkbox';

  const span = document.createElement('span');
  span.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.appendChild(delIcon);

  addDragAndDropListeners(li);

  deleteButton.addEventListener('click', function() {
    li.remove();
  });

  checkComplete.addEventListener('change', function() {
    span.classList.toggle('completed');
    if (checkComplete.checked) {
      if (!li.contains(archiveButton)) {
        li.appendChild(archiveButton);
      }
    } else {
      if (li.contains(archiveButton)) {
        li.removeChild(archiveButton);
      }
    }
  });

  archiveButton.addEventListener('click', function() {
    li.removeChild(archiveButton);
    li.appendChild(unarchiveButton);
    archList.appendChild(li);
  });

  unarchiveButton.addEventListener('click', function() {
    li.removeChild(unarchiveButton);
    li.appendChild(archiveButton);
    taskList.appendChild(li);
  });

  li.appendChild(checkComplete);
  li.appendChild(span);
  li.appendChild(deleteButton);

  taskList.appendChild(li);

  taskInput.value = '';
}


function showActiveTasks() {
  taskList.style.display = 'flex';
  archList.style.display = 'none';
  activeTab.classList.add('active-tab');
  archivedTab.classList.remove('active-tab');
}


function showArchivedTasks() {
  taskList.style.display = 'none';
  archList.style.display = 'flex';
  archivedTab.classList.add('active-tab');
  activeTab.classList.remove('active-tab');
}


function addDragAndDropListeners(item) {
  item.addEventListener('dragstart', function() {
    draggedItem = item;
    requestAnimationFrame(() => item.classList.add('dragging'));
  });

  item.addEventListener('dragend', function() {
    draggedItem = null;
    item.classList.remove('dragging');
  });


  item.addEventListener('dragover', function(e) {
    e.preventDefault();
    
    const hoveredItem = this;
    if (draggedItem === hoveredItem) return;

    const hoveredItemRect = hoveredItem.getBoundingClientRect();
    const midpoint = hoveredItemRect.y + hoveredItemRect.height / 2;
    if (e.clientY < midpoint) {
      hoveredItem.parentNode.insertBefore(draggedItem, hoveredItem);
    } else {
      hoveredItem.parentNode.insertBefore(draggedItem, hoveredItem.nextSibling);
    }
  });

  item.addEventListener('drop', function(e) {
    e.preventDefault();
  });
}
