
/**
 * Expense Registration Controller
 * ====================================
 * Manages the form functionality for registering new expenses.
 * Validates entered data and saves it to local storage.
 */


document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();

    /**
     * Expense Object
     * @type {Object}
     * @property {string} date
     * @property {string} category
     * @property {string} description
     * @property {number} amount
     */
    const expense = {
        date: document.getElementById("date").value,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
        amount: parseFloat(document.getElementById("amount").value)
    };

    /**
     * VALIDATION 1: Verifies that all required fields are complete
     * - Validates that the date is not empty
     * - Validates that the category is not empty
     * - Validates that the description is not empty
     * - Validates that the amount is a valid number (not NaN)
     */
    if (!expense.date || !expense.category || !expense.description || isNaN(expense.amount)) {
        alert("⚠️ All fields are required");
        return;
    }

    /**
     * VALIDATION 2: Verifies that the amount is a positive value
     * - The amount must be greater than 0
     * - Prevents registration of expenses with negative or zero amounts
     */

    if (expense.amount <= 0) {
        alert("️⚠️ The amount must be greater than zero");
        return;
    }

    saveExpense(expense);

    alert("✅ Expense registered successfully");
    this.reset();
});