import Section from "../components/Section.js";
import Todo from "../components/Todo.js";
import TodoCounter from "../components/TodoCounter.js";
import { initialTodos } from "../utils/constants.js";

const todosList = document.querySelector(".todos__list");
const addTodoForm = document.querySelector("#add-todo-form");
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoCloseBtn = document.querySelector(".popup__close");

// Initialize the TodoCounter
const todoCounter = new TodoCounter({
  totalSelector: ".counter__total",
  incompleteSelector: ".counter__incomplete",
});

// State array to track current todos
let currentTodos = [...initialTodos];

// Function to update the counts
const updateTodoCounts = () => {
  todoCounter.updateCounts(currentTodos); // Use the state array
};

// Function to render a single todo
const renderTodo = (data) => {
  const todo = new Todo({
    ...data,
    onUpdate: (updatedTodo) => {
      // Update the corresponding todo in the state array
      const index = currentTodos.findIndex(
        (todo) => todo.id === updatedTodo.id
      );
      if (index !== -1) {
        currentTodos[index] = updatedTodo;
      }
      updateTodoCounts(); // Update the counter
    },
  });

  const todoElement = todo.createTodoElement();
  todosSection.addItem(todoElement);
};

// Initialize the Section class
const todosSection = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

// Render all initial todos on page load
todosSection.renderItems();
updateTodoCounts(); // Update counts after rendering initial todos

// Open the popup when the "Add Todo" button is clicked
addTodoButton.addEventListener("click", () => {
  addTodoPopup.classList.add("popup_visible");
});

// Close the popup when the close button is clicked
addTodoCloseBtn.addEventListener("click", () => {
  addTodoPopup.classList.remove("popup_visible");
});

// Handle form submission
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;
  const date = dateInput ? new Date(dateInput) : null;

  const newTodoData = {
    name,
    date,
    completed: false,
    priority: "normal",
    description: evt.target.description?.value || "",
  };

  currentTodos.push(newTodoData); // Add the new todo to the state array
  renderTodo(newTodoData); // Render the new todo
  updateTodoCounts(); // Update counts after adding a new todo
  evt.target.reset(); // Reset the form
  addTodoPopup.classList.remove("popup_visible"); // Close the popup
});
