// Modelo de Reportes - Capa de Datos

/**
 * Obtiene el total general de todos los gastos
 * @returns {number} Total de gastos
 */
function obtenerTotalGeneral() {
    const gastos = obtenerGastos();
    return gastos.reduce((total, gasto) => total + parseFloat(gasto.monto), 0);
}

/**
 * Obtiene los totales agrupados por categoría
 * @returns {Object} Objeto con categorías como keys y totales como values
 */
function obtenerTotalesPorCategoria() {
    const gastos = obtenerGastos();
    const totales = {};

    gastos.forEach(gasto => {
        const categoria = gasto.categoria;
        if (!totales[categoria]) {
            totales[categoria] = 0;
        }
        totales[categoria] += parseFloat(gasto.monto);
    });

    return totales;
}

/**
 * Obtiene estadísticas generales de gastos
 * @returns {Object} Objeto con cantidad, promedio, total
 */
function obtenerEstadisticasGenerales() {
    const gastos = obtenerGastos();
    const cantidad = gastos.length;
    const total = obtenerTotalGeneral();
    const promedio = cantidad > 0 ? total / cantidad : 0;

    return {
        cantidadGastos: cantidad,
        totalGastos: total,
        promedioGasto: promedio
    };
}

/**
 * Obtiene las categorías ordenadas por monto (de mayor a menor)
 * @returns {Array} Array de objetos [{categoria, monto}, ...]
 */
function obtenerCategoriasOrdenadas() {
    const totales = obtenerTotalesPorCategoria();

    return Object.entries(totales)
        .map(([categoria, monto]) => ({ categoria, monto }))
        .sort((a, b) => b.monto - a.monto);
}

/**
 * Obtiene los datos necesarios para generar el gráfico
 * @returns {Object} Objeto con labels y data para el gráfico
 */
function obtenerDatosGrafico() {
    const totales = obtenerTotalesPorCategoria();

    return {
        labels: Object.keys(totales),
        data: Object.values(totales)
    };
}

/**
 * Verifica si hay gastos registrados
 * @returns {boolean} True si hay gastos, false si no
 */
function hayGastosRegistrados() {
    const gastos = obtenerGastos();
    return gastos.length > 0;
}