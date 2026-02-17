document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault();

    const fecha = document.getElementById("fecha").value;
    const categoria = document.getElementById("categoria").value;
    const descripcion = document.getElementById("descripcion").value;
    const monto = document.getElementById("monto").value;

    if (parseFloat(monto) <= 0) {
        alert("⚠️ El monto debe ser una cantidad válida mayor a cero.");
        return;
    }

    alert(
        "✅ ¡Gasto registrado correctamente!\n\n" +
        "Fecha: " + fecha + "\n" +
        "Categoría: " + categoria + "\n" +
        "Descripción: " + descripcion + "\n" +
        "Monto: $" + monto
    );

    this.reset();
});
