"use strict"

let listTasks = [];
let idTasks = 0;
const task = document.getElementById('new-task');
const list = document.getElementById('ListTodo');
const allChecked = document.getElementById('allChecked');
const submitTask = document


function addTaskInList (todoValue) {
    
    listTasks.push({'id': idTasks, 'value': todoValue, 'complete': false} )
    idTasks++;
    renderList(listTasks);
}


function deleteTask (idTodo) {
    const arrLi = list.querySelectorAll('ul > li');
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
        listTasks.querySelector('ul').innerHTML = ''
        listTasks.forEach(item => {
            debugger
            template(item);
            debugger
           
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
    
    liElement.innerHTML = `<input class="form-check-input me-1" type="checkbox" ${obj.complete ? checked : ''}>
    ${obj.value}
    <button type="button" class="btn-close" aria-label="Delete"></button>`
    list.querySelector('ul').append(liElement);
}























task.addEventListener('submit', () => {
    const todo = task.querySelector('input');
    
    
    addTaskInList(todo.value);
    todo.value = '';
})

allChecked.addEventListener('click', () => {
   
    console.log(allChecked.checked)
    if(allChecked) {
        listTasks.forEach(item => {
            item.checked = true;
            renderList()
        })
        
        listTasks.forEach(item => {
            item.checked = false;
            renderList();
        })

    }
    
})


list.addEventListener('click', () => {
   
    const activeButton = list.querySelectorAll('ul > li > button:hover');
    
    const idTodo = activeButton[0].parentNode.id;
    
    deleteTask(idTodo);
})


