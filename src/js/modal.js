import { clearInputs } from './UI';

const addModal = document.getElementById('add-modal');
const appWrapper = document.querySelector('[data-app-wrapper]');
const closeModalBtn = document.getElementById('modal-close-btn');

export const closeAddModal = () => {
  addModal.classList.remove('visible');
  const mediaQuery = window.matchMedia('(min-width: 1200px)');
  if (mediaQuery.matches) {
    appWrapper.classList.remove('backdrop');
  }
  clearInputs();
};

export const openAddModal = () => {
  addModal.classList.add('visible');
  const mediaQuery = window.matchMedia('(min-width: 1200px)');
  if (mediaQuery.matches) {
    appWrapper.classList.add('backdrop');
  }
  closeModalBtn.addEventListener('click', closeAddModal);
};
