/**
 * Módulo 6: Ruta de Histórico
 * Muestra el histórico completo con tabla y estadísticas
 */

const express = require("express");
const router = express.Router();
const indicadoresService = require("../services/indicadoresService");

/**
 * GET /historico
 * Muestra el histórico completo de indicadores
 */
router.get("/", (req, res) => {
    const historico = indicadoresService.obtenerHistorico();
    const estadisticas = indicadoresService.obtenerEstadisticas();

    const filasHTML = historico.map((registro, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${registro.fecha}</td>
            <td>$${registro.uf}</td>
            <td>$${registro.dolar}</td>
            <td>$${registro.jpy}</td>
            <td>$${registro.bitcoin}</td>
        </tr>
    `).join('');

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Histórico de Indicadores</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    padding: 20px;
                }
                .container {
                    max-width: 1200px;
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
                .table-container {
                    overflow-x: auto;
                    margin-bottom: 30px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    background: white;
                }
                th {
                    background: #667eea;
                    color: white;
                    padding: 15px;
                    text-align: left;
                    font-weight: bold;
                }
                td {
                    padding: 12px 15px;
                    border-bottom: 1px solid #eee;
                }
                tbody tr:hover {
                    background: #f8f9fa;
                }
                tbody tr:nth-child(even) {
                    background: #f0f0f0;
                }
                .info-box {
                    background: #e3f2fd;
                    border-left: 4px solid #2196F3;
                    padding: 15px;
                    margin-bottom: 20px;
                    border-radius: 4px;
                }
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 15px;
                    margin-top: 20px;
                }
                .stat {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 20px;
                    border-radius: 8px;
                    text-align: center;
                }
                .stat-label { font-size: 0.9em; opacity: 0.9; }
                .stat-value { font-size: 1.5em; font-weight: bold; margin-top: 8px; }
                .nav-links {
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                .nav-link {
                    display: inline-block;
                    padding: 10px 20px;
                    background: #667eea;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    transition: background 0.3s;
                }
                .nav-link:hover { background: #764ba2; }
                .empty-message {
                    text-align: center;
                    padding: 40px;
                    color: #999;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>📊 Histórico de Indicadores</h1>
                    <p>Registro de todas las mediciones</p>
                </div>
                <div class="content">
                    ${historico.length > 0 ? `
                        <div class="info-box">
                            <strong>📈 Registros: ${historico.length}</strong>
                            <p>Últimas mediciones de indicadores económicos</p>
                        </div>

                        <div class="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Hora</th>
                                        <th>UF</th>
                                        <th>Dólar USD</th>
                                        <th>JPY</th>
                                        <th>Bitcoin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${filasHTML}
                                </tbody>
                            </table>
                        </div>

                        ${estadisticas ? `
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                            <h3 style="color: #333; margin-bottom: 15px;">📉 Estadísticas Generales</h3>
                            <div class="stats-grid">
                                <div class="stat">
                                    <div class="stat-label">UF Mínima</div>
                                    <div class="stat-value">\$${estadisticas.uf.min}</div>
                                </div>
                                <div class="stat">
                                    <div class="stat-label">UF Máxima</div>
                                    <div class="stat-value">\$${estadisticas.uf.max}</div>
                                </div>
                                <div class="stat">
                                    <div class="stat-label">UF Promedio</div>
                                    <div class="stat-value">\$${estadisticas.uf.promedio}</div>
                                </div>
                                <div class="stat">
                                    <div class="stat-label">Dólar Mínimo</div>
                                    <div class="stat-value">\$${estadisticas.dolar.min}</div>
                                </div>
                                <div class="stat">
                                    <div class="stat-label">Dólar Máximo</div>
                                    <div class="stat-value">\$${estadisticas.dolar.max}</div>
                                </div>
                                <div class="stat">
                                    <div class="stat-label">Dólar Promedio</div>
                                    <div class="stat-value">\$${estadisticas.dolar.promedio}</div>
                                </div>
                                <div class="stat">
                                    <div class="stat-label">Bitcoin Mínimo</div>
                                    <div class="stat-value">\$${estadisticas.bitcoin.min}</div>
                                </div>
                                <div class="stat">
                                    <div class="stat-label">Bitcoin Máximo</div>
                                    <div class="stat-value">\$${estadisticas.bitcoin.max}</div>
                                </div>
                                <div class="stat">
                                    <div class="stat-label">Bitcoin Promedio</div>
                                    <div class="stat-value">\$${estadisticas.bitcoin.promedio}</div>
                                </div>
                            </div>
                        </div>
                        ` : ''}
                    ` : `
                        <div class="empty-message">
                            <h2>📭 No hay registros</h2>
                            <p>Accede a /indicadores para capturar datos</p>
                        </div>
                    `}

                    <div class="nav-links">
                        <a href="/" class="nav-link">🏠 Inicio</a>
                        <a href="/indicadores" class="nav-link">📈 Indicadores</a>
                        <a href="/historico" class="nav-link">🔄 Actualizar</a>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `);
});

module.exports = router;
