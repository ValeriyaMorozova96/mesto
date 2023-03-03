
import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._formInputList = this._form.querySelectorAll('.form__field ');
        this._handleFormSubmit = handleFormSubmit;
        this.setEventListeners();
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

    close() {
        super.close();
        this._form.reset();
    }
}
