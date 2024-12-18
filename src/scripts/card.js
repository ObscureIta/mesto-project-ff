// Функция создания карточек
export function createCard(cardInfo, deleteCardCallback, cardTemplate) {
  const cardElement = cardTemplate.querySelector('.places__item.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardInfo.name;
  cardElement.querySelector('.card__image').src = cardInfo.link;
  cardElement.querySelector('.card__image').alt = cardInfo.name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCardCallback(cardElement));

  cardElement.querySelector('.card__like-button').addEventListener('click', () => doLikedCard(cardElement));
  return cardElement
}

export function deleteCard (cardElement) {
  cardElement.remove();
}

export function doLikedCard (cardElement) {
  const likeButton = cardElement.querySelector('.card__like-button');

  likeButton.classList.toggle('card__like-button_is-active');
}