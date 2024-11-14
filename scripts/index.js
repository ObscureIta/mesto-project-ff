// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


// Проба пера, создем карточки

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard(cardTitle, cardImgSource, deleteCardCallback) {
  const cardElemet = cardTemplate.querySelector('.places__item.card').cloneNode(true);

  cardElemet.querySelector('.card__title').textContent = cardTitle
  cardElemet.querySelector('.card__image').src = cardImgSource
  cardElemet.querySelector('.card__delete-button').addEventListener('click', deleteCardCallback);

  return cardElemet
}

function deleteCard(event) {
  event.target.parentElement.remove();
}

for (let i = 0; i < initialCards.length; i++){
  const cardTitle = initialCards[i].name;
  const cardImgSource = initialCards[i].link;
  const cardElemet = createCard(cardTitle, cardImgSource, deleteCard)
  placesList.append(cardElemet);
}

