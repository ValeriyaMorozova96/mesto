const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editDataPopup = document.querySelector('#editDataPopup');
const addCardPopup = document.querySelector('#addCardPopup')
const addCardForm = document.querySelector('#addCardForm')
const profileCloseButton = document.querySelector('.popup__close-button');
const cardCloseButton = document.querySelector('#cardCloseButton');
const photoCloseButton = document.querySelector('#photoCloseButton')
const formElement = document.querySelector('.form');
const nameInput = document.querySelector('.form__field_type_name');
const jobInput = document.querySelector('.form__field_type_job');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__description');
const photos = document.querySelector('.photos');
const photoPopup = document.querySelector('#openPhotoPopup');
const photoPopupPic = document.querySelector('.popup__photo');
const photoPopupCaption = document.querySelector('.popup__photo-caption');
const cardInputCaption = document.querySelector('.form__field_type_place');
const cardInputPhoto = document.querySelector('.form__field_type_image-link');

function createCard(el) {
    const templateElements = document.querySelector('#cards').content;
    const cardElement = templateElements.querySelector('.card').cloneNode(true);
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const photoButton = cardElement.querySelector('.card__image');
    cardElement.querySelector('.card__image').src = el.link;
    cardElement.querySelector('.card__caption-text').textContent = el.name;
    likeButton.addEventListener('click', (evt) => likePhoto(evt));
    deleteButton.addEventListener('click', (evt) => deleteCard(evt));
    photoButton.addEventListener('click', () => openPhoto(el.name, el.link));
    return cardElement;
}

initialCards.map(function (item) {
    photos.append(createCard(item));
});

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
    editDataPopup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileCaption.textContent;
}
editButton.addEventListener('click', openEditDataPopup);

function closeEditDataPopup() {
    editDataPopup.classList.remove('popup_opened');
}
profileCloseButton.addEventListener('click', closeEditDataPopup);

//редактирование информации в профиле и отправка формы
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileCaption.textContent = jobInput.value;
    closeEditDataPopup();
}
formElement.addEventListener('submit', handleFormSubmit);

//открытие и закрытие попапа с фотографией
function openPhotoPopup() {
    photoPopup.classList.add('popup_opened');
}

function openPhoto(name, link) {
    photoPopupPic.src = link;
    photoPopupCaption.textContent = name;
    openPhotoPopup();
}

function closePhotoPopup() {
    photoPopup.classList.remove('popup_opened');
}
photoCloseButton.addEventListener('click', closePhotoPopup);

//открытие и закрытие попапа, добавляющего новую карточку
function openAddCardPopup() {
    addCardPopup.classList.add('popup_opened');
    cardInputCaption.value = '';
    cardInputPhoto.value = '';

}
addButton.addEventListener('click', openAddCardPopup);

function closeAddCardPopup() {
    addCardPopup.classList.remove('popup_opened');
}
cardCloseButton.addEventListener('click', closeAddCardPopup);

//добавление новой карточки
function createNewCard() {
    newCardData = {
        name: cardInputCaption.value,
        link: cardInputPhoto.value
    };
    newElement = createCard(newCardData);
    photos.prepend(newElement);
    cardInputCaption.value = '';
    cardInputPhoto.value = '';
    closeAddCardPopup();
};
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    createNewCard();
};
addCardForm.addEventListener('submit', handleCardFormSubmit);

