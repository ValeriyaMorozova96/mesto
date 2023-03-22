export class Card {
    constructor({ cardData, openPhoto, likePhoto, deletePhoto }, cardSelector, userId) {
        this._cardData = cardData;
        this._id = cardData._id;
        this._name = cardData.name;
        this._link = cardData.link;
        this._likes = cardData.likes;
        this._cardSelector = cardSelector;

        this._openPhoto = openPhoto;
        this._likePhoto = likePhoto;
        this._deletePhoto = deletePhoto;

        this._userId = userId;
        this._owner = cardData.owner._id;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.card__image');
        this._cardCaption = this._element.querySelector('.card__caption-text');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardCaption.textContent = this._name;
        this._buttonLikeCard = this._element.querySelector('.card__like-button');
        this._likeCount = this._element.querySelector('.card__like-count');
        this._likeCount.textContent = this._likes.length;
        this._buttonDeleteCard = this._element.querySelector('.card__delete-button');
        this._isCardOwner();
        this._toggleLikeButton();
        this._setEventListeners();
        return this._element;
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _isCardOwner() {
        if (!(this._owner === this._userId)) {
            this._buttonDeleteCard.remove();
        }
    }

    isLikeActive() {
        return this._likes.some((item) => this._userId === item._id);
    }

    _toggleLikeButton() {
        this._likeCount.textContent = this._likes.length;

        if (this.isLikeActive()) {
            this._buttonLikeCard.classList.add('card__like-button_active');
        } else {
            this._buttonLikeCard.classList.remove('card__like-button_active');
        }
    }

    toggleLike(update) {
        this._likes = update.likes;
        this._toggleLikeButton();
    }

    _setEventListeners() {
        this._buttonDeleteCard.addEventListener('click', () => {
            this._deletePhoto(this._cardData, () => {
                this.deleteCard();
            });
        });
        this._buttonLikeCard.addEventListener('click', () => {
            this._likePhoto();
        });
        this._cardImage.addEventListener('click', () => {
            this._openPhoto(this._name, this._link);
        });
    }
}

