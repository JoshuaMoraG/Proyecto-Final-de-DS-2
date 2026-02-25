// Reports Model - Data Layer

/**
 * Gets the total amount of all expenses
 * @returns {number} Total expenses
 */
function getTotalAmount() {
    const expenses = getExpenses();
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
}

/**
 * Gets totals grouped by category
 * @returns {Object} Object with categories as keys and totals as values
 */
function getTotalsByCategory() {
    const expenses = getExpenses();
    const totals = {};

    expenses.forEach(expense => {
        const category = expense.category;
        if (!totals[category]) {
            totals[category] = 0;
        }
        totals[category] += parseFloat(expense.amount);
    });

    return totals;
}

/**
 * Gets general expense statistics
 * @returns {Object} Object with count, average, total
 */
function getGeneralStatistics() {
    const expenses = getExpenses();
    const count = expenses.length;
    const total = getTotalAmount();
    const average = count > 0 ? total / count : 0;

    return {
        expenseCount: count,
        totalExpenses: total,
        expenseAverage: average
    };
}

/**
 * Gets categories sorted by amount (highest to lowest)
 * @returns {Array} Array of objects [{category, amount}, ...]
 */
function getOrderedCategories() {
    const totals = getTotalsByCategory();

    return Object.entries(totals)
        .map(([category, amount]) => ({ category, amount }))
        .sort((a, b) => b.amount - a.amount);
}

/**
 * Gets the data needed to generate the chart
 * @returns {Object} Object with labels and data for the chart
 */
function getChartData() {
    const totals = getTotalsByCategory();

    return {
        labels: Object.keys(totals),
        data: Object.values(totals)
    };
}

/**
 * Verifies if expenses have been registered
 * @returns {boolean}
 */
function haveExpensesBeenRegistered() {
    const expenses = getExpenses();
    return expenses.length > 0;
}