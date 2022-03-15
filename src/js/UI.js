import { tasks } from './listManagement';
import { addDropEvent } from './dragAndDrop';

const tasksContainer = document.getElementById('todo-list');

export const createElement = (task) => {
  const taskTemplate = document.getElementById('template-task');
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

  addDropEvent(taskListItem);
  renderCompleteTaskCount();
};

export const deleteElement = (item) => {
  item.remove();
  renderCompleteTaskCount();
};

export const renderCompleteTaskCount = () => {
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

export const filterTask = () => {
  const searchValue = document
    .getElementById('search-input')
    .value.toLowerCase();

  if (searchValue.trim === '') return;

  tasks.forEach((task) => {
    const listItem = tasksContainer.querySelector(`li[data-id='${task.id}']`);
    if (task.name.toLowerCase().includes(searchValue)) {
      listItem.style.display = 'flex';
    } else {
      listItem.style.display = 'none';
    }
  });
};

export const renderTasks = (tasks) => {
  tasksContainer.innerHTML = '';
  for (const task of tasks) {
    createElement(task);
  }
};

export const clearInputs = () => {
  const addTaskNameInput = document.getElementById('add-task-name');
  const searchInput = document.getElementById('search-input');
  addTaskNameInput.value = '';
  searchInput.value = '';
};

export const render = (tasks) => {
  renderCompleteTaskCount(tasks);
  renderTasks(tasks);
};
