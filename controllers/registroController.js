
//Controlador del registro de gastos

document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();    // Evita el envío por defecto del formulario


    // Obtiene los valores del formulario y crea el objeto gasto
    const gasto = {
        fecha: document.getElementById("fecha").value,
        categoria: document.getElementById("categoria").value,
        descripcion: document.getElementById("descripcion").value,
        monto: parseFloat(document.getElementById("monto").value)
    };

    // Validación de campos obligatorios
    if (!gasto.fecha || !gasto.categoria || !gasto.descripcion || isNaN(gasto.monto)) {
        alert("⚠️ Todos los campos son obligatorios");
        return;
    }

    // Validación de monto positivo
    if (gasto.monto <= 0) {
        alert("️⚠️ El monto debe ser mayor a cero");
        return;
    }

    // Guarda el gasto si pasa las validaciones
    guardarGasto(gasto);

    // Notifica éxito y limpia el formulario
    alert("✅ Gasto registrado correctamente");
    this.reset();
});