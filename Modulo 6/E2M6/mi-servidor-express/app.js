/**
 * Módulo 6: Servidor Express Atomizado
 * Tema: Manejo modular de rutas, peticiones HTTP y APIs externas
 * Descripción: Servidor que consulta indicadores económicos con arquitectura modular
 * 
 * Estructura:
 * ├── config/          → Configuración centralizada
 * ├── services/        → Lógica de negocio (APIs, caché)
 * ├── routes/          → Definición de rutas
 * ├── utils/           → Utilidades (caché, helpers)
 * └── app.js           → Punto de entrada (limpio y simple)
 */

const express = require("express");
const config = require("./config/config");

// ==================== INICIALIZACIÓN ====================
const app = express();
const { port } = config.server;

// ==================== RUTAS ====================
// Importar todas las rutas modulares
const rutaIndex = require("./routes/index");
const rutaIndicadores = require("./routes/indicadores");
const rutaUsuarios = require("./routes/usuarios");
const rutaStatus = require("./routes/status");
const rutaCache = require("./routes/cache");
const rutaHistorico = require("./routes/historico");

// ==================== REGISTRO DE RUTAS ====================
app.use("/", rutaIndex);
app.use("/indicadores", rutaIndicadores);
app.use("/usuarios", rutaUsuarios);
app.use("/status", rutaStatus);
app.use("/cache", rutaCache);
app.use("/historico", rutaHistorico);

// ==================== MIDDLEWARE DE ERROR ====================
app.use((err, req, res, next) => {
    console.error("❌ Error no capturado:", err.message);
    res.status(500).send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Error del Servidor</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; background: #ffe5e5; }
                .error { 
                    background: #fff; 
                    border: 2px solid #ff0000;
                    color: #333;
                    padding: 20px;
                    border-radius: 8px;
                    max-width: 600px;
                    margin: 0 auto;
                }
            </style>
        </head>
        <body>
            <div class="error">
                <h1>🔴 Error Interno del Servidor</h1>
                <p><strong>Mensaje:</strong> ${err.message}</p>
                <p><a href="/">← Volver al inicio</a></p>
            </div>
        </body>
        </html>
    `);
});

// ==================== 404 NOT FOUND ====================
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Página No Encontrada</title>
            <style>
                body { 
                    font-family: Arial, sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                }
                .container {
                    text-align: center;
                    background: white;
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                }
                h1 { color: #667eea; font-size: 3em; margin: 0; }
                p { color: #666; }
                a { color: #667eea; text-decoration: none; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>404</h1>
                <p>Página no encontrada</p>
                <p><a href="/">← Volver al inicio</a></p>
            </div>
        </body>
        </html>
    `);
});

// ==================== INICIACIÓN DEL SERVIDOR ====================
app.listen(port, () => {
    console.log(`
    ╔═════════════════════════════════════════╗
    ║  🚀 Servidor Express Atomizado         ║
    ║  URL: http://localhost:${port}            ║
    ║  Módulo: 6 - Rutas y APIs              ║
    ║  Entorno: ${config.server.env.toUpperCase()}                   ║
    ║                                         ║
    ║  📁 Estructura:                         ║
    ║     ✓ config/      - Configuración     ║
    ║     ✓ services/    - Lógica negocio   ║
    ║     ✓ routes/      - Rutas modulares  ║
    ║     ✓ utils/       - Utilidades       ║
    ╚═════════════════════════════════════════╝
    `);
});
