import { initialCards } from './data.js';
import { Card } from './Card.js';
import { validationData, FormValidator } from './FormValidator.js';

const popups = Array.from(document.querySelectorAll('.popup'))
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('#editDataPopup');
const popupAddCard = document.querySelector('#addCardPopup');
const popupOpenPhoto = document.querySelector('#openPhotoPopup');
const formAddCard = document.querySelector('#addCardForm')
const formEditProfile = document.querySelector('#formEditProfile')
const profileCloseButton = document.querySelector('#profileCloseButton');
const cardCloseButton = document.querySelector('#cardCloseButton');
const photoCloseButton = document.querySelector('#photoCloseButton');
const nameInput = document.querySelector('.form__field_type_name');
const jobInput = document.querySelector('.form__field_type_job');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__description');
const photosContainer = document.querySelector('.photos');
const photoPopupPic = document.querySelector('.popup__photo');
const photoPopupCaption = document.querySelector('.popup__photo-caption');
const cardInputCaption = document.querySelector('.form__field_type_place');
const cardInputPhoto = document.querySelector('.form__field_type_image-link');
const profileFormValidator = new FormValidator(validationData, popupEditProfile);
const cardFormValidator = new FormValidator(validationData, popupAddCard);

//открытие и закрытие попапов
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc)
};

//открытие и закрытие попапа, редактирующего профиль
function openEditDataPopup() {
    profileFormValidator.resetValidation();
    openPopup(popupEditProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileCaption.textContent;
}

function closeEditDataPopup() {
    closePopup(popupEditProfile);
}

//редактирование информации в профиле и отправка формы
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileCaption.textContent = jobInput.value;
    closePopup(popupEditProfile);
}

//открытие и закрытие попапа с фотографией
function openPhotoPopup() {
    openPopup(popupOpenPhoto);
}

function openPhoto(name, link) {
    photoPopupPic.src = link;
    photoPopupPic.alt = name;
    photoPopupCaption.textContent = name;
    openPhotoPopup();
}

function closePhotoPopup() {
    closePopup(popupOpenPhoto);
}

//открытие и закрытие попапа, добавляющего новую карточку
function openAddCardPopup() {
    cardFormValidator.resetValidation();
    formAddCard.reset();
    openPopup(popupAddCard);
    cardFormValidator.toggleButtonState();
}

function closeAddCardPopup() {
    closePopup(popupAddCard);
}

//добавление карточек
function createCard(name, link) {
    const newCard = new Card(name, link, openPhoto);
    const cardElement = newCard.generateCard();

    return cardElement;
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newCardData = createCard(cardInputCaption.value, cardInputPhoto.value);
    photosContainer.prepend(newCardData);
    closePopup(popupAddCard);
}

initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData.name, cardData.link);
    photosContainer.append(cardElement);
})

//закрытие попапов кликом на esc
function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}
//закрытие попапов кликом на overlay
function closePopupOverlay(evt, popup) {
    if (evt.target === evt.currentTarget) {
        closePopup(popup);
    }
}

function connectClosePopupByOverlayHandlers() {
    popups.forEach(popup => {
        popup.addEventListener('click', evt => closePopupOverlay(evt, popup))
    })
}
connectClosePopupByOverlayHandlers();

//слушатели
buttonEditProfile.addEventListener('click', openEditDataPopup);
profileCloseButton.addEventListener('click', closeEditDataPopup);
photoCloseButton.addEventListener('click', closePhotoPopup);
buttonAddCard.addEventListener('click', openAddCardPopup);
cardCloseButton.addEventListener('click', closeAddCardPopup);
formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', handleCardFormSubmit);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();