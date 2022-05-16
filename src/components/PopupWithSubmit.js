import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor(popupSelector, { formSubmitHandler }) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popupSelector.querySelector(".popup__form");
    this._submit = this._submit.bind(this);
  }

  _submit(evt) {
    evt.preventDefault();
    this._formSubmitHandler(this.data);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submit);
  }
}
