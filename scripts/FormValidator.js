export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;

    this._buttonElement = this._form.querySelector(
      this._settings.submitButtonSelector
    );
  }

  //показ ошибки
  _showError(errorElement, inputElement) {
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  //скрытие ошибки
  _hideError(errorElement, inputElement) {
    inputElement.classList.remove(this._settings.inputErrorClass);
    inputElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showError(errorElement, inputElement);
    } else {
      this._hideError(errorElement, inputElement);
    }
  }

  _toggleButtonState(button, isActive) {
    if (isActive) {
      button.classList.remove(this._settings.inactiveButtonClass);
      button.disabled = false;
    } else {
      button.classList.add(this._settings.inactiveButtonClass);
      button.disabled = true;
    }
  }

  _setEventListers() {
    const inputsList = this._form.querySelectorAll(
      this._settings.inputSelector
    );
    const submitButton = this._form.querySelector(
      this._settings.submitButtonSelector
    );
    const isFormValid = this._form.checkValidity();
    this._toggleButtonState(submitButton, isFormValid, this._settings);

    Array.from(inputsList).forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        const isFormValid = this._form.checkValidity();
        this._checkInputValidity(inputElement);
        this._toggleButtonState(submitButton, isFormValid, this._settings);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListers();
  }

  disableSubmitButton = () => {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.disabled = true;
  };
}
