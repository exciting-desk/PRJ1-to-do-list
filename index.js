const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const archList = document.getElementById('archivedList');
const showArchButton = document.getElementById('showArchivedButton');

addTaskButton.addEventListener('click', addTask);

function addTask(){
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');

    const archiveButton = document.createElement('button');
    archiveButton.textContent = 'Archive';

    const unarchiveButton = document.createElement('button');
    unarchiveButton.textContent = 'Restore';

    const checkComplete = document.createElement('input');
    checkComplete.type = 'checkbox';
    
    const span = document.createElement('span');
    span.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener('click', function(){
        li.remove()
    })

    checkComplete.addEventListener('change', function(){
        span.classList.toggle('completed');
        if (checkComplete.checked) {
            li.appendChild(archiveButton);
        } else {
            if (li.contains(archiveButton)) {
                li.removeChild(archiveButton);
            }
        }
    })

    archiveButton.addEventListener('click', function(){
        li.removeChild(archiveButton);
        li.appendChild(unarchiveButton);
        archList.appendChild(li);
    })

    unarchiveButton.addEventListener('click', function(){
        li.removeChild(unarchiveButton);
        li.appendChild(archiveButton);
        taskList.appendChild(li);
    })

    li.appendChild(checkComplete);
    li.appendChild(span);
    li.appendChild(deleteButton);
    
    taskList.appendChild(li);

    taskInput.value = '';
    
}


