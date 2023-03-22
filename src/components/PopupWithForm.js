
import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._formInputList = this._form.querySelectorAll('.form__field ');
        this._handleFormSubmit = handleFormSubmit;
        this._submitButton = this._form.querySelector('.form__submit-button')
    }

    _getInputValues() {
        this._inputValues = {};

        this._formInputList.forEach((item) => {
            this._inputValues[item.name] = item.value;
        });
        return this._inputValues;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        })
        super.setEventListeners();
    }

    savingOn() {
        this._submitButton.textContent = 'Сохранение...'
    }

    savingOff() {
        this._submitButton.textContent = 'Сохранить'  
    }

    close() {
        super.close();
        this._form.reset();
    }
}
