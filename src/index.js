import "../src/styles/index.css";
import { FormValidator } from "../src/scripts/FormValidator";
import { initialCards } from "../src/scripts/initialCards.js";
import { Card } from "../src/scripts/Card.js";
import { Section } from "../src/scripts/Section.js";
import { Popup } from "../src/scripts/Popup.js";
import { popupImage } from "../src/scripts/constants.js";
import { PopupWithImage } from "../src/scripts/PopupWithImage.js";
import { PopupWithForm } from "../src/scripts/PopupWithForm.js";
import { UserInfo } from "../src/scripts/UserInfo.js";

const template = ".template-card";

const popupTypeProfile = document.querySelector(".popup_type_profile");
const popupTypeProfileOpenBtn = document.querySelector(".profile__edit-button");

const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardOpenBtn = document.querySelector(".profile__add-button");

const inputName = popupTypeProfile.querySelector(".popup__input_name");
const inputAboutMe = popupTypeProfile.querySelector(".popup__input_about-me");

const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");

const cardForm = popupNewCard.querySelector(".popup__form_type_card");

const newCardTitle = popupNewCard.querySelector(".popup__input_card-name");
const newCardLink = popupNewCard.querySelector(".popup__input_card-link");

const cards = document.querySelector(".element");

const addCardForm = popupNewCard.querySelector(".popup__form_type_card");
const editForm = popupTypeProfile.querySelector(".popup__form_type_profile");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_invalid",
  inputErrorClass: "popup__input_state_invalid",
};

const editProfileValidator = new FormValidator(validationConfig, editForm);
const addCardValidator = new FormValidator(validationConfig, addCardForm);

const popupProfile = new Popup(popupTypeProfile);
const popupCard = new Popup(popupNewCard);

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

function addCard(data) {
  const newCard = createCard(data);

  cards.prepend(newCard);
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
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
      cardList.addItem(newCard);
    },
  },
  ".element"
);

cardList.rendererItems();

const popupFormCard = new PopupWithForm(popupNewCard, {
  formSubmitHandler: () => {
    const item = createCard({
      name: newCardTitle.value,
      link: newCardLink.value,
    });
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

//добавить карточку
cardForm.addEventListener("submit", addNewCard);

function addNewCard(event) {
  event.preventDefault();

  popupCard.close(popupNewCard);

  addCard({
    name: newCardTitle.value,
    link: newCardLink.value,
  });

  //очистка формы
  event.currentTarget.reset();
}

popupTypeProfileOpenBtn.addEventListener("click", () => {
  const { name, aboutMe } = user.getUserInfo();
  inputName.value = name;
  inputAboutMe.value = aboutMe;
  popupFormProfile.open();
});

popupNewCardOpenBtn.addEventListener("click", () => {
  addCardValidator.disableSubmitButton();
  popupCard.open();
});

popupFormCard.setEventListeners();
popupImageFull.setEventListeners();
popupFormProfile.setEventListeners();
popupProfile.setEventListeners();
popupCard.setEventListeners();
