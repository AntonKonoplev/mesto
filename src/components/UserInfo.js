export class UserInfo {
  constructor({ nameSelector, aboutMeSelector, avatarSelector, profileId }) {
    this._name = document.querySelector(nameSelector);
    this._aboutMe = document.querySelector(aboutMeSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._profileId = profileId;
  }
  getUserInfo() {
    const user = {
      name: this._name.textContent,
      aboutMe: this._aboutMe.textContent,
      avatar: this._avatarSelector,
    };
    return user;
  }
  setUserInfo(user) {
    this._name.textContent = user.name;
    this._aboutMe.textContent = user.about;
    this._avatar.src = user.avatar;
  }
}
