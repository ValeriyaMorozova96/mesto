
import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._formInputList = this._form.querySelectorAll('.form__field ');
        this._handleFormSubmit = handleFormSubmit;
        this._submitButton = this._form.querySelector('.form__submit-button');
        this._submitButtonText = this._submitButton.textContent;
    }

    _getInputValues() {
        this._inputValues = {};

        this._formInputList.forEach((item) => {
            this._inputValues[item.name] = item.value;
        });
        return this._inputValues;
    }

    setInputValues(data) {
        this._formInputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
        super.setEventListeners();
    }

    savingOn() {
        this._submitButton.textContent = 'Сохранение...'
    }

    savingOff() {
        this._submitButton.textContent = this._submitButtonText
    }

    close() {
        super.close();
        this._form.reset();
    }
}
