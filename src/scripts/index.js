import '../pages/index.css';
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation";
import { getUserData, getCards, postCard, patchUserData, deleteCardOnApi, likeCardOnApi, unlikeCardOnApi, patchUserAvatar } from "./api.js";

// Конфиг валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// Переменные
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupProfile = document.querySelector('.popup_type_edit');
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupImage = document.querySelector('.popup_type_image');

const imagePopup = document.querySelector('.popup__image');
const paragraphPopup = document.querySelector('.popup__caption');

const formProfile = document.forms.editProfile;
const formCard = document.forms.newPlace;
const formAvatar = document.forms.editAvatar;

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__edit-avatar-button');

let usrId = '';

// Получение и установка информации о пользователе и карточках
getData();
// Включение валидации
enableValidation(validationConfig);

// Слушатели
editButton.addEventListener('click', () => {
  clearValidation(formProfile, validationConfig);
  setProfileInfo(formProfile, profileTitle, profileDescription);
  openModal(popupProfile);
});

addButton.addEventListener('click', () => {
  clearValidation(formCard, validationConfig);
  openModal(popupNewCard);
});

avatarButton.addEventListener('click', () => {
  clearValidation(formAvatar, validationConfig);
  openModal(popupAvatar);
});

// Обработка формы профиля
formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  changeButtonStatus(formProfile, true);
  patchUserData(formProfile.elements.name.value, formProfile.elements.description.value)
    .then((res) => {
      changeButtonStatus(formProfile, false);
      setApiUserInfo(profileTitle, profileDescription, profileImage, res);
      closeModal(popupProfile);
    })
    .catch((err) => {
      changeButtonStatus(formProfile, false, true);
      console.log(err);
    });
});

// Обработка формы карточки
formCard.addEventListener('submit', (evt) => {
  const cardInfo =
  {
    name: formCard.elements['place-name'].value,
    link: formCard.elements.link.value
  };

  evt.preventDefault();
  changeButtonStatus(formCard, true);

  postCard(cardInfo)
    .then((res) => {
      cardInfo._id = res._id;
      cardInfo.likes = res.likes;
      changeButtonStatus(formCard, false);
      const createdCard = createCard(cardInfo, cardTemplate, deleteCard, deleteCardOnApi, likeCard, likeCardOnApi, unlikeCardOnApi, openCardModal, usrId);
      placesList.prepend(createdCard);
      closeModal(popupNewCard);
    })
    .catch((err) => {
      changeButtonStatus(formCard, false, true);
      console.log(err);
    });
});

// Обработка формы аватара
popupAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  changeButtonStatus(formAvatar, true);
  patchUserAvatar(formAvatar.elements.avatar.value)
    .then(res => {
      setApiUserInfo(profileTitle, profileDescription, profileImage, res);
      changeButtonStatus(formAvatar, false);
      closeModal(popupAvatar);
    })
    .catch((err) => {
      changeButtonStatus(formCard, false, true);
      console.log(err);
    });
});

// Функции
function getData() {
  Promise.all([getUserData(), getCards()])
    .then(([usrData, cardsData]) => {
      usrId = usrData['_id'];
      setApiUserInfo(profileTitle, profileDescription, profileImage, usrData);
      initialApiCards(cardsData, usrId);
    })
    .catch((err) => console.log(err))
}

function setProfileInfo(form, title, description) {
  form.elements.name.value = title.textContent;
  form.elements.description.value = description.textContent;
}

// Функция создания карточек
function initialApiCards(apiDataList, usrId) {
  apiDataList.forEach(item => {
    const createdCard = createCard(item, cardTemplate, deleteCard, deleteCardOnApi, likeCard, likeCardOnApi, unlikeCardOnApi, openCardModal, usrId);
    placesList.append(createdCard);
  });
}

function openCardModal(imageSrc, paragraphText) {
  setImageAttr(imageSrc, paragraphText);
  openModal(popupImage);
}

function setImageAttr(imageSrc, paragraphText) {
  imagePopup.src = imageSrc;
  imagePopup.alt = paragraphText;
  paragraphPopup.textContent = paragraphText;
}

// Функция обновления данных
function setApiUserInfo(currentTitle, currentDescription, currentAvatar, apiDataList) {
  currentTitle.textContent = apiDataList.name;
  currentDescription.textContent = apiDataList.about;
  currentAvatar.style.backgroundImage = 'url(' + apiDataList.avatar + ')';
}

function changeButtonStatus(form, status, error = false) {
  const formButton = form.querySelector('.popup__button');

  if (status) {
    if (form.name === 'newPlace') {
      formButton.textContent = 'Создание...';
    } else {
      formButton.textContent = 'Сохранение...';
    }
  } else {
    if (form.name === 'newPlace') {
      formButton.textContent = 'Создать';
    } else {
      formButton.textContent = 'Сохранить';
    }

    if (error) {
      formButton.textContent = 'Ошибка';
    }
  }
}
