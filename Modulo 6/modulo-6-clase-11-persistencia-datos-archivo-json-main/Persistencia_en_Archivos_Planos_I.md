# Persistencia en Archivos Planos I

## CRUD con Node.js, Express y JSON

------------------------------------------------------------------------

## Objetivo de la clase

En esta clase aprenderemos a:

-   Usar el módulo nativo `fs`
-   Leer archivos con `fs.readFileSync()`
-   Escribir archivos con `fs.writeFileSync()`
-   Convertir datos con `JSON.parse()` y `JSON.stringify()`
-   Usar `express.urlencoded()`
-   Implementar el método HTTP `POST`
-   Usar `res.redirect()`
-   Construir un CRUD básico sin base de datos

------------------------------------------------------------------------

## 1. Inicializar el proyecto

En la terminal:

``` bash
npm init -y
npm install express
```

Estructura del proyecto:

    mi-crud/
    ├── app.js
    └── data/
        └── productos.json

------------------------------------------------------------------------

## 2. Crear archivo JSON inicial

Crear `data/productos.json`:

``` json
[]
```

Este archivo será nuestra base de datos simulada.

------------------------------------------------------------------------

## 3. Crear servidor básico

En `app.js`:

``` js
const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
```

------------------------------------------------------------------------

## 4. Introducción al módulo fs

Agregamos:

``` js
const fs = require('fs');
const path = require('path');
```

Creamos la ruta del archivo:

``` js
const filePath = path.join(__dirname, 'data', 'productos.json');
```

------------------------------------------------------------------------

## 5. Leer archivo con fs.readFileSync()

Creamos función:

``` js
function getProductos() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}
```

Conceptos:

-   `fs.readFileSync()` lee el archivo de forma bloqueante.
-   Devuelve texto.
-   `JSON.parse()` convierte texto JSON en objeto JavaScript.

------------------------------------------------------------------------

## 6. Middleware express.urlencoded()

Agregamos:

``` js
app.use(express.urlencoded({ extended: true }));
```

Esto permite que los datos enviados desde formularios estén disponibles
en:

``` js
req.body
```

------------------------------------------------------------------------

## 7. Ruta GET para listar productos

``` js
app.get('/productos', (req, res) => {
  const productos = getProductos();

  let html = '<h1>Lista de Productos</h1><ul>';

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
  `;

  res.send(html);
});
```

------------------------------------------------------------------------

## 8. Ruta POST para crear producto

``` js
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
```

Conceptos clave:

### Método POST

Se usa para enviar datos al servidor.

### req.body

Contiene los datos del formulario gracias a `express.urlencoded()`.

### JSON.stringify()

Convierte objeto JS en texto JSON.

El parámetro `null, 2` agrega indentación legible.

### fs.writeFileSync()

Escribe en el archivo reemplazando su contenido.

### res.redirect()

Redirige al cliente después del POST para evitar el reenvío del
formulario.

------------------------------------------------------------------------

## 9. Código completo final

``` js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));

const filePath = path.join(__dirname, 'data', 'productos.json');

function getProductos() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

app.get('/productos', (req, res) => {
  const productos = getProductos();

  let html = '<h1>Lista de Productos</h1><ul>';

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

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
```
