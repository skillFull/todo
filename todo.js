"use strict"

let listTasks = [];
let idTasks = 0;
const task = document.getElementById('new-task');
const list = document.getElementById('ListTodo');
const allComplete = document.getElementById('allComplete');
const submitTask = document.getElementById('submitTask');
const allDeleteCompleteButton = document.getElementById('allDeleteComplete');
const toggler = document.getElementById('group-button-lists')
const togglerPages = document.querySelector('.pages');
let currentNumberPage = 1;

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
    const pages = Number(Math.ceil(arrObj.length / 5));
    const start = ((currentNumberPage - 1) * 5);
    const end = start + 5 <= arrObj.length ? start + 5 : arrObj.length ;
    const currentPage = arrObj.slice(start, end);
    list.innerHTML = '';
    togglerPages.innerHTML = '';
        currentPage.forEach(item => {
            list.innerHTML += `${template(item)}`
        })

        for(let i = 1; i <= pages; i++) {
            togglerPages.innerHTML += `<li class="${i}">${i}</li>`;
        }

    toggler.children[0].innerHTML = `All(${listTasks.length})`;
    toggler.children[1].innerHTML = `Active(${filterComplete('!').length})`;
    toggler.children[2].innerHTML = `Completed(${filterComplete().length})`;

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
        elInput.setAttribute('id', 'editorTodo');
        elInput.value = activeLi.textContent;
        activeLi.textContent = '';
        elInput.focus();
        activeLi.append(elInput);

        const editorTodo = document.getElementById('editorTodo');
        editorTodo.addEventListener('blur', saveChange);
    }

})


function saveChange (event){
    const activeInput = event.target;  
    if(event.key === 'Enter' || event.type === 'blur') {
        const idParent = activeInput.offsetParent.id;
        listTasks.forEach(item => {
            if(idParent === item.id.toString()){
                item.value = activeInput.value;
            }
        })
        render()
    }
    removeChange(event);
    
}


function removeChange (event) {
    if(event.key === 'Escape') {
        editorTodo.removeEventListener('blur', saveChange);
        render();
    }
}

toggler.addEventListener('click', (event) => {
    const nameButton = event.target.value
    switch(nameButton) {
        case 'all':
            render();
            break;
        case 'active':
            render(filterComplete('!'));
            break;
        case 'completed':
            render(filterComplete());
            break;
   }
})

list.addEventListener('keydown', saveChange);

togglerPages.addEventListener('click', (event) => {
    
    currentNumberPage = Number(event.target.className);
    render()
})
