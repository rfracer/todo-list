import {
  createElement,
  deleteElement,
  clearInputs,
  renderCompleteTaskCount,
} from './UI';
import { closeAddModal } from './modal';

const LOCAL_STORAGE_KEY = 'tasks';
export const tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? [];

export const addTask = (e) => {
  e.preventDefault();
  const addTaskNameInput = document.getElementById('add-task-name');
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
  createElement(newTask);

  saveToStorage();
};

export const deleteTask = (e) => {
  if (!e.target.classList.contains('close-btn-icon')) return;

  const item = e.target.closest('.todo-list__item');
  const itemId = item.dataset.id;

  const index = tasks.findIndex((task) => {
    return task.id === itemId;
  });
  tasks.splice(index, 1);
  deleteElement(item);
  saveToStorage();
};

export const taskCheckboxHandler = (e) => {
  //ok
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

export const saveToStorage = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
};
