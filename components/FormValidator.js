export default class FormValidator {
  constructor(formElement, config) {
    this._formElement = formElement;
    this._config = config;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    const submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, submitButton);
      });
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    const hasInvalidInput = inputList.some(
      (inputElement) => !inputElement.validity.valid
    );

    if (hasInvalidInput) {
      buttonElement.classList.add(this._config.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  enableValidation() {
    this._setEventListeners();
  }
}
