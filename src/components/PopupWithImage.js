import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPhoto = this._popup.querySelector('.popup__photo')
        this._popupPhotoCaption = this._popup.querySelector('.popup__photo-caption');
        super.setEventListeners();
    }
    open(name, link) {
        this._popupPhoto.src = link;
        this._popupPhoto.alt = name;
        this._popupPhotoCaption.textContent = name;
        super.open();
    }
}