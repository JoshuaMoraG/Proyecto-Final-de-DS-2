// Controlador para la vista de listado de gastos

document.addEventListener("DOMContentLoaded", function () {
    inicializarFiltros();
    cargarLista();

    // escuchar cambios en controles de filtro/orden
    const filtroSelect = document.getElementById("filtro-categoria");
    const fechaDesde = document.getElementById("filtro-fecha-desde");
    const fechaHasta = document.getElementById("filtro-fecha-hasta");
    const ordenSelect = document.getElementById("ordenar-por");

    function actualizar() {
        cargarLista(
            filtroSelect ? filtroSelect.value : '',
            fechaDesde ? fechaDesde.value : '',
            fechaHasta ? fechaHasta.value : '',
            ordenSelect ? ordenSelect.value : ''
        );
    }

    if (filtroSelect) filtroSelect.addEventListener("change", actualizar);
    if (fechaDesde) fechaDesde.addEventListener("change", actualizar);
    if (fechaHasta) fechaHasta.addEventListener("change", actualizar);
    if (ordenSelect) ordenSelect.addEventListener("change", actualizar);
});

/**
 * Llena el dropdown de filtro con las categorías únicas
 */
function inicializarFiltros() {
    const filtroSelect = document.getElementById("filtro-categoria");
    if (!filtroSelect) return;

    const categorias = obtenerCategoriasUnicas();
    let html = '<option value="">Todos</option>';
    categorias.forEach(c => {
        html += `<option value="${c}">${c}</option>`;
    });
    filtroSelect.innerHTML = html;
}

/**
 * Recupera y muestra los registros, opcionalmente filtrados por categoría.
 * @param {string} categoria
 */
function cargarLista(categoria = "", fechaDesde = "", fechaHasta = "", orden = "") {
    let registros = obtenerGastosFiltrados(categoria, fechaDesde, fechaHasta);

    // aplicar ordenamiento si se especifica
    if (orden) {
        const [criterio, direccion] = orden.split("_");
        registros = ordenarGastos(registros, criterio, direccion);
    }

    const contenedor = document.getElementById("lista-registros");

    if (!contenedor) return;

    if (registros.length === 0) {
        contenedor.innerHTML = `
            <p class="no-datos">No hay registros que mostrar</p>
        `;
        return;
    }

    let html = `
        <table class="tabla-registros">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Categoría</th>
                    <th>Descripción</th>
                    <th>Monto</th>
                </tr>
            </thead>
            <tbody>
    `;

    registros.forEach(r => {
        html += `
            <tr>
                <td>${r.fecha}</td>
                <td>${r.categoria}</td>
                <td>${r.descripcion}</td>
                <td>₡${parseFloat(r.monto).toFixed(2)}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    contenedor.innerHTML = html;
}
