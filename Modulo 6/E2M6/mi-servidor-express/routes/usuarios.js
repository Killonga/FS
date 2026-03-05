/**
 * Módulo 6: Ruta de Usuarios
 * Gestión y presentación de usuarios
 */

const express = require("express");
const router = express.Router();

/**
 * GET /usuarios
 * Página de gestión de usuarios
 */
router.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Gestión de Usuarios</title>
            <style>
                body { 
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    background-color: #f5f5f5;
                }
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    background: white;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                h1 { color: #333; }
                .info-box {
                    background: #e3f2fd;
                    border-left: 4px solid #2196F3;
                    padding: 15px;
                    margin: 20px 0;
                    border-radius: 4px;
                }
                .nav-link {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 10px 20px;
                    background: #667eea;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    transition: background 0.3s;
                }
                .nav-link:hover { background: #764ba2; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>👥 Gestión de Usuarios</h1>
                <div class="info-box">
                    <p><strong>Módulo en Desarrollo</strong></p>
                    <p>Esta sección permite gestionar los usuarios del sistema.</p>
                    <p>Próximamente: Crear, leer, actualizar y eliminar usuarios.</p>
                </div>
                <p>Usuarios activos: <strong>0</strong></p>
                <a href="/" class="nav-link">← Volver al inicio</a>
            </div>
        </body>
        </html>
    `);
});

module.exports = router;
