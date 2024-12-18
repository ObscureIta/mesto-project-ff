// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// @todo: 1. Настройка сборки Webpack check

// @todo: 2. Создание файла .gitignore check

// @todo: 3. Работа модальных окон

// Проба пера, создем карточки

//Импорт необходимых модулей
import '../pages/index.css';
import {initialCards} from './cards.js';
import {createCard, deleteCard} from "./card";
import {openModal, openModalImage, closeModal} from "./modal";


// Переменные
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const page = document.querySelector('.page');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupProfile = document.querySelector('.popup_type_edit');
const popupImage =  document.querySelector('.popup_type_image');

const formProfile = document.forms.editProfile;
const formCard = document.forms.newPlace;

// Инициализация карточек на странице
initialCards.forEach(function (item) {
  const createdCard = createCard(item, deleteCard, cardTemplate);
  placesList.append(createdCard);
});

page.addEventListener('click', (evt) => {
  // слушатель на окно добавления карточки
  if (evt.target.classList.contains('profile__add-button')) {
    openModal(popupNewCard);
  }

  // слушатель на окно редактирования прифиля
  if (evt.target.classList.contains('profile__edit-button')) {
    openModal(popupProfile);
  }

  // Если нажатие на изображение
  if (evt.target.classList.contains('card__image')) {
    openModalImage(popupImage, evt.target.src, evt.target.alt);
  }
});

formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileTitle.textContent = formProfile.elements.name.value;
  profileDescription.textContent = formProfile.elements.description.value;

  closeModal(popupProfile);
});

formCard.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const cardInfo =
      {
      name: formCard.elements['place-name'].value,
      link: formCard.elements.link.value
    };
  console.log(cardInfo);
  const tempCard = createCard(cardInfo, deleteCard, cardTemplate);
  placesList.append(tempCard);

  closeModal(popupNewCard);
});
