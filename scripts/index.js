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
const buttonSubmitProfile = document.querySelector('#buttonSubmitProfile');
const buttonSubmitAddCard = document.querySelector('#buttonSubmitAddCard');
const cardTemplate = document.querySelector('#cards').content;
const cardElement = cardTemplate.querySelector('.card');

//создание карточек
function createCard(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const buttonLikeCard = cardElement.querySelector('.card__like-button');
    const buttonDeleteCard = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardCaption = cardElement.querySelector('.card__caption-text');
    cardImage.src = cardData.link;
    cardCaption.textContent = cardData.name;
    cardImage.alt = cardData.name;
    buttonLikeCard.addEventListener('click', (evt) => likePhoto(evt));
    buttonDeleteCard.addEventListener('click', (evt) => deleteCard(evt));
    cardImage.addEventListener('click', () => openPhoto(cardData.name, cardData.link));
    return cardElement;
}
//открытие и закрытие попапов
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc)
};

//лайк фото
function likePhoto(evt) {
    evt.target.classList.toggle('card__like-button_active');
}

//удаление карточки
function deleteCard(evt) {
    const removedCard = evt.target.closest('.card');
    removedCard.remove();
}

//открытие и закрытие попапа, редактирующего профиль
function openEditDataPopup() {
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
    formAddCard.reset();
    openPopup(popupAddCard);
    buttonSubmitAddCard.classList.add('form__submit-button_disabled')
    buttonSubmitAddCard.setAttribute("disabled", true);
}

function closeAddCardPopup() {
    closePopup(popupAddCard);
}

//добавление новой карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newCardData = {
        name: cardInputCaption.value,
        link: cardInputPhoto.value
    };
    const newCard = createCard(newCardData);
    photosContainer.prepend(newCard);
    closePopup(popupAddCard);
}

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

initialCards.map(function (cardData) {
    photosContainer.append(createCard(cardData));
});