export function openModal(modalWindow) {
  const closeButton = modalWindow.querySelector('.popup__close');
  
  modalWindow.classList.add('popup_is-animated');
  setTimeout(() => {
    modalWindow.classList.add('popup_is-opened');
    closeButton.focus();
  }, 1)

  modalWindow.addEventListener('click', closeByButton);
  modalWindow.addEventListener('click', closeByOverlay);
  document.addEventListener('keydown', closeByEscape);
}

export function closeModal(modalWindow){
  modalWindow.classList.remove('popup_is-opened');
  setTimeout(() => {
    modalWindow.classList.remove('popup_is-animated');
  }, 600)

  modalWindow.removeEventListener('click', closeByButton);
  modalWindow.removeEventListener('click', closeByOverlay);
  document.removeEventListener('keydown', closeByEscape);
}

// Колбэки слушателей
function closeByButton(evt) {
  if (evt.target.classList.contains('popup__close')) {
    closeModal(getActiveModal());
  }
}

function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closeModal(getActiveModal());
  }
}

function closeByEscape(evt) {
  if(evt.key === 'Escape'){
    closeModal(getActiveModal())
  }
}

// Получение активного окна
function getActiveModal() {
  const activeModal = document.querySelector('.popup_is-opened');
  return activeModal;
}