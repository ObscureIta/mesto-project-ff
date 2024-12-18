export function openModal(modalWindow) {
  const closeButton = modalWindow.querySelector('.popup__close');
  modalWindow.classList.add('popup_is-animated');

  setTimeout(() => {
    modalWindow.classList.add('popup_is-opened');
  }, 1)
  
  closeButton.focus();

  modalWindow.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
      closeModal(modalWindow);
    }
  }, { once: true });

  modalWindow.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeModal(modalWindow);
    }
  }, { once: true })

  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape'){
      closeModal(modalWindow)
    }
  }, { once: true })
}

export function closeModal(modalWindow){
  modalWindow.classList.remove('popup_is-opened');
  setTimeout(() => {
    modalWindow.classList.remove('popup_is-animated');
  }, 600)
}

