import FormValidator from "../components/FormValidator.js";
import Todo from "../components/Todo.js";

const initialTodos = [
  {
    id: "7cec7373-681b-49d9-b065-021d61a69d03",
    name: "Read the sprint's theory",
    completed: true,
    date: new Date(),
  },
  {
    id: "a7bfd5ef-37cc-4fa6-89f2-cac098a8aeba",
    name: "Read project instructions",
    completed: false,
    date: new Date(),
  },
  {
    id: "aa486839-63ab-437f-b8a2-29ab217dff4f",
    name: "Complete project",
    completed: false,
    date: new Date(),
  },
];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  errorClass: "popup__error_visible",
  inputErrorClass: "popup__input_type_error",
  inactiveButtonClass: "button_disabled",
};

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

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
  console.log("Task Name:", name);

  const dateInput = evt.target.date.value;
  console.log("Date Input:", dateInput);

  const date = dateInput ? new Date(dateInput) : null;
  if (date) {
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  }

  const newTodo = new Todo({
    name,
    date,
    completed: false,
    priority: "normal",
    description: evt.target.description?.value || "",
  });

  const todoElement = newTodo.createTodoElement();
  todosList.append(todoElement);

  evt.target.reset();
  formValidator.resetValidation();
  closeModal(addTodoPopup);
});

// Render initial todos
initialTodos.forEach((item) => {
  renderTodo(item);
});

// Select the form element
const formElement = document.querySelector("#add-todo-form");

// Initialize the FormValidator
const formValidator = new FormValidator(formElement, validationConfig);
formValidator.enableValidation();
