import FormValidator from "../components/FormValidator.js";
import Todo from "../components/Todo.js";
import { initialTodos, validationConfig } from "../utils/constants.js"; // Updated path

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

let formValidator; // Declare formValidator globally

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// Function to render a todo using the Todo class
const renderTodo = (data) => {
  const todo = new Todo(data); // Create a new Todo instance
  const todoElement = todo.createTodoElement(); // Generate the DOM element
  todosList.append(todoElement); // Append it to the list
};

addTodoButton.addEventListener("click", () => {
  console.log("Add Todo button clicked");
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  console.log("Form submitted");

  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;
  console.log("Form values:", { name, dateInput });

  const date = dateInput ? new Date(dateInput) : null;
  if (date) {
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    console.log("Adjusted date:", date);
  }

  try {
    renderTodo({
      name,
      date,
      completed: false,
      priority: "normal",
      description: evt.target.description?.value || "",
    });

    console.log("Todo successfully rendered");

    evt.target.reset(); // Reset the form fields
    formValidator.resetValidation(); // Reset validation state
    console.log("Validation state reset");

    closeModal(addTodoPopup); // Close the popup
    console.log("Popup closed");
  } catch (error) {
    console.error("An error occurred while adding the todo:", error.message);
    alert("Something went wrong while adding your todo. Please try again.");
  }
});

// Render initial todos
initialTodos.forEach((item) => {
  renderTodo(item);
});

// Initialize formValidator inside DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  const formElement = document.querySelector("#add-todo-form");
  console.log("Form Element:", formElement); // Debugging

  if (formElement) {
    formValidator = new FormValidator(validationConfig, formElement); // Initialize formValidator
    formValidator.enableValidation();
  } else {
    console.error("Form element not found. Ensure the form exists in the DOM.");
  }
});
