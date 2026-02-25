// Expense Model

function getExpenses() {
    return JSON.parse(localStorage.getItem("expenses")) || [];
}

function saveExpense(expense) {
    const expenses = getExpenses();
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

/**
 * Returns an array of unique categories from saved expenses
 * @returns {Array<string>} Unique categories
 */
function getUniqueCategories() {
    const expenses = getExpenses();
    const categories = expenses.map(e => e.category);

    return [...new Set(categories)];
}

/**
 * Returns expenses filtered by category. If no category is passed or is "" or "All",
 * returns all expenses.
 * @param {string} category
 * @returns {Array<Object>} Filtered expenses
 */
function getFilteredExpenses(category, dateFrom, dateTo) {
    let expenses = getExpenses();


    if (category && category !== '' && category !== 'All') {
        expenses = expenses.filter(e => e.category === category);
    }


    if (dateFrom) {
        expenses = expenses.filter(e => e.date >= dateFrom);
    }
    if (dateTo) {
        expenses = expenses.filter(e => e.date <= dateTo);
    }

    return expenses;
}

/**
 * Sorts an array of expenses according to a criterion and direction
 * @param {Array} expenses
 * @param {string} criteria 'amount'|'date'
 * @param {string} direction 'asc'|'desc'
 * @returns {Array}
 */
function sortExpenses(expenses, criteria, direction) {
    const copy = [...expenses];
    copy.sort((a, b) => {
        let vA = a[criteria];
        let vB = b[criteria];

        if (criteria === 'amount') {
            vA = parseFloat(vA);
            vB = parseFloat(vB);
        }

        if (va < vb) return direction === 'asc' ? -1 : 1;
        if (va > vb) return direction === 'asc' ? 1 : -1;
        return 0;
    });
    return copy;
}



