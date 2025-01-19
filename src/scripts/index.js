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

const profileSection = document.querySelector('.profile');

const profileTitle = profileSection.querySelector('.profile__title');
const profileDescription = profileSection.querySelector('.profile__description');
const profileImage = profileSection.querySelector('.profile__image');

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupProfile = document.querySelector('.popup_type_edit');
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupImage = document.querySelector('.popup_type_image');

const imagePopup = document.querySelector('.popup__image');
const paragraphPopup = document.querySelector('.popup__caption');

const formProfile = document.forms.editProfile;
const formCard = document.forms.newPlace;
const formAvatar = document.forms.editAvatar;

let usrId = '';

// Получение и установка информации о пользователе
getUserData()
  .then((usrData) => {
    usrId = usrData['_id'];
    setApiUserInfo(profileTitle, profileDescription, profileImage, usrData);
  })
  .catch((err) => console.log(err));

// Получение информации и создание карточек
getCards()
  .then((cardsData) => initialApiCards(cardsData, usrId))
  .catch((err) => console.log(err));

enableValidation(validationConfig);

profileSection.addEventListener('click', (evt) => {
  // Слушатель на окно добавления карточки
  if (evt.target.classList.contains('profile__add-button')) {
    clearValidation(formCard, validationConfig);
    openModal(popupNewCard);
  }

  // Слушатель на окно редактирования профиля
  if (evt.target.classList.contains('profile__edit-button')) {
    getProfileInfo(formProfile, profileTitle, profileDescription);
    clearValidation(formProfile, validationConfig);
    openModal(popupProfile);
  }

  // Слушатель на окно редактирования аватара
  if (evt.target.classList.contains('profile__edit-avatar-button')) {
    clearValidation(popupAvatar, validationConfig);
    openModal(popupAvatar);
  }
});

// Обработка информации
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


function getProfileInfo(form, title, description) {
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
