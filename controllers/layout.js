/**
 * Controlador de Layout Global
 * ============================
 * Carga y renderiza los componentes header y footer en todas las páginas
 * Se ejecuta cuando el DOM está completamente cargado.
 */


document.addEventListener("DOMContentLoaded", () => {

    /**
     * HTML del Header
     * ============================
     * - Logo con imagen y texto de la aplicación
     * - Navegación principal con enlaces a todas las páginas
     * Se inserta al inicio del body en todas las páginas
     */

    const headerHTML = `
        <header class="header">
            <div class="logo" onclick="location.href='index.html'">
                <img src="https://i.pinimg.com/736x/33/5f/fe/335ffe0c00bbeac180a99a894dbabcf7.jpg">
                <div class="logo-text">
                    <span>Control de</span>
                    <span>  Gastos</span>
                </div>
            </div>

            <nav class="nav">
                <a href="index.html">Inicio</a>
                <a href="registroGasto.html">Registrar Gasto</a>
                <a href="listaGastos.html">Mis Gastos</a>
                <a href="reportes.html">Reportes</a>
            </nav>
        </header>
    `;

    /**
     * HTML del Footer
     * ================================
     * Componente reutilizable que incluye:
     * - Copyright y año de la aplicación
     * - Créditos de los desarrolladores con sus códigos de estudiante
     * Se inserta al final del body en todas las páginas
     */
    const footerHTML = `
        <footer class="footer">
            <p>© 2026 Control de Gastos</p>
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
