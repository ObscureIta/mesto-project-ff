const imagePopup = document.querySelector('.popup__image');
const paragraphPopup = document.querySelector('.popup__caption');

// Функция создания карточек
export function createCard(
  imageAttr, 
  cardTemplate, 
  deleteCardCallback, 
  likeCardCallback,
  openCardCallback,
  modalWindow,
  setImageAttr,
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

  // Навешиваем слушатели
  deleteButton.addEventListener('click', () => deleteCardCallback(cardElement));
  likeButton.addEventListener('click', () => likeCardCallback(cardElement));
  cardImage.addEventListener('click', () => {
    // Смена информации только уже при соытии открытия popup
    setImageAttr(cardImage.src, cardImage.alt, imagePopup, paragraphPopup);
    openCardCallback(modalWindow);
  })

  return cardElement
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function likeCard(cardElement) {
  const likeButton = cardElement.querySelector('.card__like-button');

  likeButton.classList.toggle('card__like-button_is-active');
}

