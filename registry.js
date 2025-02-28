

export function _createTask(name, status) {
    return {
        name,
        status
    }
}

function loadTasks() {
    const tasks = localStorage.getItem("tasks")
    if(!tasks)
        return  []
    return JSON.parse(tasks);
}

function saveTasks(tasks){
    localStorage.setItem("tasks",JSON.stringify(tasks))
}
export function _addTask(task) {
    const tasks = loadTasks();
    tasks.push(task)
    saveTasks(tasks)
}

export function _getTasks() {
    return loadTasks()
}

export function _deleteTask(name){
    const tasks = loadTasks()
    const indexToDelete = tasks.findIndex(function(task){
       return task.name == name
    })

    if(indexToDelete == null)
        return;

    tasks.splice(indexToDelete)
    saveTasks(tasks)
}


