export function openPopup(modal) {
  modal.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupClickEsc);
  modal.addEventListener("mousedown", closePopupClickOverlay);
}

export function closePopupClickEsc(evt) {
  if (evt.key === "Escape") {
    const popupClose = document.querySelector(".popup_opened");
    if (popupClose) {
      closePopup(popupClose);
    }
  }
}

export function closePopupClickOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

export function closePopup(modal) {
  document.removeEventListener("keydown", closePopupClickEsc);
  modal.removeEventListener("mousedown", closePopupClickOverlay);
  modal.classList.remove("popup_opened");
}
