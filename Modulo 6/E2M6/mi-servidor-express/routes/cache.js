/**
 * Módulo 6: Ruta de Caché
 * Gestión y monitoreo del caché
 */

const express = require("express");
const router = express.Router();
const indicadoresService = require("../services/indicadoresService");

/**
 * GET /cache
 * Muestra información del caché
 */
router.get("/", (req, res) => {
    const estadoCache = indicadoresService.estadoCache();

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Gestión de Caché</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    background-color: #f5f5f5;
                }
                .container {
                    max-width: 700px;
                    margin: 0 auto;
                    background: white;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                h1 { color: #333; }
                .cache-info {
                    background: #e8f5e9;
                    border-left: 4px solid #4caf50;
                    padding: 20px;
                    margin: 20px 0;
                    border-radius: 4px;
                }
                .cache-info p {
                    margin: 8px 0;
                    font-size: 1.05em;
                }
                .label { font-weight: bold; color: #333; }
                .value { color: #2196f3; }
                .estado {
                    display: inline-block;
                    padding: 5px 10px;
                    background: #4caf50;
                    color: white;
                    border-radius: 4px;
                    font-weight: bold;
                }
                .estado.vacio { background: #ff9800; }
                .estado.expirado { background: #f44336; }
                .button-group {
                    margin: 20px 0;
                    display: flex;
                    gap: 10px;
                }
                button, a.btn {
                    padding: 10px 20px;
                    background: #667eea;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    text-decoration: none;
                    transition: background 0.3s;
                }
                button:hover, a.btn:hover {
                    background: #764ba2;
                }
                .nav-link {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 10px 20px;
                    background: #999;
                    color: white;
                    text-decoration: none;
                    border-radius: 4px;
                    transition: background 0.3s;
                }
                .nav-link:hover { background: #666; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>💾 Gestión de Caché</h1>
                
                <div class="cache-info">
                    <h2 style="color: #333; margin-bottom: 15px;">Estado Actual</h2>
                    <p><span class="label">Estado:</span> <span class="estado ${estadoCache.estado === 'vacío' ? 'vacio' : estadoCache.estado === 'expirado' ? 'expirado' : ''}">${estadoCache.estado.toUpperCase()}</span></p>
                    ${estadoCache.edad ? `<p><span class="label">Antigüedad:</span> <span class="value">${estadoCache.edad}</span></p>` : ''}
                    <p><span class="label">TTL:</span> <span class="value">${estadoCache.ttl}</span></p>
                    ${estadoCache.tiempoRestante ? `<p><span class="label">Tiempo restante:</span> <span class="value">${estadoCache.tiempoRestante}</span></p>` : ''}
                </div>

                <div class="button-group">
                    <form method="POST" action="/cache/limpiar" style="margin: 0;">
                        <button type="submit">🗑️ Limpiar Caché</button>
                    </form>
                </div>

                <p style="color: #666; font-size: 0.9em; margin-top: 20px;">
                    💡 El caché se limpia automáticamente después de ${estadoCache.ttl} de inactividad.
                </p>

                <a href="/" class="nav-link">← Volver al inicio</a>
            </div>
        </body>
        </html>
    `);
});

/**
 * POST /cache/limpiar
 * Limpia el caché manualmente
 */
router.post("/limpiar", (req, res) => {
    indicadoresService.limpiarCache();
    res.redirect("/cache");
});

module.exports = router;
