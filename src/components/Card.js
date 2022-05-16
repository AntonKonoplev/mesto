export class Card {
  constructor(
    { data, popupOpenImage, userId, deleteCard, addCardLike, deleteCardLike },
    cardSelector
  ) {
    this._data = data;
    this._templateCard = document.querySelector(cardSelector).content;
    this._name = data.name;
    this._link = data.link;
    this._popupOpenImage = popupOpenImage;
    this._cardId = data._id;
    this._userId = userId;
    this._cardOwnerId = data.owner._id;
    this._deleteCard = deleteCard;
    this._addCardLike = addCardLike;
    this._deleteCardLike = deleteCardLike;
  }

  _likeToggle = () => {
    if (!this._likeButton.classList.contains("element__like_active")) {
      this._addCardLike(this._cardId)
        .then((res) => {
          this._data = res;
          this._newCard.querySelector(".element__like-meter").textContent =
            res.likes.length;
        })
        .catch((err) => console.log(err));
      this._newCard
        .querySelector(".element__like")
        .classList.add("element__like_active");
    } else {
      this._deleteCardLike(this._cardId)
        .then((res) => {
          this._data = res;
          this._newCard.querySelector(".element__like-meter").textContent =
            res.likes.length;
          this._likeButton.classList.remove("element__like_active");
        })
        .catch((err) => console.log(err));
    }
  };

  _isLiked() {
    if (this._data.likes.some((elem) => elem._id === this._userId)) {
      this._likeButton.classList.add("element__like_active");
    }
  }

  _cardDelete = () => {
    const data = {
      card: this._newCard,
      cardId: this._cardId,
    };
    this._deleteCard(data);
  };

  _setEventListeners() {
    if (this._cardOwnerId === this._userId) {
      this._deleteButton.classList.add("element__delete_active");
      this._deleteButton.addEventListener("click", () =>
        this._cardDelete(this)
      );
    }

    this._likeButton.addEventListener("click", () => this._likeToggle());

    this._newCard
      .querySelector(".element__image")
      .addEventListener("click", () => this._popupOpenImage());
  }

  createCard() {
    this._newCard = this._templateCard
      .querySelector(".element__card")
      .cloneNode(true);
    this._newCard.querySelector(".element__image").src = this._link;
    this._newCard.querySelector(".element__image").alt = this._name;
    this._newCard.querySelector(".element__name").textContent = this._name;
    this._likeButton = this._newCard.querySelector(".element__like");
    this._deleteButton = this._newCard.querySelector(".element__delete");
    this._newCard.querySelector(".element__like-meter").textContent =
      this._data.likes.length;
    this._isLiked();
    this._setEventListeners();

    return this._newCard;
  }
}
