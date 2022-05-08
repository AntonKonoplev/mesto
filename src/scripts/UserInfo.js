export class UserInfo {
  constructor({ nameSelector, aboutMeSelector }) {
    this._name = nameSelector;
    this._aboutMe = aboutMeSelector;
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
