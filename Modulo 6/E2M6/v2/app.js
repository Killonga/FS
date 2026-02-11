/**
 * Módulo 6: Dashboard con Partials y Helpers
 * Tema: Vistas dinámicas con HBS, parciales reutilizables y helpers personalizados
 * Descripción: Servidor Express que renderiza un dashboard con datos complejos
 */

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();

// ==================== CONFIGURACIÓN ====================
const PORT = process.env.PORT || 3000;

// Configurar directorio de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Servir archivos estáticos desde public
app.use(express.static(path.join(__dirname, 'public')));

// ==================== REGISTRO DE PARCIALES ====================
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ==================== REGISTRO DE HELPERS ====================
// Helper para asignar clases CSS según la prioridad
hbs.registerHelper('priorityClass', function(priority) {
  if (priority === 'alta') {
    return 'priority-high';
  } else if (priority === 'media') {
    return 'priority-medium';
  } else {
    return 'priority-low';
  }
});

// ==================== RUTAS ====================
// Ruta raíz
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Inicio</title>
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
        h1 { color: #667eea; }
        a {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          background: #667eea;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          transition: background 0.3s;
        }
        a:hover { background: #764ba2; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Bienvenido a Mi App Dinámica</h1>
        <p>Servidor Express con Partials y Helpers</p>
        <a href="/dashboard">Ir al Dashboard →</a>
      </div>
    </body>
    </html>
  `);
});

// Ruta del dashboard
app.get('/dashboard', (req, res) => {
  const data = {
    user: {
      name: 'Carlos',
      isAdmin: true
    },
    projects: [
      {
        name: 'API Gateway',
        isCompleted: false,
        tasks: [
          { description: 'Diseñar endpoints', priority: 'alta' },
          { description: 'Implementar JWT', priority: 'alta' },
          { description: 'Crear documentación', priority: 'media' }
        ]
      },
      {
        name: 'Refactor del Frontend',
        isCompleted: true,
        tasks: [
          { description: 'Migrar a React 18', priority: 'baja' },
          { description: 'Actualizar dependencias', priority: 'baja' }
        ]
      },
      {
        name: 'Base de Datos',
        isCompleted: false,
        tasks: [] // Proyecto sin tareas para probar el condicional 'else'
      }
    ]
  };
  res.render('dashboard', data);
});

// ==================== MIDDLEWARE DE ERROR 404 ====================
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

// ==================== INICIO DEL SERVIDOR ====================
app.listen(PORT, () => {
  console.log(`
╔═════════════════════════════════════════════════════╗
║  🚀 Servidor Express - Dashboard Modular           ║
║  URL: http://localhost:${PORT}                        ║
║  Módulo: 6 - Partials, Helpers y Vistas Dinámicas ║
║                                                     ║
║  📂 Estructura:                                    ║
║     ✓ views/          - Plantillas HBS             ║
║     ✓ views/partials/ - Parciales reutilizables   ║
║     ✓ public/         - Archivos estáticos        ║
║     ✓ app.js          - Configuración principal   ║
║                                                     ║
║  🔗 Rutas disponibles:                             ║
║     • GET /        - Página de inicio              ║
║     • GET /dashboard - Dashboard con datos        ║
╚═════════════════════════════════════════════════════╝
  `);
});
