export class Card {
    constructor(name, link, cardSelector, openPhoto) {
        this._name = name;
        this._link = link;
        this._openPhoto = openPhoto;
        this._cardSelector = cardSelector;
    }
    //получаем темплейт
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }
    //метод создания карточек
    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.card__image');
        this._cardCaption = this._element.querySelector('.card__caption-text');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardCaption.textContent = this._name;
        this._buttonLikeCard = this._element.querySelector('.card__like-button');
        this._buttonDeleteCard = this._element.querySelector('.card__delete-button');

        this._setEventListeners();

        return this._element;
    }
    //метод лайка
    _putLike(evt) {
        evt.target.classList.toggle('card__like-button_active');
    }
    //метод удаления карточки
    _deleteCard(evt) {
        evt.target.closest(".card").remove();
    }
    //слушатели
    _setEventListeners() {
        this._buttonLikeCard.addEventListener('click', (evt) => {
            this._putLike(evt);
        });

        this._buttonDeleteCard.addEventListener('click', (evt) => {
            this._deleteCard(evt);
        });

        this._cardImage.addEventListener('click', () => {
            this._openPhoto (this._name, this._link);
        });
    }
}