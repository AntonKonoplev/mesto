export function toLoad(popup, loading) {
  const saveLoadingButton = document
    .querySelector(popup)
    .querySelector(".popup__submit");

  if (loading) {
    saveLoadingButton.value = "Сохранение";
  } else {
    saveLoadingButton.value = "Сохранить";
  }
}
