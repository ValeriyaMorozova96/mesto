export class Section {
    constructor({ items, renderer }, containerSelector) {
      this._items = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }
    addItem(cardElement) {
        this._container.prepend(cardElement);
      }
    renderItems() {
        this._items.forEach(item => {
        this._renderer(item)
      });
    }
  }
  