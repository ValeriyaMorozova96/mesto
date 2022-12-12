const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.form');
const nameInput = document.querySelector('.form__field_type_name');
const jobInput = document.querySelector('.form__field_type_job');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__description');
//открытие попапа
function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileCaption.textContent;
}
editButton.addEventListener('click', openPopup);

//закрытие попапа 
function closePopup() {
    popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);

//редактирование информации в профиле и отправка формы
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileCaption.textContent = jobInput.value;
    closePopup();
}
formElement.addEventListener('submit', handleFormSubmit);
