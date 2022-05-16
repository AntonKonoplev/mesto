import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { formSubmitHandler }) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._popupForm = this._popupSelector.querySelector(".popup__form");
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(".popup__input")
    );
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  close() {
    super.close();
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues());
      this.close();
    });
  }
}
