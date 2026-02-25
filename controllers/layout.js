/**
 * Global Layout Controller
 * ============================
 * Loads and renders header and footer components on all pages
 * Executes when the DOM is fully loaded.
 */


document.addEventListener("DOMContentLoaded", () => {

    /**
     * Header HTML
     * ============================
     * - Logo with image and application text
     * - Main navigation with links to all pages
     * Inserted at the beginning of the body on all pages
     */

    const headerHTML = `
        <header class="header">
            <div class="logo" onclick="location.href='index.html'">
                <img src="https://i.pinimg.com/736x/33/5f/fe/335ffe0c00bbeac180a99a894dbabcf7.jpg">
                <div class="logo-text">
                    <span>Expense</span>
                    <span>  Control</span>
                </div>
            </div>

            <nav class="nav">
                <a href="index.html">Home</a>
                <a href="registroGasto.html">Register Expense</a>
                <a href="listaGastos.html">My Expenses</a>
                <a href="reportes.html">Reports</a>
            </nav>
        </header>
    `;

    /**
     * Footer HTML
     * ================================
     * Reusable component that includes:
     * - Copyright and year of the application
     * - Credits of developers with their student codes
     * Inserted at the end of the body on all pages
     */
    const footerHTML = `
        <footer class="footer">
            <p>© 2026 Expense Control</p>
            <p>Andrès Castro(C5D935)
            / María Celeste Moreno(C15299)
            / Joshua Mora(C15079)
            / Arlington Sandoval(C27358)
        </p>
        </footer>
    `;

    document.body.insertAdjacentHTML("afterbegin", headerHTML);
    document.body.insertAdjacentHTML("beforeend", footerHTML);
});
