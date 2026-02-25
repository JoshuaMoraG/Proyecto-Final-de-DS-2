
/**
 * Controlador del Registro de Gastos
 * ====================================
 * Gestiona la funcionalidad del formulario para registrar nuevos gastos.
 * Valida los datos ingresados y los guarda en el almacenamiento local.
 */


document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();

    /**
     * Objeto Gasto
     * @type {Object}
     * @property {string} fecha
     * @property {string} categoria 
     * @property {string} descripcion 
     * @property {number} monto 
     */

    const gasto = {
        fecha: document.getElementById("fecha").value,
        categoria: document.getElementById("categoria").value,
        descripcion: document.getElementById("descripcion").value,
        monto: parseFloat(document.getElementById("monto").value)
    };

    /**
     * VALIDACIÓN 1: Verifica que todos los campos requeridos estén completos
     * - Valida que la fecha no esté vacía
     * - Valida que la categoría no esté vacía
     * - Valida que la descripción no esté vacía
     * - Valida que el monto sea un número válido (no NaN)
     */

    if (!gasto.fecha || !gasto.categoria || !gasto.descripcion || isNaN(gasto.monto)) {
        alert("⚠️ Todos los campos son obligatorios");
        return;
    }

    /**
     * VALIDACIÓN 2: Verifica que el monto sea un valor positivo
     * - El monto debe ser mayor a 0
     * - Previene el registro de gastos con montos negativos o cero
     */

    if (gasto.monto <= 0) {
        alert("️⚠️ El monto debe ser mayor a cero");
        return;
    }

    guardarGasto(gasto);

    alert("✅ Gasto registrado correctamente");
    this.reset();
});