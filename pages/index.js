import Section from "../components/Section.js";
import Todo from "../components/Todo.js";
import TodoCounter from "../components/TodoCounter.js";
import PopupWithForms from "../components/PopupWithForms.js";
import FormValidator from "../components/FormValidator.js";
import { initialTodos, validationConfig } from "../utils/constants.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

// State array to track current todos
let currentTodos = [...initialTodos];

// Initialize the TodoCounter
const todoCounter = new TodoCounter(
  currentTodos,
  ".counter__total",
  ".counter__incomplete"
);

const updateTodoCounts = () => {
  todoCounter.updateCounts(currentTodos);
};

// Handle delete
function handleDeleteTodo(todoId) {
  currentTodos = currentTodos.filter((todo) => todo.id !== todoId);
  const todoElement = document.querySelector(`[data-id="${todoId}"]`);
  if (todoElement) {
    todoElement.remove();
  }
  updateTodoCounts();
}

// Function to render a single todo
const renderTodo = (data) => {
  const todo = new Todo({
    ...data,
    onUpdate: (updatedTodo) => {
      const index = currentTodos.findIndex(
        (todo) => todo.id === updatedTodo.id
      );
      if (index !== -1) {
        currentTodos[index] = updatedTodo;
      }
      updateTodoCounts();
    },
    onDelete: (todoId) => {
      handleDeleteTodo(todoId);
    },
  });

  const todoElement = todo.createTodoElement();
  // Ensure the element has a data-id attribute for deletion
  todosSection.addItem(todoElement);
};

// Initialize the Section class
const todosSection = new Section({
  items: currentTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

// Render all initial todos on page load
todosSection.renderItems();
updateTodoCounts();

// --- Popup and Form Handling ---

// Form validation setup (must be before PopupWithForms)
const addTodoForm = document.forms["add-todo-form"];
const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
addTodoFormValidator.enableValidation();

// PopupWithForms instance for the add-todo popup
const addTodoPopup = new PopupWithForms({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (formData) => {
    const title = formData.name?.trim();
    if (!title) return;

    const description = formData.description?.trim() || "";
    const dateInput = formData.date;
    const date = dateInput ? new Date(dateInput) : null;

    const newTodoData = {
      id: uuidv4(),
      name: title,
      description,
      date,
      completed: false,
      priority: "normal",
    };

    currentTodos.push(newTodoData);
    renderTodo(newTodoData);
    updateTodoCounts();
    addTodoPopup.close();
    addTodoFormValidator.resetValidation();
  },
});

// Open the popup when the "Add Todo" button is clicked
const addTodoButton = document.querySelector(".button_action_add");
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});
