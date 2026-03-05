const express = require('express');
//Importando modulo fs y path para manejar archivos y rutas
const fs = require('fs');
//Importando modulo path para manejar rutas de archivos
const path = require('path');
const app = express();
const PORT =3000;
const filePath = path.join(__dirname, '/data/productos.json');

// Middleware para parsear el cuerpo de las solicitudes req.body
app.use(express.urlencoded({ extended: true }));

//Middleware para saber que metodo y de donde viene la solicitud
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


const getProductos = () => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

app.get('/productos', (req, res) => {
  const productos = getProductos();

  let html = `<!DOCTYPE html>
    <html>
        <head>
        <title>Lista de Productos</title>
        </head>
        <body>
            <h1>Lista de Productos</h1>
            <ul>`;

  productos.forEach(p => {
    html += `<li>${p.nombre} - $${p.precio}</li>`;
  });

  html += '</ul>';

  html += `
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

app.post('/productos', (req, res) => {
  const productos = getProductos();

  const nuevoProducto = {
    id: Date.now(),
    nombre: req.body.nombre,
    precio: Number(req.body.precio)
  };

  productos.push(nuevoProducto);

  fs.writeFileSync(filePath, JSON.stringify(productos, null, 2));

  res.redirect('/productos');
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});