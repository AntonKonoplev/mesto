const popupTypeProfile = document.querySelector(".popup_type_profile");
const popupTypeProfileOpenBtn = document.querySelector(".profile__edit-button");
const popupTypeProfileCloseBtn =
  popupTypeProfile.querySelector(".popup__close");

const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardOpenBtn = document.querySelector(".profile__add-button");
const popupNewCardCloseBtn = popupNewCard.querySelector(".popup__close");

const popupImage = document.querySelector(".popup_type_image");
const popupImageOpenBtn = document.querySelector(".element__image");
const popupImageCloseBtn = popupImage.querySelector(".popup__close");

const popupFullImage = popupImage.querySelector(".popup__image");
const popupImageTitle = popupImage.querySelector(".popup__image-name");

const inputName = popupTypeProfile.querySelector(".popup__input_name");
const inputAboutMe = popupTypeProfile.querySelector(".popup__input_about-me");

const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");
const saveButton = popupTypeProfile.querySelector(
  ".popup__submit_type_profile"
);

const formTypeProfile = popupTypeProfile.querySelector(
  ".popup__form_type_profile"
);

const cards = document.querySelector(".element");
const templateCard = document.querySelector(".template-card");

const cardDeleteBtn = document.querySelector(".element__delete");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function createCard(element) {
  const newCard = templateCard.content.cloneNode(true);
  newCard.querySelector(".element__image").src = element.link;
  newCard.querySelector(".element__image").alt = element.name;
  newCard
    .querySelector(".element__delete")
    .addEventListener("click", deleteCard);
  newCard.querySelector(".element__name").textContent = element.name;
  newCard.querySelector(".element__like").addEventListener("click", likeToggle);
  newCard
    .querySelector(".element__image")
    .addEventListener("click", popupOpenImage);
  return newCard;
}

function addCard(element) {
  const newCard = createCard(element);
  cards.prepend(newCard);
}

initialCards.map(addCard);

//удаление карточки
function deleteCard(evt) {
  const elementCard = evt.target.closest(".element__card");
  elementCard.remove();
}

//лайк
function likeToggle(evt) {
  evt.target.classList.toggle("element__like_active");
}

//добавить карточку
const cardForm = document.querySelector(".popup__form_type_card");
cardForm.addEventListener("submit", addNewCard);

function addNewCard(event) {
  event.preventDefault();
  const newCardTitle = event.currentTarget.querySelector(
    ".popup__input_card-name"
  ).value;
  const newCardLink = event.currentTarget.querySelector(
    ".popup__input_card-link"
  ).value;
  toggleModal(popupNewCard);

  addCard({
    name: newCardTitle,
    link: newCardLink,
  });
}

//попап с карточкой
function popupOpenImage(event) {
  toggleModal(popupImage);
  popupFullImage.src = event.target.src;
  popupImageTitle.textContent =
    event.currentTarget.parentElement.querySelector(
      ".element__name"
    ).textContent;
  popupFullImage.alt =
    event.currentTarget.parentElement.querySelector(
      ".element__name"
    ).textContent;
}

function submifFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutMe.textContent = inputAboutMe.value;
  toggleModal(popupTypeProfile);
}
formTypeProfile.addEventListener("submit", submifFormProfile);

function inputFormProfile() {
  inputName.value = profileName.textContent;
  inputAboutMe.value = profileAboutMe.textContent;
}

popupTypeProfileOpenBtn.addEventListener("click", inputFormProfile);

//открытие/закрытие попапов

function toggleModal(modal) {
  modal.classList.toggle("popup_opened");
}

popupTypeProfileOpenBtn.addEventListener("click", () =>
  toggleModal(popupTypeProfile)
);
popupTypeProfileCloseBtn.addEventListener("click", () =>
  toggleModal(popupTypeProfile)
);
popupNewCardOpenBtn.addEventListener("click", () => toggleModal(popupNewCard));
popupNewCardCloseBtn.addEventListener("click", () => toggleModal(popupNewCard));
popupImageCloseBtn.addEventListener("click", () => toggleModal(popupImage));
