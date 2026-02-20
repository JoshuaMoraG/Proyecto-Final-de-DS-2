// Modelo de Gasto

function obtenerGastos() {
    return JSON.parse(localStorage.getItem("gastos")) || [];
}

function guardarGasto(gasto) {
    const gastos = obtenerGastos();
    gastos.push(gasto);
    localStorage.setItem("gastos", JSON.stringify(gastos));
}

/**
 * Devuelve un arreglo de categorías únicas de los gastos guardados
 * @returns {Array<string>} Categorías únicas
 */
function obtenerCategoriasUnicas() {
    const gastos = obtenerGastos();
    const categorias = gastos.map(g => g.categoria);
    // eliminar duplicados
    return [...new Set(categorias)];
}

/**
 * Retorna los gastos filtrados por categoría. Si no se pasa categoría o es "" o "Todos"
 * devuelve todos los gastos.
 * @param {string} categoria
 * @returns {Array<Object>} Gastos filtrados
 */
function obtenerGastosFiltrados(categoria, fechaDesde, fechaHasta) {
    let gastos = obtenerGastos();

    // filtro por categoria
    if (categoria && categoria !== '' && categoria !== 'Todos') {
        gastos = gastos.filter(g => g.categoria === categoria);
    }

    // filtro por rango de fechas (incluye ambas)
    if (fechaDesde) {
        gastos = gastos.filter(g => g.fecha >= fechaDesde);
    }
    if (fechaHasta) {
        gastos = gastos.filter(g => g.fecha <= fechaHasta);
    }

    return gastos;
}

/**
 * Ordena un arreglo de gastos según un criterio y dirección
 * @param {Array} gastos
 * @param {string} criterio 'monto'|'fecha'
 * @param {string} direccion 'asc'|'desc'
 * @returns {Array}
 */
function ordenarGastos(gastos, criterio, direccion) {
    const copia = [...gastos];
    copia.sort((a, b) => {
        let va = a[criterio];
        let vb = b[criterio];

        if (criterio === 'monto') {
            va = parseFloat(va);
            vb = parseFloat(vb);
        }

        if (va < vb) return direccion === 'asc' ? -1 : 1;
        if (va > vb) return direccion === 'asc' ? 1 : -1;
        return 0;
    });
    return copia;
}



