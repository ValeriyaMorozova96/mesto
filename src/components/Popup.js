export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._byOverlayClose = this._byOverlayClose.bind(this);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        }
    }

    _byOverlayClose(evt) {
        if (evt.target == evt.currentTarget) {
            this.close()
        }
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('mousedown', this._byOverlayClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('mousedown', this._byOverlayClose);
    }

    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__close-button');

        closeButton.addEventListener('click', () => {
            this.close();
        })
    }
}