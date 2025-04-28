// This file contains the JavaScript code for the main page of the ToDo app.
// It handles the functionality related to adding, displaying, and managing ToDo items.

document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('add-todo-form');
    const todoList = document.querySelector('.todos__list');
    const todoTemplate = document.getElementById('todo-template').content;

    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const todoName = todoForm.name.value;
        const todoDate = todoForm.date.value;

        addTodoItem(todoName, todoDate);
        todoForm.reset();
    });

    function addTodoItem(name, date) {
        const todoItem = todoTemplate.cloneNode(true);
        todoItem.querySelector('.todo__name').textContent = name;
        todoItem.querySelector('.todo__date').textContent = date ? new Date(date).toLocaleDateString() : 'No due date';
        
        const deleteButton = todoItem.querySelector('.todo__delete-btn');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            todoItem.remove();
        });

        todoList.appendChild(todoItem);
    }
});