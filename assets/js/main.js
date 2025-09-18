const inputTask = document.querySelector('.input-task');
const btnTask = document.querySelector('.btn-task');
const tasks = document.querySelector('.tasks');

function createLi() {
    const li = document.createElement('li')
    return li
}

function createClearButton(btnText, li) {
    li.innerText += ' ';
    const btn = document.createElement('button');
    btn.innerText = btnText;
    btn.setAttribute('class', 'clear');
    btn.setAttribute('title', 'Clear this task');
    li.appendChild(btn);
}

function saveTask() {
    const taskLmt = tasks.querySelectorAll('li');
    const taskList = []

    for (let task of taskLmt) {
        let taskText = task.innerText;
        taskText = taskText.replace('Clear', '').trim();
        taskList.push(taskText);
    }
    const taskJson = JSON.stringify(taskList);
    localStorage.setItem('tasks', taskJson)
}

function createTask(text) {
    const li = createLi();
    li.innerText = text;
    tasks.appendChild(li);
    clearInput();
    createClearButton('Clear', li);
    saveTask();
}

function clearInput(){
    inputTask.value = '';
    inputTask.focus();
}

function addSavedTasks() {
    const tasks = localStorage.getItem('tasks');
    const taskList = JSON.parse(tasks)
    
    for (let task of taskList) {
        createTask(task);
    }
}

btnTask.addEventListener('click', function(){
    if (!inputTask.value) return;
    createTask(inputTask.value);
})

inputTask.addEventListener('keypress', function(e){
    if (!inputTask.value) return;
    if (e.keyCode === 13) {
        createTask(inputTask.value);
    }
})

document.addEventListener('click', function(e){
    const lmt = e.target;

    if (lmt.classList.contains('clear')){
        lmt.parentElement.remove();
        saveTask();
    }
});

addSavedTasks();