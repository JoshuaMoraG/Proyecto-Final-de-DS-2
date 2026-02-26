/**
 * Index Controller
 * 
 * Manages the main dashboard display on index.html
 * Shows welcome message, total expenses, category with most expenses, and last recorded expense
 * 
 * External dependencies:
 * - getExpenses() from ExpenseRecordModel.js
 */

document.addEventListener("DOMContentLoaded", function () {
    loadDashboard();
});

/**
 * Calculate the total sum of all expenses
 * @returns {number} Total amount of expenses
 */
function calculateTotalExpenses() {
    const expenses = getExpenses();
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount || 0), 0);
}

/**
 * Find the category with the most expenses (sum)
 * @returns {string} Category name with the highest total amount, or empty string if no expenses
 */
function getCategoryWithMostExpenses() {
    const expenses = getExpenses();
    
    if (expenses.length === 0) return "No category";
    
    // Group expenses by category and sum amounts
    const categoryTotals = {};
    expenses.forEach(expense => {
        if (!categoryTotals[expense.category]) {
            categoryTotals[expense.category] = 0;
        }
        categoryTotals[expense.category] += parseFloat(expense.amount || 0);
    });
    
    // Find category with highest total
    let maxCategory = "";
    let maxAmount = 0;
    
    for (const [category, total] of Object.entries(categoryTotals)) {
        if (total > maxAmount) {
            maxAmount = total;
            maxCategory = category;
        }
    }
    
    return maxCategory || "No category";
}

/**
 * Get the last recorded expense (most recent)
 * @returns {Object|null} Last expense object with date, category, description, and amount
 */
function getLastRecordedExpense() {
    const expenses = getExpenses();
    return expenses.length > 0 ? expenses[expenses.length - 1] : null;
}

/**
 * Format currency for display
 * @param {number} amount 
 * @returns {string} Formatted amount with currency symbol
 */
function formatCurrency(amount) {
    return "₡" + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Load and display dashboard data
 */
function loadDashboard() {
    // Update total expenses
    const totalElement = document.getElementById("summary-total");
    if (totalElement) {
        const total = calculateTotalExpenses();
        totalElement.textContent = formatCurrency(total);
    }
    
    // Update category with most expenses
    const categoryElement = document.getElementById("summary-category");
    if (categoryElement) {
        const category = getCategoryWithMostExpenses();
        categoryElement.textContent = category;
    }
    
    // Update last recorded expense
    const lastExpenseElement = document.getElementById("summary-last-expense");
    if (lastExpenseElement) {
        const lastExpense = getLastRecordedExpense();
        if (lastExpense) {
            lastExpenseElement.innerHTML = `
                <strong>${lastExpense.description}</strong> - 
                ${lastExpense.category} - 
                ${formatCurrency(parseFloat(lastExpense.amount))} 
                (${lastExpense.date})
            `;
        } else {
            lastExpenseElement.textContent = "No expenses recorded";
        }
    }
}

/**
 * Refresh dashboard (can be called when expenses are updated)
 */
function refreshDashboard() {
    loadDashboard();
}