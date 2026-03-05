/**
 * Módulo 6: Ruta de Indicadores
 * Gestiona la presentación de indicadores económicos
 */

const express = require("express");
const router = express.Router();
const indicadoresService = require("../services/indicadoresService");

/**
 * GET /indicadores
 * Obtiene y muestra indicadores económicos
 */
router.get("/", async (req, res) => {
    try {
        const indicadores = await indicadoresService.obtenerIndicadores();
        const datosGrafico = indicadoresService.obtenerDatosGrafico();
        const estadisticas = indicadoresService.obtenerEstadisticas();

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Indicadores Económicos</title>
                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { 
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        min-height: 100vh;
                        padding: 20px;
                    }
                    .container {
                        max-width: 1000px;
                        margin: 0 auto;
                        background: white;
                        border-radius: 10px;
                        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                        overflow: hidden;
                    }
                    .header {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 30px 20px;
                        text-align: center;
                    }
                    .header h1 { font-size: 2em; margin-bottom: 10px; }
                    .content { padding: 30px; }
                    .indicators-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 15px;
                        margin-bottom: 30px;
                    }
                    .indicator { 
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        padding: 20px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        border-radius: 8px;
                        transition: transform 0.3s, box-shadow 0.3s;
                    }
                    .indicator:hover { 
                        transform: translateY(-5px);
                        box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
                    }
                    .label { font-weight: bold; opacity: 0.9; }
                    .value { 
                        font-size: 1.5em;
                        font-weight: bold;
                        margin-top: 8px;
                    }
                    .chart-section {
                        margin: 30px 0;
                        padding: 20px;
                        background: #f8f9fa;
                        border-radius: 8px;
                    }
                    .chart-title {
                        font-size: 1.3em;
                        font-weight: bold;
                        color: #333;
                        margin-bottom: 15px;
                    }
                    .chart-container {
                        position: relative;
                        height: 300px;
                        margin-bottom: 20px;
                    }
                    .stats-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                        gap: 15px;
                        margin-top: 20px;
                    }
                    .stat {
                        background: white;
                        padding: 15px;
                        border-radius: 6px;
                        border-left: 4px solid #667eea;
                    }
                    .stat-label { font-size: 0.85em; color: #666; }
                    .stat-value { font-weight: bold; color: #667eea; font-size: 1.1em; }
                    .record-count {
                        text-align: center;
                        color: #666;
                        font-size: 0.9em;
                        margin-top: 10px;
                    }
                    .timestamp {
                        text-align: center;
                        padding: 15px;
                        background: #f0f0f0;
                        border-top: 1px solid #ddd;
                        color: #666;
                        font-size: 0.9em;
                    }
                    .nav-links {
                        display: flex;
                        gap: 10px;
                        justify-content: center;
                        margin-top: 20px;
                        flex-wrap: wrap;
                    }
                    .nav-link, .btn {
                        display: inline-block;
                        padding: 10px 20px;
                        background: #667eea;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                        transition: background 0.3s;
                        border: none;
                        cursor: pointer;
                        font-size: 0.95em;
                    }
                    .nav-link:hover, .btn:hover { background: #764ba2; }
                    .btn-secondary {
                        background: #999;
                    }
                    .btn-secondary:hover {
                        background: #777;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>📈 Indicadores Económicos</h1>
                        <p>En Tiempo Real</p>
                    </div>
                    <div class="content">
                        <!-- Tarjetas de Indicadores Actuales -->
                        <div class="indicators-grid">
                            <div class="indicator">
                                <span class="label">Pesos Chilenos (UF)</span>
                                <span class="value">$${indicadores.uf}</span>
                            </div>
                            <div class="indicator">
                                <span class="label">Dólar USD</span>
                                <span class="value">$${indicadores.dolar}</span>
                            </div>
                            <div class="indicator">
                                <span class="label">Yen Japonés (JPY)</span>
                                <span class="value">$${indicadores.jpy}</span>
                            </div>
                            <div class="indicator">
                                <span class="label">Bitcoin</span>
                                <span class="value">$${indicadores.bitcoin}</span>
                            </div>
                        </div>

                        <!-- Gráficos Históricos -->
                        ${datosGrafico.dolar.length > 1 ? `
                        <div class="chart-section">
                            <div class="chart-title">📊 Evolución del Dólar USD</div>
                            <div class="chart-container">
                                <canvas id="chartDolar"></canvas>
                            </div>
                        </div>

                        <div class="chart-section">
                            <div class="chart-title">📊 Evolución de UF (Pesos Chilenos)</div>
                            <div class="chart-container">
                                <canvas id="chartUF"></canvas>
                            </div>
                        </div>

                        <div class="chart-section">
                            <div class="chart-title">📊 Evolución de Bitcoin</div>
                            <div class="chart-container">
                                <canvas id="chartBitcoin"></canvas>
                            </div>
                        </div>
                        ` : `
                        <div class="chart-section">
                            <p style="text-align: center; color: #999;">
                                💾 Acumula datos durante 60 segundos para ver gráficos...
                            </p>
                        </div>
                        `}

                        <!-- Estadísticas -->
                        ${estadisticas ? `
                        <div class="chart-section">
                            <div class="chart-title">📉 Estadísticas</div>
                            <div class="stats-grid">
                                <div>
                                    <strong>Dólar USD</strong>
                                    <div class="stat">
                                        <div class="stat-label">Mínimo</div>
                                        <div class="stat-value">$${estadisticas.dolar.min}</div>
                                    </div>
                                    <div class="stat" style="margin-top: 5px;">
                                        <div class="stat-label">Máximo</div>
                                        <div class="stat-value">$${estadisticas.dolar.max}</div>
                                    </div>
                                    <div class="stat" style="margin-top: 5px;">
                                        <div class="stat-label">Promedio</div>
                                        <div class="stat-value">$${estadisticas.dolar.promedio}</div>
                                    </div>
                                </div>
                                <div>
                                    <strong>UF</strong>
                                    <div class="stat">
                                        <div class="stat-label">Mínimo</div>
                                        <div class="stat-value">$${estadisticas.uf.min}</div>
                                    </div>
                                    <div class="stat" style="margin-top: 5px;">
                                        <div class="stat-label">Máximo</div>
                                        <div class="stat-value">$${estadisticas.uf.max}</div>
                                    </div>
                                    <div class="stat" style="margin-top: 5px;">
                                        <div class="stat-label">Promedio</div>
                                        <div class="stat-value">$${estadisticas.uf.promedio}</div>
                                    </div>
                                </div>
                                <div>
                                    <strong>Bitcoin</strong>
                                    <div class="stat">
                                        <div class="stat-label">Mínimo</div>
                                        <div class="stat-value">$${estadisticas.bitcoin.min}</div>
                                    </div>
                                    <div class="stat" style="margin-top: 5px;">
                                        <div class="stat-label">Máximo</div>
                                        <div class="stat-value">$${estadisticas.bitcoin.max}</div>
                                    </div>
                                    <div class="stat" style="margin-top: 5px;">
                                        <div class="stat-label">Promedio</div>
                                        <div class="stat-value">$${estadisticas.bitcoin.promedio}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="record-count">📊 ${estadisticas.registros} medición(es) registrada(s)</div>
                        </div>
                        ` : ''}

                        <div class="nav-links">
                            <a href="/" class="nav-link">← Volver</a>
                            <a href="/indicadores" class="nav-link">🔄 Actualizar</a>
                            <a href="/cache" class="nav-link">💾 Caché</a>
                        </div>
                    </div>
                    <div class="timestamp">
                        ⏱️ Actualizado: ${indicadores.timestamp}
                    </div>
                </div>

                <script>
                    const datosGrafico = ${JSON.stringify(datosGrafico)};

                    // Gráfico Dólar
                    ${datosGrafico.dolar.length > 1 ? `
                    const ctxDolar = document.getElementById('chartDolar').getContext('2d');
                    new Chart(ctxDolar, {
                        type: 'line',
                        data: {
                            labels: datosGrafico.etiquetas,
                            datasets: [{
                                label: 'Dólar USD',
                                data: datosGrafico.dolar,
                                borderColor: '#667eea',
                                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                                borderWidth: 2,
                                fill: true,
                                tension: 0.4,
                                pointRadius: 5,
                                pointBackgroundColor: '#667eea'
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false }
                            },
                            scales: {
                                y: {
                                    beginAtZero: false
                                }
                            }
                        }
                    });

                    // Gráfico UF
                    const ctxUF = document.getElementById('chartUF').getContext('2d');
                    new Chart(ctxUF, {
                        type: 'line',
                        data: {
                            labels: datosGrafico.etiquetas,
                            datasets: [{
                                label: 'UF',
                                data: datosGrafico.uf,
                                borderColor: '#764ba2',
                                backgroundColor: 'rgba(118, 75, 162, 0.1)',
                                borderWidth: 2,
                                fill: true,
                                tension: 0.4,
                                pointRadius: 5,
                                pointBackgroundColor: '#764ba2'
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false }
                            },
                            scales: {
                                y: {
                                    beginAtZero: false
                                }
                            }
                        }
                    });

                    // Gráfico Bitcoin
                    const ctxBitcoin = document.getElementById('chartBitcoin').getContext('2d');
                    new Chart(ctxBitcoin, {
                        type: 'line',
                        data: {
                            labels: datosGrafico.etiquetas,
                            datasets: [{
                                label: 'Bitcoin',
                                data: datosGrafico.bitcoin,
                                borderColor: '#f7931a',
                                backgroundColor: 'rgba(247, 147, 26, 0.1)',
                                borderWidth: 2,
                                fill: true,
                                tension: 0.4,
                                pointRadius: 5,
                                pointBackgroundColor: '#f7931a'
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false }
                            },
                            scales: {
                                y: {
                                    beginAtZero: false
                                }
                            }
                        }
                    });
                    ` : ''}
                </script>
            </body>
            </html>
        `;

        res.send(html);

    } catch (error) {
        res.status(500).send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Error</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        background: #fff3cd;
                    }
                    .error {
                        background: white;
                        border: 2px solid #ff6b6b;
                        color: #856404;
                        padding: 20px;
                        border-radius: 8px;
                        max-width: 600px;
                        margin: 0 auto;
                    }
                    h2 { color: #ff6b6b; }
                    .error-message {
                        background: #f5f5f5;
                        padding: 15px;
                        border-radius: 4px;
                        margin: 15px 0;
                        font-family: monospace;
                        font-size: 0.9em;
                    }
                    .solutions {
                        background: #e3f2fd;
                        padding: 15px;
                        border-radius: 4px;
                        margin: 15px 0;
                    }
                    .solutions li {
                        margin: 8px 0;
                    }
                    a { color: #667eea; text-decoration: none; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="error">
                    <h2>⚠️ Error al obtener los indicadores</h2>
                    <div class="error-message">
                        <strong>Mensaje:</strong> ${error.message}
                    </div>
                    
                    ${error.message.includes('timeout') ? `
                    <div class="solutions">
                        <strong>🔧 Soluciones:</strong>
                        <ul>
                            <li>Las APIs externas están respondiendo lentamente</li>
                            <li>Revisa tu conexión a Internet</li>
                            <li>Intenta nuevamente en unos segundos</li>
                            <li>Si el problema persiste, los servidores de las APIs pueden estar caídos</li>
                        </ul>
                    </div>
                    ` : ''}
                    
                    <div>
                        <a href="/" style="display: inline-block; padding: 10px 20px; background: #667eea; color: white; border-radius: 4px;">← Volver al inicio</a>
                        <a href="/indicadores" style="display: inline-block; padding: 10px 20px; background: #4caf50; color: white; border-radius: 4px; margin-left: 10px;">🔄 Reintentar</a>
                    </div>
                </div>
            </body>
            </html>
        `);
    }
});

module.exports = router;
