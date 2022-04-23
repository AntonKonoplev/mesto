import { popupImage } from "./constants.js";
import { openPopup, closePopup } from "./utils.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initialCards.js";
import { Card } from "./Card.js";

const template = ".template-card";

const popupTypeProfile = document.querySelector(".popup_type_profile");
const popupTypeProfileOpenBtn = document.querySelector(".profile__edit-button");
const popupTypeProfileCloseBtn =
  popupTypeProfile.querySelector(".popup__close");

const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardOpenBtn = document.querySelector(".profile__add-button");
const popupNewCardCloseBtn = popupNewCard.querySelector(".popup__close");

const popupImageCloseBtn = popupImage.querySelector(".popup__close");

const inputName = popupTypeProfile.querySelector(".popup__input_name");
const inputAboutMe = popupTypeProfile.querySelector(".popup__input_about-me");

const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");

const cardForm = popupNewCard.querySelector(".popup__form_type_card");
const formTypeProfile = popupTypeProfile.querySelector(
  ".popup__form_type_profile"
);

const cards = document.querySelector(".element");

//валидация
const addCardForm = popupNewCard.querySelector(".popup__form_type_card");
const editForm = popupTypeProfile.querySelector(".popup__form_type_profile");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_invalid",
  inputErrorClass: "popup__input_state_invalid",
};

const editProfileValidator = new FormValidator(validationConfig, addCardForm);
const addCardValidator = new FormValidator(validationConfig, editForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

function addCard(data) {
  const card = new Card(data, template);
  const newCard = card.createCard();

  cards.prepend(newCard);
}

initialCards.map(addCard);

//добавить карточку
cardForm.addEventListener("submit", addNewCard);

function addNewCard(event) {
  event.preventDefault();
  const newCardTitle = event.currentTarget.querySelector(
    ".popup__input_card-name"
  ).value;
  const newCardLink = event.currentTarget.querySelector(
    ".popup__input_card-link"
  ).value;
  closePopup(popupNewCard);

  addCard({
    name: newCardTitle,
    link: newCardLink,
  });

  //очистка формы
  event.currentTarget.reset();
}

function submifFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutMe.textContent = inputAboutMe.value;
  closePopup(popupTypeProfile);
}
formTypeProfile.addEventListener("submit", submifFormProfile);

function inputFormProfile() {
  inputName.value = profileName.textContent;
  inputAboutMe.value = profileAboutMe.textContent;
}

popupTypeProfileOpenBtn.addEventListener("click", inputFormProfile);

popupTypeProfileOpenBtn.addEventListener("click", () =>
  openPopup(popupTypeProfile)
);
popupTypeProfileCloseBtn.addEventListener("click", () =>
  closePopup(popupTypeProfile)
);
popupNewCardOpenBtn.addEventListener("click", () => openPopup(popupNewCard));
popupNewCardCloseBtn.addEventListener("click", () => closePopup(popupNewCard));
popupImageCloseBtn.addEventListener("click", () => closePopup(popupImage));
