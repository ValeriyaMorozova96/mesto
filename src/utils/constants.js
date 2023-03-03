export const initialCards = [
    {
        name: 'Италия',
        link: 'https://images.unsplash.com/photo-1674455185136-c2dca6249cd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
    },
    {
        name: 'Египет',
        link: 'https://images.unsplash.com/photo-1672489055697-8612ac2ed2fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
    },
    {
        name: 'Португалия',
        link: 'https://images.unsplash.com/photo-1625223181444-128aab274266?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
    },
    {
        name: 'США',
        link: 'https://images.unsplash.com/photo-1669266007069-9eaf210e59a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
    },
    {
        name: 'Исландия',
        link: 'https://images.unsplash.com/photo-1674729215824-9659ed4294d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
    },
    {
        name: 'Россия',
        link: 'https://images.unsplash.com/photo-1670160031427-dd6a22c737cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
    }
];

export const validationData = {
    formSelector: '.form',
    inputSelector: '.form__field',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__field_type_error'
};


const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const formAddCard = document.querySelector('#addCardForm')
const formEditProfile = document.querySelector('#formEditProfile')
const nameInput = document.querySelector('.form__field_type_name');
const jobInput = document.querySelector('.form__field_type_job');
const cardInputCaption = document.querySelector('.form__field_type_place');
const cardInputPhoto = document.querySelector('.form__field_type_image-link');

export {
buttonEditProfile,
buttonAddCard,
formAddCard,
formEditProfile,
nameInput,
jobInput,
cardInputCaption ,
cardInputPhoto
}