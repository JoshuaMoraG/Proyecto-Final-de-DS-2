// Reports Controller - Business Logic Layer

document.addEventListener("DOMContentLoaded", function () {
    loadReports();
});

function loadReports() {
    const container = document.getElementById("report-content");

    // Verify if there is data (using the model)
    if (!haveExpensesBeenRegistered()) {
        container.innerHTML = `
            <div class="no-data">
                <h2>💭 No expenses registered</h2>
                <p>Start registering your expenses to see the reports</p>
                <button onclick="location.href='registroGasto.html'">Register Expense</button>
            </div>
        `;
        return;
    }

    // Get data from the model
    const statistics = getGeneralStatistics();
    const totalAmount = statistics.totalExpenses;
    const expenseCount = statistics.expenseCount;
    const expenseAverage = statistics.expenseAverage;
    const orderedCategories = getOrderedCategories();

    // Generar HTML de reportes
    container.innerHTML = `
        <!-- Resumen de estadísticas -->
        <div class="resumen-stats">
            <div class="stat-box">
                <div class="stat-label">Total de Gastos</div>
                <div class="stat-value">${expenseCount}</div>
            </div>
            <div class="stat-box">
                <div class="stat-label">Promedio por Gasto</div>
                <div class="stat-value">₡${expenseAverage.toFixed(2)}</div>
            </div>
        </div>

        <!-- Total General -->
        <div class="report-card">
            <h3>💰 Total General</h3>
            <div class="total-general">₡${totalAmount.toFixed(2)}</div>
        </div>

        <!-- Totales por Categoría -->
        <div class="report-card">
            <h3>📋 Totales por Categoría</h3>
            <div id="categorias-lista">
                ${generateCategoryList(orderedCategories)}
            </div>
        </div>

        <!-- Gráfico -->
        <div class="chart-container">
            <h3>📊 Distribución de Gastos por Categoría</h3>
            <canvas id="chartCategories"></canvas>
        </div>
    `;

    // Generar gráfico (usando datos del modelo)
    generateChart();
}

function generateCategoryList(orderedCategories) {
    let html = '';

    orderedCategories.forEach(({ category, amount }) => {
        html += `
            <div class="category-item">
                <span class="category-name">${category}</span>
                <span class="category-amount">₡${amount.toFixed(2)}</span>
            </div>
        `;
    });

    return html;
}

function generateChart() {
    const ctx = document.getElementById('chartCategories').getContext('2d');

    // Get data from the model
    const chartData = getChartData();
    const categories = chartData.labels;
    const amounts = chartData.data;

    // Colors for the bars
    const colors = [
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
            labels: categories,
            datasets: [{
                label: 'Total Spent (₡)',
                data: amounts,
                backgroundColor: colors.slice(0, categories.length),
                borderColor: colors.slice(0, categories.length).map(c => c.replace('0.8', '1')),
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