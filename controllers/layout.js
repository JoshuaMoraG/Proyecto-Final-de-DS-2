document.addEventListener("DOMContentLoaded", () => {

    // Definición del HTML del encabezado (header)

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

    // Definición del HTML del pie de página (footer)
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

    // Inserta el header al inicio del body
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
    // Inserta el footer al final del body
    document.body.insertAdjacentHTML("beforeend", footerHTML);
});
