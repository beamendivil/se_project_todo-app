class TodoCounter {
  // selector is the selector for the counter text element
  constructor(todos, totalSelector, incompleteSelector) {
    this._totalElement = document.querySelector(totalSelector);
    this._incompleteElement = document.querySelector(incompleteSelector);
    this.updateCounts(todos);
  }

  // Call this when a checkbox is clicked, and when a completed
  // to-do is deleted.
  updateCompleted = (increment) => {
    if (increment) {
      this._completed += 1;
    } else {
      this._completed -= 1;
    }
    this._updateText();
  };

  // Call this when a to-do is deleted, or when a to-do is
  // created via the form.
  updateTotal = (increment) => {
    if (increment) {
      this._total += 1;
    } else {
      this._total -= 1;
    }
    this._updateText();
  };

  // Call the method to update the text content
  _updateText() {
    this._totalElement.textContent = `Total: ${this._total}`;
    this._incompleteElement.textContent = `Incomplete: ${
      this._total - this._completed
    }`;
  }

  updateCounts(todos) {
    const totalCount = todos.length;
    const completedCount = todos.filter((todo) => todo.completed).length;
    this._total = totalCount;
    this._completed = completedCount;
    this._totalElement.textContent = `Total: ${totalCount}`;
    this._incompleteElement.textContent = `Incomplete: ${
      totalCount - completedCount
    }`;
  }
}

export default TodoCounter;
