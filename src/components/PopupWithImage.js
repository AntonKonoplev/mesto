import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open({ link, name }) {
    this._popupSelector.querySelector(".popup__image-name").textContent = name;
    const image = this._popupSelector.querySelector(".popup__image");
    image.src = link;
    image.alt = name;
    super.open();
  }
}
