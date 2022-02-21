const appWrapper = document.querySelector('[data-app-wrapper]');
const addModal = document.getElementById('add-modal');
const openAddModalBtn = document.getElementById('add-open-modal');
const closeModalBtn = document.getElementById('modal-close-btn');

const searchInput = document.getElementById('search-input');
const tasksContainer = document.getElementById('todo-list');

const addTaskForm = document.getElementById('add-form');
const addTaskNameInput = document.getElementById('add-task-name');

const LOCAL_STORAGE_KEY = 'tasks';

const tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? [];

const addTask = (e) => {
  e.preventDefault();
  const name = addTaskNameInput.value;

  if (name === '') return;

  const addTaskPriority = document.querySelectorAll('input[name="priority"]');
  let priority;

  for (let i = 0; i < addTaskPriority.length; i++) {
    if (addTaskPriority[i].checked) {
      priority = addTaskPriority[i].value;
      break;
    }
  }
  const newTask = {
    id: Date.now().toString(),
    name: name,
    priority: priority,
    complete: false,
  };

  tasks.push(newTask);

  closeAddModal();
  clearInputs();
  render();
  saveToStorage();
};

const deleteTask = (e) => {
  if (!e.target.classList.contains('close-btn-icon')) return;

  const item = e.target.closest('.todo-list__item');
  const itemId = item.dataset.id;

  const index = tasks.findIndex((task) => {
    return task.id === itemId;
  });
  tasks.splice(index, 1);
  render();
  saveToStorage();
};

const renderCompleteTaskCount = () => {
  const taskCount = document.getElementById('complete-count');
  const taskCountProgressBar = document.querySelector('[data-progress-bar]');

  const totalTasks = tasks.length;
  const completedTasksCount = tasks.filter((task) => {
    return task.complete === true;
  }).length;
  if (totalTasks) {
    taskCount.innerHTML = `${completedTasksCount} / ${totalTasks} Completed`;
    taskCountProgressBar.value = completedTasksCount;
    taskCountProgressBar.max = totalTasks;
  } else {
    taskCount.innerHTML = 'No tasks';
    taskCountProgressBar.value = 0;
  }
};

const taskCheckboxHandler = (e) => {
  if (e.target.tagName.toLowerCase() != 'input') return;
  const item = e.target.closest('.todo-list__item');
  const itemId = item.dataset.id;
  item.classList.toggle('is-complete');

  const index = tasks.findIndex((task) => {
    return task.id == itemId;
  });
  tasks[index].complete = !tasks[index].complete;

  renderCompleteTaskCount();
  saveToStorage();
};

const filterTask = () => {
  const searchValue = searchInput.value;
  renderTasks(searchValue);
  addDropEvents();
};

const renderTasks = (filter = '') => {
  const taskTemplate = document.getElementById('template-task');

  tasksContainer.innerHTML = '';
  const filteredTasks = !filter
    ? tasks
    : tasks.filter((task) => {
        return task.name.includes(filter);
      });

  for (const task of filteredTasks) {
    const taskElement = document.importNode(taskTemplate.content, true);
    const taskListItem = taskElement.firstElementChild;
    const checkboxInput = taskElement.querySelector('input');

    taskListItem.dataset.id = task.id;
    checkboxInput.id = task.id;

    if (task.complete) {
      checkboxInput.checked = task.complete;
      taskListItem.classList.add('is-complete');
    }
    const label = taskElement.querySelector('label');
    label.htmlFor = task.id;
    const priority = taskElement.querySelector('.todo-list__item-priority');

    switch (task.priority) {
      case 'low':
        priority.textContent = 'L';
        priority.classList.add('todo-list__item-priority--low');
        break;
      case 'medium':
        priority.textContent = 'M';
        priority.classList.add('todo-list__item-priority--medium');
        break;
      case 'high':
        priority.textContent = 'H';
        priority.classList.add('todo-list__item-priority--high');
        break;
    }
    label.append(task.name);
    tasksContainer.appendChild(taskElement);
  }
};

const saveToStorage = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
};

const closeAddModal = () => {
  addModal.classList.remove('visible');
  const mediaQuery = window.matchMedia('(min-width: 1200px)');
  if (mediaQuery.matches) {
    appWrapper.classList.remove('backdrop');
  }
  clearInputs();
  render();
};

const openAddModal = () => {
  addModal.classList.add('visible');
  const mediaQuery = window.matchMedia('(min-width: 1200px)');
  if (mediaQuery.matches) {
    appWrapper.classList.add('backdrop');
  }
};

const clearInputs = () => {
  addTaskNameInput.value = '';
  searchInput.value = '';
};

/**
 * DRAG AND DROP FUNCIONALITY ON TASKS LIST ITEMS - DRAG AND DROP API
 * ALLOW MOVING ELEMENTS AND SWAP PLACES
 */

function dragStart(e) {
  e.dataTransfer.setData('text/plain', this.getAttribute('data-id'));
  e.dataTransfer.effectAllowed = 'move';
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  const draggedItemId = e.dataTransfer.getData('text/plain');
  const dropAreaId = e.target.closest('li').getAttribute('data-id');
  const draggedItemIndex = tasks.findIndex((task) => {
    return task.id === draggedItemId;
  });

  const droppedAreaIndex = tasks.findIndex((task) => {
    return task.id === dropAreaId;
  });
  const tmp = tasks[draggedItemIndex];
  tasks[draggedItemIndex] = tasks[droppedAreaIndex];
  tasks[droppedAreaIndex] = tmp;

  render();
  saveToStorage();
}

function addDropEvents() {
  const draggables = document.querySelectorAll('.todo-list__item');
  for (const draggable of draggables) {
    draggable.addEventListener('dragstart', dragStart);
    draggable.addEventListener('dragenter', dragEnter);
    draggable.addEventListener('dragover', dragOver);
    draggable.addEventListener('dragleave', dragLeave);
    draggable.addEventListener('drop', drop);
  }
}

/**
 * RENDER THE MOST IMPORTANT PARTS:
 *  - DISPLAY COMPLETE TASK COUNT IN DOM AND CHANGE PROGRESS BAR VALUE
 *  - RENDER ALL THE LIST TASKS
 */

const render = () => {
  renderCompleteTaskCount();
  renderTasks();
  addDropEvents();
};

render();

openAddModalBtn.addEventListener('click', openAddModal);
closeModalBtn.addEventListener('click', closeAddModal);
addTaskForm.addEventListener('submit', addTask);
tasksContainer.addEventListener('click', deleteTask);
tasksContainer.addEventListener('click', taskCheckboxHandler);
searchInput.addEventListener('keyup', filterTask);
