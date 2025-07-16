import Popup from "./Popup.js";

export default class PopupWithForms extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners && super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formData = this._getInputValues(); // Use the class method
      this._handleFormSubmit(formData);
      this._form.reset(); // Clear inputs only after successful submit
    });
  }

  close() {
    super.close();
    // Do NOT reset the form here
  }
}
