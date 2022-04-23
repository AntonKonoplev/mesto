import { openPopup } from "./utils.js";
import { popupFullImage, popupImageTitle, popupImage } from "./constants.js";

export class Card {
  constructor(data, cardSelector) {
    this._templateCard = document.querySelector(cardSelector).content;
    this._name = data.name;
    this._link = data.link;
  }

  _getElement() {
    this._element = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element-card")
      .cloneNode(true);
  }

  _likeToggle = (evt) => {
    evt.target.classList.toggle("element__like_active");
  };

  _deleteCard = () => {
    this._newCard.remove();
  };

  _popupOpenImage(event) {
    openPopup(popupImage);

    popupFullImage.src = event.target.src;
    popupImageTitle.textContent =
      event.currentTarget.parentElement.querySelector(
        ".element__name"
      ).textContent;
    popupFullImage.alt =
      event.currentTarget.parentElement.querySelector(
        ".element__name"
      ).textContent;
  }

  _setEventListeners() {
    this._newCard
      .querySelector(".element__delete")
      .addEventListener("click", this._deleteCard);
    this._newCard
      .querySelector(".element__like")
      .addEventListener("click", this._likeToggle);
    this._newCard
      .querySelector(".element__image")
      .addEventListener("click", this._popupOpenImage);
  }

  createCard() {
    this._newCard = this._templateCard
      .querySelector(".element__card")
      .cloneNode(true);
    this._newCard.querySelector(".element__image").src = this._link;
    this._newCard.querySelector(".element__image").alt = this._name;
    this._newCard.querySelector(".element__name").textContent = this._name;

    this._setEventListeners();

    return this._newCard;
  }
}
