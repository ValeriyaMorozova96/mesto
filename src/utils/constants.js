export const apiData = {
    url: "https://mesto.nomoreparties.co/v1/cohort-61",
    headers: {
        authorization: "9512f6eb-2c3f-4ba0-932f-a124d815c2ac",
        "Content-Type": "application/json",
    }
}
export const validationData = {
    formSelector: '.form',
    inputSelector: '.form__field',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__field_type_error'
};


const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonAvatar = document.querySelector('.profile__avatar');
const formAddCard = document.querySelector('#addCardForm');
const formEditProfile = document.querySelector('#formEditProfile');
const formChangeAvatar = document.querySelector('#formChangeAvatar')
const nameInput = document.querySelector('.form__field_type_name');
const jobInput = document.querySelector('.form__field_type_job');

export {
buttonEditProfile,
buttonAddCard,
buttonAvatar,
formAddCard,
formEditProfile,
formChangeAvatar,
nameInput,
jobInput
}