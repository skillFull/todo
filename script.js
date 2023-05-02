let listTasks = [];
let idTasks = 0;
let nameButton = 'all';
const task = document.getElementById('new-task');
const list = document.getElementById('list-todo');
const allComplete = document.getElementById('all-complete');
const allDeleteCompleteButton = document.getElementById('all-delete-complete');
const togglerButtons = document.getElementById('group-button-lists');
const togglerPages = document.querySelector('.pages');
let currentNumberPage = 1;
let pagesCount = 0;

function stringNormalizer(str) {
  let space = 0;
  str = str.trim();
  const clearArrayChar = [];
  str.split('').forEach(item => {
    if(item !== ' ' && (space === 0 || space === 1)) { 
      clearArrayChar.push(item);
      // eslint-disable-next-line no-unused-expressions
      space === 0 ? space : space--;
    }
    if(item === ' ' && space === 0){
      clearArrayChar.push(item);
      space++;
    }
  });
  return clearArrayChar.join('');   
}

function addTaskInList(todoValue) {
  if(todoValue.trim()) {
    const newTask = {
      id: idTasks,
      value: stringNormalizer(todoValue),
      complete: false,
    };
  
    listTasks.push(newTask);
    idTasks++;
    render();
  }
  
}

function toggler() {
  if (nameButton === 'all') {
    return listTasks;
  }
  if (nameButton === 'active') {
    return filterComplete('!');
  }
  if (nameButton === 'completed') {
    return filterComplete();
  }
}

function deleteTask(idTodo) {
  listTasks = listTasks.filter((item) => item.id.toString() !== idTodo);

  render();
}

function render() {
  const arrObj = toggler();
  const pages = Number(Math.ceil(arrObj.length / 5));
  const start = ((currentNumberPage - 1) * 5);
  const end = start + 5 <= arrObj.length ? start + 5 : arrObj.length;
  const currentPage = arrObj.slice(start, end);
  list.innerHTML = '';

  currentPage.forEach((item) => {
    list.innerHTML += `${template(item)}`;
  });

  togglerPages.innerHTML = '';
  for (let i = 1; i <= pages; i++) {
    if (i === currentNumberPage) {
      togglerPages.innerHTML += `<li class="${i}" tabindex="0" data-checked="true">${i}</li>`
      continue;
    }
    togglerPages.innerHTML += `<li class="${i}" tabindex="0">${i}</li>`
  }
  
  checkAllPressCheckbox();

  togglerButtons.innerHTML = `<button type="button" class="all" value="all" data-activeButton=${nameButton === 'all' ? "true" : "false"}>All(${listTasks.length})</button>
                              <button type="button" class="active" value="active" data-activeButton=${nameButton === 'active' ? "true" : "false"}>Active(${filterComplete('!').length})</button>
                              <button type="button" class="completed" value="completed" data-activeButton=${nameButton === 'completed' ? "true" : "false"}>Complete(${filterComplete().length})</button>`
}

function template(item) {
  return `<li class="list-group-item" id="${item.id}">
            <input class="form-check-input me-1" type="checkbox" ${item.complete ? 'checked' : ''}>
            <div>${_.escape(item.value)}</div>
            <button type="button" class="btn-close" aria-label="Delete"></button>
          </li>`;
}

function add() {
  const todo = task.querySelector('input');
  addTaskInList(todo.value);
  todo.value = '';
}

function filterComplete(...args) {
  if (!args.length) {
    return listTasks.filter((item) => item.complete);
  }

  return listTasks.filter((item) => !item.complete);
}

function allDeleteComplete() {
  listTasks = filterComplete('!');
  checkAllPressCheckbox();
  nameButton = 'all'
  render();
}

function checkAllPressCheckbox() {
  allComplete.checked = listTasks.length === filterComplete().length && listTasks.length;
}

allComplete.addEventListener('click', (event) => {
  const allCompleteButton = event.target;
  listTasks.forEach((item) => item.complete = allCompleteButton.checked);
  render();
});

list.addEventListener('click', (event) => {
  const activeButton = event.target;
  const idTodo = activeButton.parentNode.id;

  if (activeButton.type === 'button') {
    deleteTask(idTodo);
  }

  if (activeButton.type === 'checkbox') {
    listTasks.forEach((item) => {
      if (idTodo === item.id.toString()) {
        item.complete = activeButton.checked;
      }
    });
    render();
    checkAllPressCheckbox();
  }
});

task.addEventListener('submit', add);
allDeleteCompleteButton.addEventListener('click', allDeleteComplete);

list.addEventListener('dblclick', (event) => {  
  const activeLi = event.target;
  if (activeLi.tagName === 'DIV') {
    const elInput = document.createElement('input');
    elInput.setAttribute('type', 'text');
    elInput.setAttribute('id', 'editorTodo');
    elInput.value = activeLi.textContent;
    activeLi.textContent = '';
    elInput.focus();
    activeLi.append(elInput);
    elInput.addEventListener('blur', saveChange);
  }
});

function saveChange(event) {
  const activeInput = event.target;
  if (event.key === 'Enter' || event.type === 'blur') {
    const idParent = activeInput.offsetParent.id;
    listTasks.forEach((item) => {
      if (idParent === item.id.toString()) {
        // eslint-disable-next-line max-len
        item.value = activeInput.value.trim().length !== 0 ? stringNormalizer(activeInput.value) : item.value;
        render();
      }
    });
  }
  removeChange(event);
}

function removeChange(event) {
  if (event.key === 'Escape') {
    editorTodo.removeEventListener('blur', saveChange);
    render();
  }
}

togglerButtons.addEventListener('click', (event) => {
  nameButton = event.target.value;
  currentNumberPage = 1;
  render();
});

list.addEventListener('keydown', saveChange);

togglerPages.addEventListener('click', (event) => {
  currentNumberPage = Number(event.target.className) || currentNumberPage;
  render();
});

render();
