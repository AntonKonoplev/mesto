const popup = document.querySelector('.popup')
const popupOpenBtn = document.querySelector('.profile__edit-button')
const popupCloseBtn = popup.querySelector('.popup__close')

let inputName = popup.querySelector('.popup__form-username') 
let inputAboutMe = popup.querySelector('.popup__form-about-me')

let profileName = document.querySelector('.profile__name')
let profileAboutMe = document.querySelector('.profile__about-me')
let saveButton = popup.querySelector('.popup__form-save')

let form = popup.querySelector('.popup__form')

function popupToogle() {
    popup.classList.toggle('popup_opened')
}

popupOpenBtn.addEventListener('click', popupToogle)
popupCloseBtn.addEventListener('click', popupToogle)

function formSubmitHandler (evt) {
    evt.preventDefault()
    profileName.textContent = inputName.value
    profileAboutMe.textContent = inputAboutMe.value
    saveButton.addEventListener('click', popupToogle)
}
form.addEventListener('submit', formSubmitHandler); 

function formProfile () {
    inputName.value = profileName.textContent
    inputAboutMe.value = profileAboutMe.textContent
}

popupOpenBtn.addEventListener('click', formProfile)

