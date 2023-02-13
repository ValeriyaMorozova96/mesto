export const validationData = {
    formSelector: '.form',
    inputSelector: '.form__field',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__field_type_error'
};

export class FormValidator {
    constructor(validationData, formElement) {
        this._validationData = validationData;
        this._formElement = formElement;
        this._buttonElement = this._formElement.querySelector(this._validationData.submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._validationData.inputSelector));
    }
    //показать и скрыть сообщения об ошибке
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._validationData.inputErrorClass);
        errorElement.textContent = errorMessage;
    }
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._validationData.inputErrorClass);
        errorElement.textContent = '';
    }
    //проверка валидности
    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }
    //проверка валидности инпутов
    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    //управление акивацией кнопки "сохранить"
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._validationData.inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(this._validationData.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    }
    //очистка ошибок валидации
    resetValidation() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }
    //слушатели
    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            });
        });
    }
    enableValidation() {
        this._setEventListeners();
    }
}