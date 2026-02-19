// Modelo de Gasto

function obtenerGastos() {
    return JSON.parse(localStorage.getItem("gastos")) || [];
}

function guardarGasto(gasto) {
    const gastos = obtenerGastos();
    gastos.push(gasto);
    localStorage.setItem("gastos", JSON.stringify(gastos));
}



