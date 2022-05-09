import "./index.css";
import { FormValidator } from "../components/FormValidator";
import { initialCards } from "../utils/initialCards.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { popupImage } from "../utils/constants.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const template = ".template-card";

const popupTypeProfile = ".popup_type_profile";
const popupTypeProfileOpenBtn = document.querySelector(".profile__edit-button");

const popupNewCard = ".popup_type_new-card";
const popupNewCardOpenBtn = document.querySelector(".profile__add-button");

const inputName = document.querySelector(".popup__input_name");
const inputAboutMe = document.querySelector(".popup__input_about-me");

const profileName = ".profile__name";
const profileAboutMe = ".profile__about-me";

const addCardForm = document.querySelector(".popup__form_type_card");
const editForm = document.querySelector(".popup__form_type_profile");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_invalid",
  inputErrorClass: "popup__input_state_invalid",
};

const editProfileValidator = new FormValidator(validationConfig, editForm);
const addCardValidator = new FormValidator(validationConfig, addCardForm);

const popupImageFull = new PopupWithImage(popupImage);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

const createCard = (data) => {
  const card = new Card(
    {
      data,
      popupOpenImage: () => {
        popupImageFull.open(data);
      },
    },
    template
  );
  const newCard = card.createCard();
  return newCard;
};

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  ".element"
);

cardList.rendererItems();

const popupFormCard = new PopupWithForm(popupNewCard, {
  formSubmitHandler: (data) => {
    const item = createCard(data);
    cardList.addItem(item);
  },
});

const popupFormProfile = new PopupWithForm(popupTypeProfile, {
  formSubmitHandler: (data) => {
    user.setUserInfo(data);
    popupFormProfile.close();
  },
});

const user = new UserInfo({
  nameSelector: profileName,
  aboutMeSelector: profileAboutMe,
});

popupTypeProfileOpenBtn.addEventListener("click", () => {
  const { name, aboutMe } = user.getUserInfo();
  inputName.value = name;
  inputAboutMe.value = aboutMe;
  popupFormProfile.open();
});

popupNewCardOpenBtn.addEventListener("click", () => {
  addCardValidator.disableSubmitButton();
  popupFormCard.open();
});

popupFormCard.setEventListeners();
popupImageFull.setEventListeners();
popupFormProfile.setEventListeners();
