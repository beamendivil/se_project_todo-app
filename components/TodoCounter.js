export default class TodoCounter {
  constructor({ totalSelector, incompleteSelector }) {
    this._totalElement = document.querySelector(totalSelector); // Element for total count
    this._incompleteElement = document.querySelector(incompleteSelector); // Element for incomplete count
  }

  // Method to update the counts
  updateCounts(todos) {
    const totalCount = todos.length; // Total number of todos
    const incompleteCount = todos.filter((todo) => !todo.completed).length; // Incomplete todos
    this._totalElement.textContent = `Total: ${totalCount}`;
    this._incompleteElement.textContent = `Incomplete: ${incompleteCount}`;
  }
}
