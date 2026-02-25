// Controlador de Reportes - Capa de Lógica de Negocio

document.addEventListener("DOMContentLoaded", function () {
    cargarReportes();
});

function cargarReportes() {
    const contenedor = document.getElementById("contenido-reportes");

    // Verificar si hay datos (usando el modelo)
    if (!hayGastosRegistrados()) {
        contenedor.innerHTML = `
            <div class="no-datos">
                <h2>📭 No hay gastos registrados</h2>
                <p>Comienza a registrar tus gastos para ver los reportes</p>
                <button onclick="location.href='registroGasto.html'">Registrar Gasto</button>
            </div>
        `;
        return;
    }

    // Obtener datos del modelo
    const estadisticas = obtenerEstadisticasGenerales();
    const totalGeneral = estadisticas.totalGastos;
    const cantidadGastos = estadisticas.cantidadGastos;
    const promedioGasto = estadisticas.promedioGasto;
    const categoriasOrdenadas = obtenerCategoriasOrdenadas();

    // Generar HTML de reportes
    contenedor.innerHTML = `
        <!-- Resumen de estadísticas -->
        <div class="resumen-stats">
            <div class="stat-box">
                <div class="stat-label">Total de Gastos</div>
                <div class="stat-value">${cantidadGastos}</div>
            </div>
            <div class="stat-box">
                <div class="stat-label">Promedio por Gasto</div>
                <div class="stat-value">₡${promedioGasto.toFixed(2)}</div>
            </div>
        </div>

        <!-- Total General -->
        <div class="reporte-card">
            <h3>💰 Total General</h3>
            <div class="total-general">₡${totalGeneral.toFixed(2)}</div>
        </div>

        <!-- Totales por Categoría -->
        <div class="reporte-card">
            <h3>📋 Totales por Categoría</h3>
            <div id="categorias-lista">
                ${generarListaCategorias(categoriasOrdenadas)}
            </div>
        </div>

        <!-- Gráfico -->
        <div class="grafico-container">
            <h3>📊 Distribución de Gastos por Categoría</h3>
            <canvas id="graficoCategorias"></canvas>
        </div>
    `;

    // Generar gráfico (usando datos del modelo)
    generarGrafico();
}

function generarListaCategorias(categoriasOrdenadas) {
    let html = '';

    categoriasOrdenadas.forEach(({ categoria, monto }) => {
        html += `
            <div class="categoria-item">
                <span class="categoria-nombre">${categoria}</span>
                <span class="categoria-monto">₡${monto.toFixed(2)}</span>
            </div>
        `;
    });

    return html;
}

function generarGrafico() {
    const ctx = document.getElementById('graficoCategorias').getContext('2d');

    // Obtener datos del modelo
    const datosGrafico = obtenerDatosGrafico();
    const categorias = datosGrafico.labels;
    const montos = datosGrafico.data;

    // Colores para las barras
    const colores = [
        'rgba(0, 153, 153, 0.8)',   
        'rgba(255, 153, 204, 0.8)',  
        'rgba(107, 194, 255, 0.8)',  
        'rgba(255, 99, 132, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(255, 205, 86, 0.8)',
        'rgba(153, 102, 255, 0.8)',
    ];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categorias,
            datasets: [{
                label: 'Total Gastado (₡)',
                data: montos,
                backgroundColor: colores.slice(0, categorias.length),
                borderColor: colores.slice(0, categorias.length).map(c => c.replace('0.8', '1')),
                borderWidth: 2,
                borderRadius: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return 'Total: ₡' + context.parsed.y.toFixed(2);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return '₡' + value.toFixed(0);
                        }
                    }
                }
            }
        }
    });
}