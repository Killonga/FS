/**
 * Módulo 6: Ruta de Status
 * Monitoreo del estado del servidor
 */

const express = require("express");
const router = express.Router();
const indicadoresService = require("../services/indicadoresService");
const config = require("../config/config");

/**
 * GET /status
 * Muestra información del estado del servidor
 */
router.get("/", (req, res) => {
    const estadoCache = indicadoresService.estadoCache();
    const uptime = process.uptime();
    const uptimeFormato = `${Math.floor(uptime / 60)}m ${Math.floor(uptime % 60)}s`;

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Estado del Servidor</title>
            <style>
                body {
                    font-family: 'Courier New', monospace;
                    margin: 20px;
                    background-color: #1e1e1e;
                    color: #d4d4d4;
                }
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    background: #2d2d2d;
                    border: 1px solid #444;
                    border-radius: 8px;
                    padding: 20px;
                }
                h1 { color: #4ec9b0; margin-bottom: 20px; }
                h2 { color: #569cd6; margin-top: 20px; margin-bottom: 10px; }
                .status-item {
                    background: #1e1e1e;
                    padding: 12px;
                    margin: 8px 0;
                    border-left: 3px solid #569cd6;
                    border-radius: 4px;
                }
                .status-item strong { color: #ce9178; }
                .status-value { color: #b5cea8; }
                .good { color: #6a9955; }
                .warning { color: #dcdcaa; }
                .nav-link {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 10px 15px;
                    background: #569cd6;
                    color: #1e1e1e;
                    text-decoration: none;
                    border-radius: 4px;
                }
                .nav-link:hover { background: #4ec9b0; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🔍 Estado del Servidor</h1>
                
                <h2>📊 Servidor</h2>
                <div class="status-item">
                    <strong>Puerto:</strong> <span class="status-value">${config.server.port}</span>
                </div>
                <div class="status-item">
                    <strong>Entorno:</strong> <span class="status-value">${config.server.env}</span>
                </div>
                <div class="status-item">
                    <strong>Tiempo activo:</strong> <span class="good">${uptimeFormato}</span>
                </div>
                <div class="status-item">
                    <strong>Memoria usada:</strong> <span class="status-value">${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB</span>
                </div>

                <h2>💾 Caché</h2>
                <div class="status-item">
                    <strong>Estado:</strong> <span class="status-value">${estadoCache.estado}</span>
                </div>
                <div class="status-item">
                    <strong>Antigüedad:</strong> <span class="status-value">${estadoCache.edad || 'N/A'}</span>
                </div>
                <div class="status-item">
                    <strong>TTL configurado:</strong> <span class="status-value">${estadoCache.ttl}</span>
                </div>
                ${estadoCache.tiempoRestante ? `<div class="status-item">
                    <strong>Tiempo restante:</strong> <span class="warning">${estadoCache.tiempoRestante}</span>
                </div>` : ''}

                <h2>🌐 APIs Externas</h2>
                <div class="status-item">
                    <strong>Mindicador:</strong> <span class="status-value">${config.apis.mindicador.url}</span>
                </div>
                <div class="status-item">
                    <strong>Exchange Rate:</strong> <span class="status-value">${config.apis.exchangeRate.url}</span>
                </div>

                <a href="/" class="nav-link">← Volver al inicio</a>
            </div>
        </body>
        </html>
    `);
});

module.exports = router;
