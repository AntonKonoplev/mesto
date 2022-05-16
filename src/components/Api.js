export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Ошибка");
    });
  }

  getUser() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Ошибка");
    });
  }

  editUser(data) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Ошибка");
    });
  }

  editAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data["link"],
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Ошибка");
    });
  }

  postCard(data) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Ошибка");
    });
  }

  addCardLike(data) {
    return fetch(`${this._url}cards/likes/${data}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Ошибка");
    });
  }

  deleteCardLike(data) {
    return fetch(`${this._url}cards/likes/${data}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Ошибка");
    });
  }

  deleteCard(data) {
    return fetch(`${this._url}cards/${data}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Ошибка");
    });
  }
}
