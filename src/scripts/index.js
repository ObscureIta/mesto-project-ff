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

const ProfileTitle = document.querySelector('.profile__title');
const ProfileDescription = document.querySelector('.profile__description');

const formProfile = document.forms.editProfile;
const formCard = document.forms.newPlace;

function setImageAttr(imgSrc, imgAlt, imagePopup, paragraphPopup) {
  imagePopup.src = imgSrc;
  imagePopup.alt = imgAlt;
  paragraphPopup.textContent = imgAlt;
}

function getProfileInfo(form, Title, Description) {
  form.elements.name.value = Title.textContent;
  form.elements.description.value = Description.textContent;
}

function setProfileInfo(form, Title, Description) {
  Title.textContent = form.elements.name.value;
  Description.textContent = form.elements.description.value;
}

// Инициализация карточек на странице
initialCards.forEach(function (item) {
  const createdCard = createCard(item, cardTemplate, deleteCard, likeCard, openModal, popupImage, setImageAttr);
  placesList.append(createdCard);
});

profileSection.addEventListener('click', (evt) => {
  // слушатель на окно добавления карточки
  if (evt.target.classList.contains('profile__add-button')) {
    openModal(popupNewCard);
  }

  // слушатель на окно редактирования профиля
  if (evt.target.classList.contains('profile__edit-button')) {
    getProfileInfo(formProfile, ProfileTitle, ProfileDescription);
    openModal(popupProfile);
  }
});

// Обработка информации 
formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  setProfileInfo(formProfile, ProfileTitle, ProfileDescription)
  closeModal(popupProfile);
});

formCard.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const cardInfo =
      {
      name: formCard.elements['place-name'].value,
      link: formCard.elements.link.value
    };
  
  const createdCard = createCard(cardInfo, cardTemplate, deleteCard, likeCard, openModal, popupImage, setImageAttr);
  placesList.prepend(createdCard);

  closeModal(popupNewCard);
  evt.target.reset();
});
