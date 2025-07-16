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
    onUpdate = null,
    onDelete = null,
  }) {
    this.id = id || uuidv4();
    this.name = name;
    this.description = description;
    this.date = date ? new Date(date) : null;
    this.completed = completed;
    this.priority = priority;
    this.templateSelector = templateSelector;
    this.onUpdate = onUpdate;
    this.onDelete = onDelete;

    // Element references (will be set in createTodoElement)
    this.todoElement = null;
    this.todoNameEl = null;
    this.todoCheckboxEl = null;
    this.todoLabel = null;
    this.todoDateEl = null;
    this.todoDeleteBtn = null;
  }

  createTodoElement() {
    const templateElement = document.querySelector(this.templateSelector);

    if (!templateElement) {
      throw new Error(
        `Template with selector "${this.templateSelector}" not found.`
      );
    }

    const template = templateElement.content;
    this.todoElement = template.cloneNode(true).querySelector(".todo");

    // Set data-id for deletion
    this.todoElement.setAttribute("data-id", this.id);

    // Set up fields
    this.todoNameEl = this.todoElement.querySelector(".todo__name");
    this.todoCheckboxEl = this.todoElement.querySelector(".todo__completed");
    this.todoLabel = this.todoElement.querySelector(".todo__label");
    this.todoDateEl = this.todoElement.querySelector(".todo__date");
    this.todoDeleteBtn = this.todoElement.querySelector(".todo__delete-btn");

    this.todoNameEl.textContent = this.name;
    this.todoCheckboxEl.checked = this.completed;
    this.todoCheckboxEl.id = this.id;
    this.todoLabel.setAttribute("for", this.id);

    if (this.date) {
      this.todoDateEl.textContent = `Due: ${this.date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    } else {
      this.todoDateEl.textContent = "";
    }

    if (this.description) {
      const todoDescriptionEl = document.createElement("p");
      todoDescriptionEl.textContent = this.description;
      todoDescriptionEl.classList.add("todo__description");
      this.todoElement.appendChild(todoDescriptionEl);
    }

    // Checkbox toggle
    this.todoCheckboxEl.addEventListener("change", () => {
      this.completed = this.todoCheckboxEl.checked;
      this.todoElement.classList.toggle("todo_completed", this.completed);
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
    this.todoDeleteBtn.addEventListener("click", () => {
      if (this.onDelete) {
        this.onDelete(this.id);
      }
    });

    return this.todoElement;
  }
}
