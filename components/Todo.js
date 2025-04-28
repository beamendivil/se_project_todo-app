import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export default class Todo {
  constructor({
    id = null,
    name = "Untitled Task",
    completed = false,
    date = null,
    priority = "normal", // Default priority
    description = "", // Optional description
  }) {
    this.id = id || this._generateId(); // Generate a unique ID if not provided
    this.name = name || "Untitled Task"; // Default to "Untitled Task" if no name is provided
    this.completed = completed; // Default to false if not specified
    this.date = this._validateDate(date); // Validate and parse date
    this.priority = this._validatePriority(priority); // Validate priority
    this.description = description || ""; // Default to an empty string if not provided
  }

  _generateId() {
    // Generate a unique ID using uuid
    return uuidv4();
  }

  _validateDate(date) {
    // Validate and parse the date
    const parsedDate = date ? new Date(date) : null;
    return !isNaN(parsedDate) ? parsedDate : null;
  }

  _validatePriority(priority) {
    // Validate priority to ensure it is one of the allowed values
    const allowedPriorities = ["high", "normal", "low"];
    return allowedPriorities.includes(priority) ? priority : "normal";
  }

  createTodoElement() {
    const template = document.querySelector("#todo-template").content;
    const todoElement = template.cloneNode(true);

    const todoNameEl = todoElement.querySelector(".todo__name");
    const todoCheckboxEl = todoElement.querySelector(".todo__completed");
    const todoLabel = todoElement.querySelector(".todo__label");
    const todoDateEl = todoElement.querySelector(".todo__date");
    const todoDescriptionEl = document.createElement("p"); // For description
    const todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");

    // Set the todo name and completion status
    todoNameEl.textContent = this.name;
    todoCheckboxEl.checked = this.completed;

    // Set the id and for attributes for accessibility
    todoCheckboxEl.id = this.id;
    todoLabel.setAttribute("for", this.id);

    // Format and display the due date if it exists
    if (this.date) {
      todoDateEl.textContent = `Due: ${this.date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    // Add priority as a class for styling (e.g., high, normal, low)
    todoElement.classList.add(`todo_priority_${this.priority}`);

    // Add description if provided
    if (this.description) {
      todoDescriptionEl.textContent = this.description;
      todoDescriptionEl.classList.add("todo__description");
      todoElement.appendChild(todoDescriptionEl);
    }

    // Add event listener for the delete button
    todoDeleteBtn.addEventListener("click", () => {
      todoElement.remove();
    });

    // Add event listener for the checkbox to toggle completion
    todoCheckboxEl.addEventListener("change", () => {
      this.completed = todoCheckboxEl.checked;
      todoElement.classList.toggle("todo_completed", this.completed);
    });

    return todoElement;
  }
}
