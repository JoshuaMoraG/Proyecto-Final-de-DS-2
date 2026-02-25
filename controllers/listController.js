/**
 * Expense List View Controller.
 *
 * Initializes the interface filters, loads the initial list of records
 * and reloads reactively when filters or order changes.
 *
 * External dependencies:
 * - `getUniqueCategories()`
 * - `getFilteredExpenses(category, dateFrom, dateTo)`
 * - `sortExpenses(records, criteria, direction)`
 */
document.addEventListener("DOMContentLoaded", function () {
    initializeFilters();
    loadList();

    const filterSelect = document.getElementById("filter-category");
    const dateFrom = document.getElementById("filter-date-from");
    const dateTo = document.getElementById("filter-date-to");
    const orderSelect = document.getElementById("sort-by");

    /**
     * Reads current values of filter/order controls and reloads the list.
     * @private
     * @returns {void}
     */
    function update() {
        loadList(
            filterSelect ? filterSelect.value : '',
            dateFrom ? dateFrom.value : '',
            dateTo ? dateTo.value : '',
            orderSelect ? orderSelect.value : ''
        );
    }

    if (filterSelect) filterSelect.addEventListener("change", update);
    if (dateFrom) dateFrom.addEventListener("change", update);
    if (dateTo) dateTo.addEventListener("change", update);
    if (orderSelect) orderSelect.addEventListener("change", update);
});


/**
 * Initializes the category select in the interface.
 * Searches for the `#filter-category` element and fills it with categories
 * returned by `getUniqueCategories()`.
 * @returns {void}
 */
function initializeFilters() {
    const filterSelect = document.getElementById("filter-category");
    if (!filterSelect) return;

    const categories = getUniqueCategories();
    let html = '<option value="">All</option>';
    categories.forEach(c => {
        html += `<option value="${c}">${c}</option>`;
    });
    filterSelect.innerHTML = html;
}


/**
 * Loads and renders the expense records list.
 *
 * @param {string} [category=""] - Filters by category (empty string = all).
 * @param {string} [dateFrom=""] - Minimum date to filter (format compatible with `getFilteredExpenses`).
 * @param {string} [dateTo=""] - Maximum date to filter.
 * @param {string} [order=""] - Order in "criteria_direction" format (e.g. "date_desc").
 * @returns {void}
 *
 * Dependencies:
 * - `getFilteredExpenses(category, dateFrom, dateTo)` should return
 *   an array of objects with at least the properties: `date`, `category`, `description`, `amount`.
 * - `sortExpenses(records, criteria, direction)` sorts and returns the array.
 *
 * Behavior:
 * - If there is no `#expense-list` element, it does nothing.
 * - If there are no records, it shows a paragraph with the `no-data` class.
 * - If there are records, it builds an HTML table with Date, Category, Description, and Amount columns.
 */
function loadList(category = "", dateFrom = "", dateTo = "", order = "") {
    let records = getFilteredExpenses(category, dateFrom, dateTo);

    if (order) {
        const [criteria, direction] = order.split("_");
        records = sortExpenses(records, criteria, direction);
    }

    const container = document.getElementById("expense-list");

    if (!container) return;

    if (records.length === 0) {
        container.innerHTML = `
            <p class="no-data">No records to display</p>
        `;
        return;
    }

    let html = `
        <table class="expense-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
    `;

    records.forEach(r => {
        html += `
            <tr>
                <td>${r.date}</td>
                <td>${r.category}</td>
                <td>${r.description}</td>
                <td>₡${parseFloat(r.amount).toFixed(2)}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}

