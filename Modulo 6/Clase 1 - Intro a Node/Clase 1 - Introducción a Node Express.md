# Clase 1: Introducción a Node.js y Express – Del Frontend al Backend

## Índice de contenidos
1. Conociendo Node.js: JavaScript en el servidor
2. El modelo asincrónico y el Event Loop
3. Módulos nativos y npm (Node Package Manager): herramientas esenciales (fs, http)
4. Creando nuestro primer servidor HTTP con Node.js puro (Express da más seguridad con HTTPS, Reutilización middleware (Reglas y verificaciones predefinidas), manejo de rutas distinto al del módulo http)
5. Conociendo Express: Framework web para Node.js
6. Implementando un servidor básico con Express

---

## 1. Conociendo Node.js: JavaScript en el servidor

### JavaScript en el servidor
Node.js permite ejecutar código JavaScript fuera del navegador. Mientras en el frontend controlamos el DOM y eventos de UI, en el backend con Node.js podemos:
- Crear servidores web
- Acceder a bases de datos
- Manejar el sistema de archivos
- Procesar peticiones HTTP

### El motor V8: nuestro puente
El mismo motor que ejecuta JavaScript en Chrome (V8) es el que utiliza Node.js, lo que significa:
- Mismo lenguaje en frontend y backend
- Sintaxis y funcionalidades consistentes
- Herramientas de desarrollo familiares

### Peticiones asincrónicas
La clave de Node.js está en su modelo no bloqueante:

**Ejemplo comparativo:**
```javascript
// MODELO SÍNCRONO (bloqueante)
console.log("Paso 1");
leerArchivoGrande(); // Bloquea por 2 segundos
console.log("Paso 2"); // Espera 2 segundos

// MODELO ASINCRÓNICO (Node.js)
console.log("Paso 1");
leerArchivoGrande(() => {
  console.log("Archivo leído");
});
console.log("Paso 2"); // Se ejecuta inmediatamente
```

## 2. El modelo asincrónico y el Event Loop

**Ejemplo práctico del Event Loop:**
```javascript
console.log('1. Inicio del programa');

// Tarea asincrónica programada
setTimeout(() => {
  console.log('3. Timeout completado (2 segundos después)');
}, 2000);

// Operación inmediata
console.log('2. Fin de operaciones síncronas');

// Simulando lectura de archivo
setTimeout(() => {
  console.log('4. Lectura de BD completada (1 segundo después)');
}, 1000);

// Salida:
// 1. Inicio del programa
// 2. Fin de operaciones síncronas
// 4. Lectura de BD completada (1 segundo después)
// 3. Timeout completado (2 segundos después)
```

## 3. Módulos nativos y npm

### Módulo `http` - Creación de servidor básico:
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Servidor Node.js Funcionando</h1>');
  }
});

server.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
```

### Gestión con npm:
```bash
# Inicializar proyecto
npm init -y

# Instalar dependencias
npm install express

# package.json resultante
{
  "scripts": {
    "start": "node app.js"
  }
}
```

## 4. Primer servidor HTTP con Node.js puro

**server-node.js:**
```javascript
const http = require('http');

const productos = [
  { id: 1, nombre: "Laptop", precio: 1200 },
  { id: 2, nombre: "Mouse", precio: 25 },
  { id: 3, nombre: "Teclado", precio: 45 }
];

const usuarios = [
  { id: 1, nombre: "Ana", email: "ana@example.com" },
  { id: 2, nombre: "Carlos", email: "carlos@example.com" }
];

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.url === '/usuarios' && req.method === 'GET') {
    res.end(JSON.stringify(usuarios));
  } 
  else if (req.url === '/productos' && req.method === 'GET') {
    res.end(JSON.stringify(productos));
  }
  else if (req.url === '/' && req.method === 'GET') {
    res.end(JSON.stringify({ 
      mensaje: "API Node.js Pura",
      endpoints: ["/usuarios", "/productos"]
    }));
  }
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Ruta no encontrada" }));
  }
});

server.listen(3000, () => {
  console.log('Servidor Node.js puro: http://localhost:3000');
});
```

## 5. Conociendo Express: Framework web para Node.js

### Ventajas de Express sobre Node.js puro:
1. **Sintaxis simplificada**: Menos código boilerplate
2. **Sistema de routing**: Organización clara de rutas
3. **Middleware**: Funciones intermedias reutilizables
4. **Ecosistema**: Miles de módulos compatibles

### Infraestructura web con Express:
```javascript
// CON NODE.JS PURO
const server = http.createServer((req, res) => {
  if (req.url === '/usuarios') {
    // Lógica compleja para parsear y responder
  }
});

// CON EXPRESS
app.get('/usuarios', (req, res) => {
  // Lógica directa y clara
  res.json(usuarios);
});
```

### Middleware: Beneficios clave
Middleware son funciones que procesan peticiones antes de que lleguen a las rutas finales.

**Beneficios:**
- **Reutilización de código**: Una función para múltiples rutas
- **Modularidad**: Separación de responsabilidades
- **Flexibilidad**: Orden personalizable de ejecución
- **Extensibilidad**: Fácil agregar funcionalidades comunes

**Ejemplos comunes:**
- Autenticación de usuarios
- Logging de peticiones
- Parseo de datos (JSON, formularios)
- Compresión de respuestas
- Manejo de CORS

## 6. Implementando un servidor básico con Express

**Instalación rápida:**
```bash
mkdir mi-api-express
cd mi-api-express
npm init -y
npm install express
```

**app.js - Servidor Express con rutas GET:**
```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// DATOS DE EJEMPLO
const usuarios = [
  { id: 1, nombre: "Ana García", rol: "Administrador", email: "ana@example.com" },
  { id: 2, nombre: "Carlos López", rol: "Usuario", email: "carlos@example.com" },
  { id: 3, nombre: "Beatriz Ruiz", rol: "Editor", email: "beatriz@example.com" }
];

