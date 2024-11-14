// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


// Проба пера, создем карточки

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard(cardInfo, deleteCardCallback) {
  const cardElemet = cardTemplate.querySelector('.places__item.card').cloneNode(true);

  cardElemet.querySelector('.card__title').textContent = cardInfo.name;
  cardElemet.querySelector('.card__image').src = cardInfo.link;
  cardElemet.querySelector('.card__image').alt = `'Фото "${cardInfo.name}"`
  cardElemet.querySelector('.card__delete-button').addEventListener('click', function () {
    deleteCardCallback(cardElemet)
  });

  return cardElemet
}

function deleteCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach(function (item) {
  const cardElemet = createCard(item, deleteCard);
  placesList.append(cardElemet);
});