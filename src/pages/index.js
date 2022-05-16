import "./index.css";
import { FormValidator } from "../components/FormValidator";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { popupImage } from "../utils/constants.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupWithSubmit } from "../components/PopupWithSubmit";
import { toLoad } from "../utils/utils.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-40/",
  headers: {
    authorization: "27789385-0169-454c-9851-9bc8d2576c3e",
    "content-type": "application/json",
  },
});

const template = ".template-card";

const popupTypeProfile = ".popup_type_profile";
const popupTypeProfileOpenBtn = document.querySelector(".profile__edit-button");

const popupNewCard = ".popup_type_new-card";
const popupNewCardOpenBtn = document.querySelector(".profile__add-button");

const popupEditAvatar = ".popup_type_avatar";
const popupEditAvatarBtn = document.querySelector(
  ".profile__avatar-edit-button"
);
const inputName = document.querySelector(".popup__input_name");
const inputAboutMe = document.querySelector(".popup__input_about-me");

const profileName = ".profile__name";
const profileAboutMe = ".profile__about-me";
const avatar = ".profile__avatar";

const addCardForm = document.querySelector(".popup__form_type_card");
const editForm = document.querySelector(".popup__form_type_profile");
const editAvatarForm = document.querySelector(".popup__form_type_avatar");

let userId;

const popupDelete = ".popup_type_deleteCard";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_invalid",
  inputErrorClass: "popup__input_state_invalid",
};

const deleteCard = (data) => {
  deleteCardPopup.data = data;
  deleteCardPopup.open();
};

const editProfileValidator = new FormValidator(validationConfig, editForm);
const addCardValidator = new FormValidator(validationConfig, addCardForm);
const avatarValidator = new FormValidator(validationConfig, editAvatarForm);

const popupImageFull = new PopupWithImage(popupImage);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
avatarValidator.enableValidation();

const createCard = (data) => {
  const card = new Card(
    {
      data,
      popupOpenImage: () => {
        popupImageFull.open(data);
      },
      userId,
      deleteCard,
      addCardLike(data) {
        return api.addCardLike(data);
      },
      deleteCardLike(data) {
        return api.deleteCardLike(data);
      },
    },
    template
  );
  const newCard = card.createCard();
  return newCard;
};

//Попап с подтверждением
const deleteCardPopup = new PopupWithSubmit(popupDelete, {
  formSubmitHandler: (data) => {
    api
      .deleteCard(data.cardId)
      .then(() => {
        data.card.remove();
        deleteCardPopup.close();
      })
      .catch((err) => console.log(err));
  },
});

const cardList = new Section(
  {
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  ".element"
);

//Добавление новой карточки
const popupFormCard = new PopupWithForm(popupNewCard, {
  formSubmitHandler: (data) => {
    toLoad(popupNewCard, true);
    const newCardApi = {
      name: data.name,
      link: data.link,
    };

    const postCardApi = api.postCard(newCardApi);
    postCardApi
      .then(() => {
        toLoad(popupNewCard, false);
        return newCardApi.createCard;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        toLoad(popupNewCard, false);
      });
  },
});

//редактирование профиля
const popupFormProfile = new PopupWithForm(popupTypeProfile, {
  formSubmitHandler: (data) => {
    toLoad(popupTypeProfile, true);
    api
      .editUser(data)
      .then((res) => {
        user.setUserInfo(res);
        toLoad(popupTypeProfile, false);
        popupFormProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        toLoad(popupNewCard, false);
      });
  },
});

//редактирование аватара
const editAvatar = new PopupWithForm(popupEditAvatar, {
  formSubmitHandler: (data) => {
    api
      .editAvatar(data)
      .then((res) => {
        user.setUserInfo(res);
        editAvatar.close();
      })
      .catch((err) => console.log(err));
  },
});

const user = new UserInfo({
  nameSelector: profileName,
  aboutMeSelector: profileAboutMe,
  avatarSelector: avatar,
});

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([data, cards]) => {
    userId = data._id;
    user.setUserInfo(data);
    cardList.rendererItems(cards);
  })
  .catch((err) => console.log(err));

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

popupEditAvatarBtn.addEventListener("click", () => {
  editAvatar.open();
});

popupFormCard.setEventListeners();
popupImageFull.setEventListeners();
popupFormProfile.setEventListeners();
editAvatar.setEventListeners();
deleteCardPopup.setEventListeners();
