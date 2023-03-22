import { Popup } from './Popup.js';

export class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._submitButton = this._form.querySelector('.form__submit-button');
        this._confirmation = () => {};
        super.setEventListeners();
    }
    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._confirmation();
        })
    }
    setConfirmation(confirm) {
        this._confirmation = confirm;
    }
    deletingOn() {
        this._submitButton.textContent = 'Удаление...'
    }

    deletingOff() {
        this._submitButton.textContent = 'Да'  
    }
}