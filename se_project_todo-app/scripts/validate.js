// This file contains validation logic for the forms in the application.
// It ensures that user input meets certain criteria before submission.

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-todo-form');

    form.addEventListener('submit', (event) => {
        const todoNameInput = document.getElementById('todo-name');
        const todoDateInput = document.getElementById('todo-date');
        let isValid = true;

        // Clear previous error messages
        clearErrors();

        // Validate the todo name
        if (!todoNameInput.value.trim()) {
            showError(todoNameInput, 'This field cannot be empty.');
            isValid = false;
        }

        // Validate the todo date if provided
        if (todoDateInput.value && !isValidDate(todoDateInput.value)) {
            showError(todoDateInput, 'Please enter a valid date.');
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });

    function clearErrors() {
        const errorElements = document.querySelectorAll('.popup__error');
        errorElements.forEach((errorElement) => {
            errorElement.textContent = '';
        });
    }

    function showError(inputElement, message) {
        const errorElement = document.getElementById(`${inputElement.id}-error`);
        errorElement.textContent = message;
    }

    function isValidDate(dateString) {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    }
});