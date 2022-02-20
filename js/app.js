const openAddModalBtn = document.getElementById('add-open-modal');
const addModal = document.getElementById('add-modal');
const closeModalBtn = document.getElementById('modal-close-btn');

const tasksContainer = document.getElementById('todo-list');
const taskTemplate = document.getElementById('template-task');
const addTaskBtn = document.getElementById('add-btn');
const addTaskInput = document.getElementById('add-task-name');
const addTaskPriority = document.querySelectorAll('input[name="priority"]');

const tasks = [
  { id: '1', name: 'Task 1', priority: 'high', complete: false },
  {
    id: '2',
    name: 'Task 2',
    priority: 'low',
    complete: true,
  },
];

const addTask = () => {};

const render = (filter = '') => {
  for (const task of tasks) {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkboxInput = taskElement.querySelector('input');
    checkboxInput.id = task.id;
    if (task.complete) {
      const taskListItem = taskElement.firstElementChild; //?
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

openAddModalBtn.addEventListener('click', () => {
  addModal.classList.add('visible');
});

closeModalBtn.addEventListener('click', () => {
  addModal.classList.remove('visible');
});

render();
