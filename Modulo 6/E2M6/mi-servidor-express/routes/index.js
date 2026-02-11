/**
 * Módulo 6: Ruta Principal
 * Define la página de inicio con enlaces a todas las funcionalidades
 */

const express = require("express");
const router = express.Router();

/**
 * GET /
 * Página principal con menú de navegación
 */
router.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Servidor Express - Módulo 6</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { 
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .container {
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                    padding: 40px;
                    max-width: 600px;
                    width: 90%;
                }
                h1 { color: #333; margin-bottom: 30px; text-align: center; }
                .menu { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
                .menu-item {
                    display: block;
                    padding: 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                    text-align: center;
                    transition: transform 0.3s, box-shadow 0.3s;
                    font-weight: bold;
                }
                .menu-item:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                }
                .info {
                    background: #f0f0f0;
                    padding: 20px;
                    border-radius: 8px;
                    margin-top: 30px;
                    font-size: 0.9em;
                    color: #666;
                    text-align: center;
                }
                .status { color: #27ae60; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🚀 Servidor Express<br><small style="font-size: 0.6em;">Módulo 6</small></h1>
                <div class="menu">
                    <a href="/indicadores" class="menu-item">📈 Indicadores<br>Económicos</a>
                    <a href="/historico" class="menu-item">📊 Histórico<br>Completo</a>
                    <a href="/usuarios" class="menu-item">👥 Gestión de<br>Usuarios</a>
                    <a href="/status" class="menu-item">🔍 Estado del<br>Servidor</a>
                    <a href="/cache" class="menu-item">💾 Estado<br>Caché</a>
                </div>
                <div class="info">
                    <p>✅ Servidor corriendo normalmente</p>
                    <p style="margin-top: 10px; color: #999; font-size: 0.8em;">
                        Última actualización: ${new Date().toLocaleTimeString('es-CL')}
                    </p>
                </div>
            </div>
        </body>
        </html>
    `);
});

module.exports = router;
