export default class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items; // Array of data to render
    this._renderer = renderer; // Function to render a single item
    this._container = document.querySelector(containerSelector); // DOM container
  }

  // Public method to render all items
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item); // Call the renderer function for each item
    });
  }

  // Public method to add a single item to the container
  addItem(element) {
    this._container.append(element); // Append the DOM element to the container
  }
}
