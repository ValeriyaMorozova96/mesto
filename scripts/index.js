//открытие попапа
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
function openPopup() {
    popup.classList.add('popup_opened');
}
editButton.addEventListener('click', openPopup);

//закрытие попапа
const closeButton = document.querySelector('.popup__close-button');
function closePopup() {
    popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);

//редактирование информации в профиле и отправка формы
const formElement = document.querySelector('.form');
const nameInput = document.querySelector('.form__field_name-input');
const jobInput = document.querySelector('.form__field_job-input');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__description');
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileCaption.textContent = jobInput.value;
    closePopup();
}
formElement.addEventListener('submit', handleFormSubmit);
