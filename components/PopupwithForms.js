import Popup from "./Popup.js";

export default class PopupWithForms extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector); // Call the parent class constructor
    this._handleFormSubmit = handleFormSubmit; // Function to handle form submission
    this._form = this._popup.querySelector(".popup__form"); // Select the form element
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input")); // Get all input fields
  }

  // Private method to get input values
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  // Override setEventListeners to include form submission
  setEventListeners() {
    super.setEventListeners(); // Call the parent method
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues()); // Pass input values to the handler
      this.close(); // Close the popup after submission
    });
  }

  // Override close to reset the form
  close() {
    super.close(); // Call the parent method
    this._form.reset(); // Reset the form fields
  }
}
