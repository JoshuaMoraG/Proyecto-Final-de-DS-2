document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const gasto = {
        fecha: document.getElementById("fecha").value,
        categoria: document.getElementById("categoria").value,
        descripcion: document.getElementById("descripcion").value,
        monto: parseFloat(document.getElementById("monto").value)
    };

    if (!gasto.fecha || !gasto.categoria || !gasto.descripcion || isNaN(gasto.monto)) {
        alert("⚠️ Todos los campos son obligatorios");
        return;
    }

    if (gasto.monto <= 0) {
        alert("️⚠ El monto debe ser mayor a cero");
        return;
    }
        guardarGasto(gasto); 

    alert("✅ Gasto registrado correctamente");

    this.reset();
});
