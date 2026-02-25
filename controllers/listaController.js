/**
 * Controlador de la vista de lista de gastos.
 *
 * Inicializa los filtros de la interfaz, carga la lista inicial de registros
 * y reactiva la recarga cuando cambian filtros u orden.
 *
 * Dependencias externas:
 * - `obtenerCategoriasUnicas()`
 * - `obtenerGastosFiltrados(categoria, fechaDesde, fechaHasta)`
 * - `ordenarGastos(registros, criterio, direccion)`
 */
document.addEventListener("DOMContentLoaded", function () {
    inicializarFiltros();
    cargarLista();

    const filtroSelect = document.getElementById("filtro-categoria");
    const fechaDesde = document.getElementById("filtro-fecha-desde");
    const fechaHasta = document.getElementById("filtro-fecha-hasta");
    const ordenSelect = document.getElementById("ordenar-por");

    /**
     * Lee los valores actuales de los controles de filtro/orden y recarga la lista.
     * @private
     * @returns {void}
     */
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
 * Inicializa el select de categorías en la interfaz.
 * Busca el elemento `#filtro-categoria` y lo rellena con las categorías
 * devueltas por `obtenerCategoriasUnicas()`.
 * @returns {void}
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
 * Carga y renderiza la lista de registros de gasto.
 *
 * @param {string} [categoria=""] - Filtra por categoría (cadena vacía = todas).
 * @param {string} [fechaDesde=""] - Fecha mínima para filtrar (formato compatible con `obtenerGastosFiltrados`).
 * @param {string} [fechaHasta=""] - Fecha máxima para filtrar.
 * @param {string} [orden=""] - Orden en formato "criterio_direccion" (ej. "fecha_desc").
 * @returns {void}
 *
 * Dependencias:
 * - `obtenerGastosFiltrados(categoria, fechaDesde, fechaHasta)` debe devolver
 *   un array de objetos con al menos las propiedades: `fecha`, `categoria`, `descripcion`, `monto`.
 * - `ordenarGastos(registros, criterio, direccion)` ordena y devuelve el array.
 *
 * Comportamiento:
 * - Si no hay elemento `#lista-registros` no hace nada.
 * - Si no hay registros muestra un párrafo con la clase `no-datos`.
 * - Si hay registros construye una tabla HTML con las columnas Fecha, Categoría, Descripción y Monto.
 */
function cargarLista(categoria = "", fechaDesde = "", fechaHasta = "", orden = "") {
    let registros = obtenerGastosFiltrados(categoria, fechaDesde, fechaHasta);

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

