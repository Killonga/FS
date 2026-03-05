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
app.use((req, res) => {
  res.status(404).send("Ruta no encontrada");
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