import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export default class Todo {
  constructor({
    id = null,
    name = "Untitled Task",
    completed = false,
    date = null,
    priority = "normal",
    description = "",
    templateSelector = "#todo-template",
    onUpdate = null, // Add the callback parameter
  }) {
    this.id = id || uuidv4();
    this.name = name;
    this.completed = completed;
    this.date = date ? new Date(date) : null;
    this.priority = priority;
    this.description = description;
    this.templateSelector = templateSelector;
    this.onUpdate = onUpdate; // Store the callback
  }

  createTodoElement() {
    const templateElement = document.querySelector(this.templateSelector);

    if (!templateElement) {
      throw new Error(
        `Template with selector "${this.templateSelector}" not found.`
      );
    }

    const template = templateElement.content;
    const todoElement = template.cloneNode(true).querySelector(".todo");

    if (!todoElement) {
      throw new Error(
        `The template does not contain an element with the class "todo".`
      );
    }

    const todoNameEl = todoElement.querySelector(".todo__name");
    const todoCheckboxEl = todoElement.querySelector(".todo__completed");
    const todoLabel = todoElement.querySelector(".todo__label");
    const todoDateEl = todoElement.querySelector(".todo__date");
    const todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this.name;
    todoCheckboxEl.checked = this.completed;
    todoCheckboxEl.id = this.id;
    todoLabel.setAttribute("for", this.id);

    if (this.date) {
      todoDateEl.textContent = `Due: ${this.date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    todoElement.classList.add(`todo_priority_${this.priority}`);

    if (this.description) {
      const todoDescriptionEl = document.createElement("p");
      todoDescriptionEl.textContent = this.description;
      todoDescriptionEl.classList.add("todo__description");
      todoElement.appendChild(todoDescriptionEl);
    }

    todoDeleteBtn.addEventListener("click", () => {
      todoElement.remove();
    });

    todoCheckboxEl.addEventListener("change", () => {
      this.completed = todoCheckboxEl.checked; // Update the completed status
      todoElement.classList.toggle("todo_completed", this.completed);

      if (this.onUpdate) {
        this.onUpdate({
          id: this.id,
          name: this.name,
          completed: this.completed,
          date: this.date,
          priority: this.priority,
          description: this.description,
        }); // Invoke the callback with the updated todo data
      }
    });

    return todoElement;
  }
}
