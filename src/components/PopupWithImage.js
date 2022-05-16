import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageName = this._popupSelector.querySelector(".popup__image-name");
    this._image = this._popupSelector.querySelector(".popup__image");
  }
  open({ link, name }) {
    this._image.src = link;
    this._image.alt = name;
    this._imageName.textContent = name;
    super.open();
  }
}
