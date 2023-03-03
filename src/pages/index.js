import './index.css';
import {
    initialCards,
    validationData,
    buttonEditProfile,
    buttonAddCard,
    formAddCard,
    formEditProfile,
    nameInput,
    jobInput,
    cardInputCaption,
    cardInputPhoto
} from '../utils/constants.js';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

//валидация форм
const profileFormValidator = new FormValidator(validationData, formEditProfile);
const cardFormValidator = new FormValidator(validationData, formAddCard);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

//попап изменения профиля
const popupEditProfile = new PopupWithForm('#editDataPopup', handleProfileFormSubmit);

//попап добавления карточки
const popupAddCard = new PopupWithForm('#addCardPopup', handleCardFormSubmit);

//попап открытия фото
const popupOpenPhoto = new PopupWithImage('#openPhotoPopup');

function openPhoto(name, link) {
    popupOpenPhoto.open(name, link);
}

//профайл пользователя
const userProfile = new UserInfo({
    name: '.profile__name',
    description: '.profile__description'
});

function getData () {
    const profileData = userProfile.getUserInfo();
    nameInput.value = profileData.name;
    jobInput.value = profileData.description;
}

function handleProfileFormSubmit() {
    userProfile.setUserInfo(nameInput.value, jobInput.value);
}

buttonEditProfile.addEventListener('click', () => {
    profileFormValidator.resetValidation();
    popupEditProfile.open();
    getData()
})


//добавление карточек
const photos = new Section({
    items: initialCards,
    renderer: (item) => {
        addCard(createCard(item.name, item.link));
    },
}, '.photos');

function createCard(name, link) {
    const newCard = new Card(name, link, '#cards', openPhoto);
    const cardElement = newCard.generateCard();

    return cardElement;
}

function handleCardFormSubmit() {
    const newCardData = createCard(cardInputCaption.value, cardInputPhoto.value);
    addCard(newCardData);
}

function addCard(cardElement) {
    photos.addItem(cardElement);
}
photos.renderItems();

buttonAddCard.addEventListener('click', () => {
    popupAddCard.open();
    cardFormValidator.resetValidation();
    cardFormValidator.toggleButtonState(); 
})

