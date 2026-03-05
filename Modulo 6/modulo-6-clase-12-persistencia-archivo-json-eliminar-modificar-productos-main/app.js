const express = require('express');
//Importando modulo fs y path para manejar archivos y rutas
const fs = require('fs');
//Importando modulo path para manejar rutas de archivos
const path = require('path');
const productosManager = require('./data/productosManager');
const app = express();
const PORT = 3000;
const filePath = path.join(__dirname, '/data/productos.json');

// Middleware para parsear el cuerpo de las solicitudes req.body
app.use(express.urlencoded({ extended: true }));

//Middleware para saber que metodo y de donde viene la solicitud
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

//Lista los productos y muestra un formulario para agregar nuevos productos
app.get('/productos', (req, res) => {
  const productos = productosManager.getAll();

  let html = `<!DOCTYPE html>
    <html>
        <head>
        <title>Lista de Productos</title>
        </head>
        <style>
        /* Contenedor general */
.producto-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  margin: 12px 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.producto-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}

/* Información */
.producto-info {
  display: flex;
  flex-direction: column;
}

.producto-id {
  font-size: 12px;
  color: #888;
}

.producto-nombre {
  margin: 4px 0;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.producto-precio {
  font-size: 16px;
  color: #27ae60;
  font-weight: 600;
}

/* Acciones */
.producto-acciones {
  display: flex;
  gap: 10px;
}

/* Botones */
.btn {
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.editar {
  background-color: #3498db;
  color: white;
}

.editar:hover {
  background-color: #2980b9;
}

.eliminar {
  background-color: #e74c3c;
  color: white;
}

.eliminar:hover {
  background-color: #c0392b;
}
        </style>
        <body>
            <h1>Lista de Productos</h1>
            <ul>`;

  productos.forEach(p => {
    html +=/*html*/ `
    <div class="producto-card">
      <div class="producto-info">
        <span class="producto-id">ID: ${p.id}</span>
        <h3 class="producto-nombre">${p.nombre}</h3>
        <p class="producto-precio">$${p.precio}</p>
      </div>
      <div class="producto-acciones">
        <a class="btn editar" href="/productos/editar/${p.id}">Editar</a>
        <a class="btn eliminar" href="/productos/eliminar/${p.id}">Eliminar</a>
      </div>
    </div>
  `;
  });

  html += /*html*/`</ul>`;

  html += /*html*/`
    <h2>Agregar Producto</h2>
    <form method="POST" action="/productos">
      <input name="nombre" placeholder="Nombre"><br>
      <input name="precio" type="number" placeholder="Precio"><br>
      <button type="submit">Guardar</button>
    </form>
    </body>
    </html>
  `;

  res.send(html);
});

//Recibe los datos del formulario, 
//agrega el nuevo producto al archivo JSON 
//y redirige a la lista de productos
app.post('/productos', (req, res) => {

  const nuevoProducto = {
    id: Date.now(),
    nombre: req.body.nombre,
    precio: Number(req.body.precio)
  };

  productosManager.create(nuevoProducto);

  res.redirect('/productos');
});

// Ruta para ELIMINAR un producto (GET - por simplicidad)
app.get('/productos/eliminar/:id', (req, res) => {

  // Convertimos a número, ya que Date.now() da un número
  const id = Number(req.params.id);

  // Usamos el manager
  productosManager.remove(id);

  res.redirect('/productos');
});

// Ruta para MOSTRAR el formulario de edición (GET)
app.get('/productos/editar/:id', (req, res) => {
  const id = Number(req.params.id);
  const producto = productosManager.getById(id); // Usamos el manager para obtener el producto

  if (!producto) {
    return res.send('Producto no encontrado');
  }

  res.send(`<!DOCTYPE html>
    <html>
        <head>
        <title>Lista de Productos</title>
        </head>
        <body>
        <h1>Editar Producto</h1>
        <form method="POST" action="/productos/editar/${id}">
            <input name="nombre" value="${producto.nombre}" placeholder="Nombre" required>
            <input name="precio" value="${producto.precio}" type="number" placeholder="Precio" required>
            <button type="submit">Actualizar</button>
        </form>
        <a href="/productos">Volver</a>
        </body>
    </html>
    `);
});

// Ruta para PROCESAR la edición (POST)
app.post('/productos/editar/:id', (req, res) => {

  const id = Number(req.params.id);

  productosManager.update(id, { // Usamos el manager para actualizar
    nombre: req.body.nombre,
    precio: Number(req.body.precio)
  });

  res.redirect('/productos');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});