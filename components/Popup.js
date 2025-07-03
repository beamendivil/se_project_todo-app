export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector); // Select the popup element
    this._handleEscClose = this._handleEscClose.bind(this); // Bind the escape key handler
  }

  // Public method to open the popup
  open() {
    this._popup.classList.add("popup_visible"); // Add the visible class
    document.addEventListener("keydown", this._handleEscClose); // Add escape key listener
  }

  // Public method to close the popup
  close() {
    this._popup.classList.remove("popup_visible"); // Remove the visible class
    document.removeEventListener("keydown", this._handleEscClose); // Remove escape key listener
  }

  // Private method to handle closing the popup with the Escape key
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close(); // Close the popup
    }
  }

  // Public method to set event listeners
  setEventListeners() {
    // Close the popup when clicking the close button
    const closeButton = this._popup.querySelector(".popup__close");
    closeButton.addEventListener("click", () => {
      this.close();
    });

    // Close the popup when clicking outside the popup content
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}
