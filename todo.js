"use strict"

let listTasks = [];
let idTasks = 0;
const task = document.getElementById('new-task');
const list = document.getElementById('ListTodo');
const allComplete = document.getElementById('allComplete');
const submitTask = document.getElementById('submitTask');
const allDeleteCompleteButton = document.getElementById('allDeleteComplete');
const AllButton = document.getElementById('All');
const ActiveButton = document.getElementById('Active');
const CompletedButton = document.getElementById('Completed');





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
    const arrObj = arguments[0] || listTasks;
    list.innerHTML = ''
        arrObj.forEach(item => {
            list.innerHTML += `${template(item)}`
        })
    AllButton.innerHTML = `All(${listTasks.length})`;
    ActiveButton.innerHTML = `Active(${filterComplete('!').length})`;
    CompletedButton.innerHTML = `Completed(${filterComplete().length})`;
}

function template (item) {
   
    return `<li class="list-group-item" id="${item.id}">
        <input class="form-check-input me-1" type="checkbox" ${item.complete ? "checked": ''}>
        <div>${item.value}</div>
        <button type="button" class="btn-close" aria-label="Delete"></button>
    </li>`
    
}

function add() {
    const todo = task.querySelector('input');
    addTaskInList(todo.value);
    todo.value = '';
}


function filterComplete(...args) {
    if(!args.length) {
     return listTasks.filter(item => item.complete)
    }
    else {
     return listTasks.filter(item => !item.complete)
    }
 }
 
 function allDeleteComplete() {
     listTasks = filterComplete("!");
     checkAllPressCheckbox();
     render();
 }


function checkAllPressCheckbox () {
    const allCompleteTask = listTasks.length === filterComplete().length && listTasks.length;
    allComplete.checked = allCompleteTask;
}




allComplete.addEventListener('click', (event) => {
        const allCompleteButton = event.target;
        listTasks.forEach((item) => item.complete = allCompleteButton.checked)
    render();
})

list.addEventListener('click', (event) => {
    const activeButton = event.target;
    const idTodo = activeButton.parentNode.id;

    if (activeButton.type === "button") {   
    deleteTask(idTodo); 
    }
    
    if(activeButton.type === "checkbox") {
        listTasks.forEach(item => {
            if(idTodo === item.id.toString()) {
                item.complete = activeButton.checked;
            }
        })
        render()
      checkAllPressCheckbox();
    }
    
})

task.addEventListener('submit', add);
allDeleteCompleteButton.addEventListener('click', allDeleteComplete);

list.addEventListener('dblclick', (event) => {
    const activeLi = event.target;
    if(activeLi.tagName === 'DIV') {
        const elInput = document.createElement('input');
        elInput.setAttribute('type', 'text');
        elInput.value = activeLi.textContent;
        activeLi.textContent = '';
        
        activeLi.append(elInput);
    }

})


function inputChangesInTodo (event){
    const activeInput = event.target;  
    if(event.key === 'Enter' ) {
        const idParent = activeInput.offsetParent.id;
        listTasks.forEach(item => {
            if(idParent === item.id.toString()){
                item.value = activeInput.value;
            }
        })
        return render()
    }

    if(event.key ==='Escape'){
        render();
     }

}


AllButton.addEventListener('click', () => {
    render()
})
ActiveButton.addEventListener('click', () => {
    const notComplete = filterComplete('!');
    render(notComplete);
})

CompletedButton.addEventListener('click', () => {
    const Complete = filterComplete();
    render(Complete);
})















































list.addEventListener('keydown', inputChangesInTodo)

list.addEventListener('blur', (event) => {
    const activeInput = event.target; 
    if(event.type === 'focusout') {
        const idParent = activeInput.offsetParent.id;
        listTasks.forEach(item => {
            if(idParent === item.id.toString()){
                item.value = activeInput.value;
            }
        })
    }
    render()
})


