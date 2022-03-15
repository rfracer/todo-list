import { render, filterTask } from './UI';
import {
  tasks,
  addTask,
  deleteTask,
  taskCheckboxHandler,
} from './listManagement';
import { openAddModal } from './modal';

const searchInput = document.getElementById('search-input');
const tasksContainer = document.getElementById('todo-list');
const addTaskForm = document.getElementById('add-form');
const openAddModalBtn = document.getElementById('add-open-modal');

render(tasks);

addTaskForm.addEventListener('submit', addTask);
tasksContainer.addEventListener('click', deleteTask);
tasksContainer.addEventListener('click', taskCheckboxHandler);
searchInput.addEventListener('keyup', filterTask);
openAddModalBtn.addEventListener('click', openAddModal);
