// Функция создания карточек
export function createCard(
  imageAttr, 
  cardTemplate, 
  deleteCardCallback, 
  likeCardCallback,
  openCardCallback,
  modalWindow
) {
  // Копируем template
  const cardElement = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  // Достаем изменяемые значения
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  // Присвоить значения
  cardTitle.textContent = imageAttr.name;
  cardImage.src = imageAttr.link;
  cardImage.alt = imageAttr.name;

  const modalImage = setImageAttr(modalWindow, cardImage.src, cardImage.alt);

  // Навешиваем слушатели
  deleteButton.addEventListener('click', () => deleteCardCallback(cardElement));
  likeButton.addEventListener('click', () => likeCardCallback(cardElement));
  cardImage.addEventListener('click', () => openCardCallback(modalImage))

  return cardElement
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function likeCard(cardElement) {
  const likeButton = cardElement.querySelector('.card__like-button');

  likeButton.classList.toggle('card__like-button_is-active');
}

function setImageAttr(modalWindow, imgSrc, imgAlt) {
  const image = modalWindow.querySelector('.popup__image');
  const paragraph = modalWindow.querySelector('.popup__caption');

  image.src = imgSrc;
  image.alt = imgAlt;
  paragraph.textContent = imgAlt;

  return modalWindow
}