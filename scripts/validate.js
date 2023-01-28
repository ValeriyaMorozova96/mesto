const validationData = {
    formSelector: '.form',
    inputSelector: '.form__field',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__field_type_error'
};
//показать и скрыть сообщения об ошибке
const showInputError = (formElement, inputElement, errorMessage, validationData) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationData.inputErrorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, validationData) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationData.inputErrorClass);
    errorElement.textContent = '';
};

//проверка валидности
const isValid = (formElement, inputElement, validationData) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationData);
    } else {
        hideInputError(formElement, inputElement, validationData);
    }
};

//добавление слушателей
const setEventListeners = (formElement, validationData) => {
    const inputList = Array.from(formElement.querySelectorAll(validationData.inputSelector));
    const buttonElement = formElement.querySelector(validationData.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationData);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, validationData)
            toggleButtonState(inputList, buttonElement, validationData);
        });
    });
};

const enableValidation = (validationData) => {
    const formList = Array.from(document.querySelectorAll(validationData.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, validationData);
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};
//управление акивацией кнопки "сохранить"
const toggleButtonState = (inputList, buttonElement, validationData) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationData.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(validationData.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};

enableValidation(validationData);