const productos = [
  { id: 1, nombre: "Laptop Dell XPS", precio: 1299.99, categoria: "Electrónica" },
  { id: 2, nombre: "Mouse Logitech MX", precio: 79.99, categoria: "Accesorios" },
  { id: 3, nombre: "Teclado Mecánico", precio: 119.99, categoria: "Accesorios" },
  { id: 4, nombre: "Monitor 4K", precio: 499.99, categoria: "Electrónica" }
];

const servicios = [
  { id: 1, nombre: "Desarrollo Web", descripcion: "Creación de aplicaciones web" },
  { id: 2, nombre: "Diseño Gráfico", descripcion: "Diseño de identidad visual" },
  { id: 3, nombre: "Consultoría IT", descripcion: "Asesoramiento tecnológico" }
];

// 1. RUTA PRINCIPAL - GET /
app.get('/', (req, res) => {
  res.json({
    mensaje: "API Express funcionando",
    version: "1.0.0",
    rutas_disponibles: [
      "GET  /api/usuarios",
      "GET  /api/usuarios/:id",
      "GET  /api/productos",
      "GET  /api/servicios"
    ]
  });
});

// 2. OBTENER TODOS LOS USUARIOS - GET /api/usuarios
app.get('/api/usuarios', (req, res) => {
  res.json({
    total: usuarios.length,
    usuarios: usuarios
  });
});

// 3. OBTENER USUARIO POR ID - GET /api/usuarios/:id
app.get('/api/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({
      error: "Usuario no encontrado",
      id_solicitado: id
    });
  }
});

// 4. OBTENER TODOS LOS PRODUCTOS - GET /api/productos
app.get('/api/productos', (req, res) => {
  // Filtrar por categoría si se proporciona
  const categoria = req.query.categoria;
  let productosFiltrados = productos;
  
  if (categoria) {
    productosFiltrados = productos.filter(p => 
      p.categoria.toLowerCase() === categoria.toLowerCase()
    );
  }
  
  res.json({
    total: productosFiltrados.length,
    filtro: categoria || "ninguno",
    productos: productosFiltrados
  });
});

// 5. OBTENER PRODUCTO POR ID - GET /api/productos/:id
app.get('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);
  
  if (producto) {
    res.json(producto);
  } else {
    res.status(404).json({
      error: "Producto no encontrado",
      id_solicitado: id
    });
  }
});

// 6. OBTENER TODOS LOS SERVICIOS - GET /api/servicios
app.get('/api/servicios', (req, res) => {
  res.json({
    total: servicios.length,
    servicios: servicios
  });
});

// 7. RUTA DE ESTADÍSTICAS - GET /api/estadisticas
app.get('/api/estadisticas', (req, res) => {
  res.json({
    estadisticas: {
      usuarios: usuarios.length,
      productos: productos.length,
      servicios: servicios.length,
      categorias_productos: [...new Set(productos.map(p => p.categoria))]
    },
    fecha: new Date().toLocaleString()
  });
});

// Ruta para 404 - No encontrado
app.use('*', (req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    ruta_solicitada: req.originalUrl,
    metodo: req.method
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor Express iniciado en http://localhost:${PORT}`);
  console.log('\n📡 Rutas GET disponibles:');
  console.log('  👥  GET /api/usuarios');
  console.log('  👤  GET /api/usuarios/1');
  console.log('  🛒  GET /api/productos');
  console.log('  🏷️   GET /api/productos?categoria=Electrónica');
  console.log('  🛒  GET /api/productos/2');
  console.log('  🔧  GET /api/servicios');
  console.log('  📊  GET /api/estadisticas');
});
```

### Cómo probar el servidor:

1. **Guardar el archivo** como `app.js`
2. **Ejecutar en terminal:**
```bash
node app.js
```

3. **Probar rutas en navegador:**
- http://localhost:3000/
- http://localhost:3000/api/usuarios
- http://localhost:3000/api/productos
- http://localhost:3000/api/servicios
- http://localhost:3000/api/productos?categoria=Electrónica
- http://localhost:3000/api/usuarios/2

4. **Probar con curl:**
```bash
curl http://localhost:3000/api/usuarios
curl "http://localhost:3000/api/productos?categoria=Accesorios"
```

### Estructura de respuesta esperada:

```json
// GET /api/usuarios
{
  "total": 3,
  "usuarios": [
    {
      "id": 1,
      "nombre": "Ana García",
      "rol": "Administrador",
      "email": "ana@example.com"
    },
    // ... más usuarios
  ]
}

// GET /api/productos?categoria=Electrónica
{
  "total": 2,
  "filtro": "Electrónica",
  "productos": [
    {
      "id": 1,
      "nombre": "Laptop Dell XPS",
      "precio": 1299.99,
      "categoria": "Electrónica"
    },
    // ... más productos filtrados
  ]
}
```

### Comparación final: Node.js vs Express

```javascript
// Node.js puro - Ruta GET /usuarios
if (req.url === '/usuarios' && req.method === 'GET') {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(usuarios));
}

// Express - Ruta GET /usuarios
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});
```

---