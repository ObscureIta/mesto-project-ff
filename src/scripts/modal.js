export function openModal(modalWindow) {
  const modalButton = modalWindow.querySelector('.popup__close');
  modalWindow.classList.add('popup_is-opened', 'popup_is-animated');

  modalButton.focus();

  modalButton.addEventListener('click', () => {
    closeModal(modalWindow);
  });

  modalWindow.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeModal(modalWindow);
    }
  })

  modalWindow.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      closeModal(modalWindow);
    }
  });
}

export function openModalImage (modalImage, imageSrc, imageAlt){
  const image = modalImage.querySelector('.popup__image');
  const paragraph = modalImage.querySelector('.popup__caption');
  image.src = imageSrc;
  image.alt = imageAlt;
  paragraph.textContent = imageAlt;

  openModal(modalImage);
}

export function closeModal(modalWindow) {
  modalWindow.classList.remove('popup_is-opened');
}