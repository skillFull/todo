"use strict"

let listTasks = [];
let idTasks = 0;
const task = document.getElementById('new-task');
const list = document.getElementById('ListTodo');
const allComplete = document.getElementById('allComplete');
const submitTask = document.getElementById('submitTask');
const allDeleteCompleteButton = document.getElementById('allDeleteComplete');

function addTaskInList (todoValue) {
    const newTask = {
    'id': idTasks,
    'value': todoValue,
    'complete': false,
    };

    listTasks.push(newTask)
    idTasks++;

    render();
}


function deleteTask (idTodo) {
 
    listTasks = listTasks.filter(item => item.id.toString() !== idTodo);
    
   render();
}

function render() {

    list.innerHTML = ''
        listTasks.forEach(item => {
            list.innerHTML += `${template(item)}`
        })
}

function template (item) {
   
    return `<li class="list-group-item" id="${item.id}">
        <input class="form-check-input me-1" type="checkbox" ${item.complete ? "checked": ''}>
        ${item.value}
        <button type="button" class="btn-close" aria-label="Delete"></button>
    </li>`
    
}

function add() {
    const todo = task.querySelector('input');
    addTaskInList(todo.value);
    todo.value = '';
}

task.addEventListener('submit', add);

allComplete.addEventListener('click', (event) => {


        const allCompleteButton = event.target;
        listTasks.forEach((item) => {
            item.complete = allCompleteButton.checked;
    })


    render();
})



function allDeleteComplete() {
    listTasks = []
    render();
}

list.addEventListener('click', (event) => {
   
    const activeButton = event.target;
    const idTodo = activeButton.parentNode.id;
    
    deleteTask(idTodo);
})


allDeleteCompleteButton.addEventListener('click', allDeleteComplete)