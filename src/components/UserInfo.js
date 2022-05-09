export class UserInfo {
  constructor({ nameSelector, aboutMeSelector }) {
    this._name = document.querySelector(nameSelector);
    this._aboutMe = document.querySelector(aboutMeSelector);
  }
  getUserInfo() {
    const user = {
      name: this._name.textContent,
      aboutMe: this._aboutMe.textContent,
    };
    return user;
  }
  setUserInfo(user) {
    this._name.textContent = user.name;
    this._aboutMe.textContent = user.aboutMe;
  }
}
