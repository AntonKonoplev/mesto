export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._containerSelector.prepend(element);
  }

  rendererItems(items) {
    items.forEach((data) => {
      this._renderer(data);
    });
  }
}
