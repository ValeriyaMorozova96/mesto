import './index.css';
import {
    validationData,
    apiData,
    buttonEditProfile,
    buttonAddCard,
    buttonAvatar,
    formAddCard,
    formEditProfile,
    formChangeAvatar
} from '../utils/constants.js';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

//валидация форм
const profileFormValidator = new FormValidator(validationData, formEditProfile);
const cardFormValidator = new FormValidator(validationData, formAddCard);
const avatarFormValidator = new FormValidator(validationData, formChangeAvatar)
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

//Api
const api = new Api(apiData);

//профайл пользователя
const userProfile = new UserInfo({
    name: '.profile__name',
    description: '.profile__description',
    avatar: '.profile__avatar'
});

//попап изменения профиля
const popupEditProfile = new PopupWithForm('#editDataPopup', handleProfileFormSubmit);

//попап добавления карточки
const popupAddCard = new PopupWithForm('#addCardPopup', handleCardFormSubmit);

//попап изменения аватара
const popupChangeAvatar = new PopupWithForm('#changeAvatarPopup', handleAvatarFormSubmit)

//попап подтверждения удаления
const popupConfirmDelete = new PopupWithConfirm('#confirmDeletePopup');

//попап открытия фото
const popupOpenPhoto = new PopupWithImage('#openPhotoPopup');

let userId;

//промис
Promise.all([api.getMyInfo(), api.getServerCards()])
    .then(([userData, items]) => {
        userId = userData._id
        userProfile.setUserInfo(userData);
        userProfile.setUserAvatar(userData);
        photos.renderItems(items);
    })
    .catch((err) => {
        console.log('Ошибка', err);
    })

//создание карточек
function createCard(cardData) {
    const newCard = new Card({
        cardData,
        openPhoto: openPhoto,
        likePhoto: () => {
            if (!newCard.isLikeActive()) {
                api.putLike(cardData._id)
                    .then(cardData => newCard.toggleLike(cardData))
                    .catch((err) => {
                        console.log('Ошибка', err);
                    })
            } else {
                api.deleteLike(cardData._id)
                    .then(cardData => newCard.toggleLike(cardData))
                    .catch((err) => {
                        console.log('Ошибка', err);
                    })
            }
        },
        deletePhoto: () => {
            popupConfirmDelete.open();
            popupConfirmDelete.setConfirmation(() => {
                popupConfirmDelete.deletingOn()
                api.deleteCard(cardData._id)
                    .then(() => {
                        newCard.deleteCard();
                        popupConfirmDelete.close();
                    })
                    .catch((err) => {
                        console.log('Ошибка', err);
                    })
                    .finally(() => popupConfirmDelete.deletingOff())
            });
        }
    }, '#cards', userId);
    return newCard.generateCard();
}

const photos = new Section({
    renderer: (cardData) => {
        photos.addItem(createCard(cardData));
    },
}, '.photos');

function handleCardFormSubmit(newCardData) {
    popupAddCard.savingOn();
    api.addNewCard({ name: newCardData.place, link: newCardData.link })
        .then((res) => {
            photos.addItem(createCard(res));
            popupAddCard.close();
        })
        .catch((err) => {
            console.log('Ошибка', err);
        })
        .finally(() => popupAddCard.savingOff())
};

//открытие фото
function openPhoto(name, link) {
    popupOpenPhoto.open(name, link);
}

//изменить аватар
function handleAvatarFormSubmit({ avatar }) {
    popupChangeAvatar.savingOn();
    api.changeProfileAvatar({ avatar: avatar })
        .then((userData) => {
            userProfile.setUserAvatar(userData);
            popupChangeAvatar.close();
        })
        .catch((err) => {
            console.log('Ошибка', err);
        })
        .finally(() => popupChangeAvatar.savingOff())
}

//профайл пользователя
function getData() {
    const profileData = userProfile.getUserInfo();
    popupEditProfile.setInputValues(profileData);
}

function handleProfileFormSubmit({ name, about }) {
    popupEditProfile.savingOn();
    api.changeProfileData({ name: name, about: about })
        .then((userData) => {
            userProfile.setUserInfo(userData);
            popupEditProfile.close();
        })
        .catch((err) => {
            console.log('Ошибка', err);
        })
        .finally(() => popupEditProfile.savingOff())
}

//слушатели на попапы
popupConfirmDelete.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupChangeAvatar.setEventListeners();


//слушатели на кнопки открытия попапов
buttonEditProfile.addEventListener('click', () => {
    profileFormValidator.resetValidation();
    popupEditProfile.open();
    getData()
})

buttonAddCard.addEventListener('click', () => {
    popupAddCard.open();
    cardFormValidator.resetValidation();
    cardFormValidator.toggleButtonState();
})

buttonAvatar.addEventListener('click', () => {
    popupChangeAvatar.open();
    avatarFormValidator.toggleButtonState();
    avatarFormValidator.resetValidation();
})