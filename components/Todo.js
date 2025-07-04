import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export default class Todo {
  constructor({
    id = null,
    name = "Untitled Task",
    description = "",
    date = null,
    completed = false,
    priority = "normal",
    templateSelector = "#todo-template",
    onUpdate = null, // Add the callback parameter
    onDelete = null,
  }) {
    this.id = id || uuidv4();
    this.name = name;
    this.description = description;
    this.date = date ? new Date(date) : null;
    this.completed = completed;
    this.priority = priority;
    this.templateSelector = templateSelector;
    this.onUpdate = onUpdate; // Store the callback
    this.onDelete = onDelete;
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

    // Set data-id for deletion
    todoElement.setAttribute("data-id", this.id);

    // Set up fields
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
    } else {
      todoDateEl.textContent = "";
    }

    if (this.description) {
      const todoDescriptionEl = document.createElement("p");
      todoDescriptionEl.textContent = this.description;
      todoDescriptionEl.classList.add("todo__description");
      todoElement.appendChild(todoDescriptionEl);
    }

    // Checkbox toggle
    todoCheckboxEl.addEventListener("change", () => {
      this.completed = todoCheckboxEl.checked;
      todoElement.classList.toggle("todo_completed", this.completed);
      if (this.onUpdate) {
        this.onUpdate({
          id: this.id,
          name: this.name,
          description: this.description,
          date: this.date,
          completed: this.completed,
          priority: this.priority,
        });
      }
    });

    // Delete button
    todoDeleteBtn.addEventListener("click", () => {
      if (this.onDelete) {
        this.onDelete(this.id);
      }
    });

    return todoElement;
  }
}
