import '../pages/index.css';
import {initialCards} from './cards.js';
import {createCard, deleteCard, likeCard} from "./card";
import {openModal, closeModal} from "./modal";


// Переменные
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const profileSection = document.querySelector('.profile');

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupProfile = document.querySelector('.popup_type_edit');
const popupImage =  document.querySelector('.popup_type_image');

const formProfile = document.forms.editProfile;
const formCard = document.forms.newPlace;

// Инициализация карточек на странице
initialCards.forEach(function (item) {
  const createdCard = createCard(item, cardTemplate, deleteCard, likeCard, openModal, popupImage);
  placesList.append(createdCard);
});

profileSection.addEventListener('click', (evt) => {
  // слушатель на окно добавления карточки
  if (evt.target.classList.contains('profile__add-button')) {
    openModal(popupNewCard);
  }

  // слушатель на окно редактирования профиля
  if (evt.target.classList.contains('profile__edit-button')) {
    openModal(popupProfile);
  }
});

// Обработка информации 
formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const profileTitle = profileSection.querySelector('.profile__title');
  const profileDescription = profileSection.querySelector('.profile__description');

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
  
  const createdCard = createCard(cardInfo, cardTemplate, deleteCard, likeCard, openModal, popupImage);
  placesList.prepend(createdCard);

  closeModal(popupNewCard);
});
