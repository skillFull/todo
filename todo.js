"use strict"

let listTasks = [];
let idTasks = 0;
const task = document.getElementById('new-task');
const list = document.getElementById('ListTodo');
const allChecked = document.getElementById('allChecked');
const submitTask = document.getElementById('submitTask');


function addTaskInList (todoValue) {
    
    listTasks.push({'id': idTasks, 'value': todoValue, 'complete': false} )
    idTasks++;
    renderList(listTasks);
}


function deleteTask (idTodo) {
    const arrLi = list.querySelectorAll('li');
    console.log(arrLi)
    listTasks = listTasks.filter((id) => {id === idTodo});
    let unnecessaryElement ;
    arrLi.forEach(item => {
        
        if(item.id === idTodo){
            unnecessaryElement = item.id
        }
    });
   
    document.getElementById(unnecessaryElement).remove();
   renderList();
}

function renderList(...args) {
   
    if(!args.length) {
        list.innerHTML = ''
        debugger
        listTasks.forEach(item => {
            template(item);   
        })
    }

    if(args.length === 1) {
        const lastTask = args[0].at(-1);
        template(lastTask)
    }
}

function template (obj) {
   
    const liElement = document.createElement('li');
    liElement.setAttribute("class", "list-group-item");
    liElement.setAttribute("id", `${obj.id}`);
    debugger
    liElement.innerHTML = `<input class="form-check-input me-1" type="checkbox">
    ${obj.value}
    
    <button type="button" class="btn-close" aria-label="Delete"></button>`
    debugger
    list.append(liElement);
    
}






task.addEventListener('submit', () => {
    const todo = task.querySelector('input');
    addTaskInList(todo.value);
    todo.value = '';
})

allChecked.addEventListener('click', () => {
   
    console.log(allChecked.checked)
        listTasks.forEach((item, index) => {
            item.complete = allChecked.checked ? true : false;
            list.querySelectorAll('li > input')[index].checked = item.complete;
        })
})


list.addEventListener('click', () => {
   
    const activeButton = list.querySelectorAll('li > button:hover');
    
    const idTodo = activeButton.parentNode.id;
    
    deleteTask(idTodo);
})


