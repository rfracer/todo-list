/**
 * DRAG AND DROP FUNCIONALITY ON TASKS LIST ITEMS - DRAG AND DROP API
 * ALLOW MOVING ELEMENTS AND SWAP PLACES
 */

import { tasks, saveToStorage } from './listManagement';
import { renderTasks } from './UI';

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

  renderTasks(tasks);
  saveToStorage();
}

export function addDropEvent(listItem) {
  listItem.addEventListener('dragstart', dragStart);
  listItem.addEventListener('dragenter', dragEnter);
  listItem.addEventListener('dragover', dragOver);
  listItem.addEventListener('dragleave', dragLeave);
  listItem.addEventListener('drop', drop);
}
