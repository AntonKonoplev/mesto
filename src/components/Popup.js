export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closePopupClickOverlay = this._closePopupClickOverlay.bind(this);
    this.close = this.close.bind(this);
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupSelector.removeEventListener(
      "mousedown",
      this._closePopupClickOverlay
    );
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._popupSelector.addEventListener(
      "mousedown",
      this._closePopupClickOverlay
    );
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  _closePopupClickOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      this.close(evt.target);
    }
  }

  setEventListeners() {
    this._popupSelector
      .querySelector(".popup__close")
      .addEventListener("click", this.close);
  }
}
