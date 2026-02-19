# Persistencia en Archivos Planos II
## CRUD Completo + Modularización (Data Manager)

---

## 🎯 Objetivos de la clase

En esta segunda parte vamos a:

- Recapitular GET y POST.
- Implementar DELETE (eliminar).
- Implementar UPDATE (modificar).
- Optimizar el código aplicando **modularización**.
- Separar responsabilidades (Principio de Responsabilidad Única).
- Crear una capa de acceso a datos (`productosManager.js`).

---

## 🔁 1. Recapitulación Clase Anterior

En la clase anterior construimos un servidor básico con las siguientes características:

✔ Ruta GET `/productos` → Listar productos.
✔ Ruta POST `/productos` → Crear un nuevo producto.
✔ Persistencia en archivo JSON usando:
   - `fs.readFileSync()`
   - `fs.writeFileSync()`
   - `JSON.parse()`
   - `JSON.stringify()`
   - `express.urlencoded()` (middleware para procesar formularios)
   - `res.redirect()` (para evitar reenvío de formularios)

Sin embargo, todo el código (lógica del servidor, lectura/escritura de archivos y lógica de negocio) estaba mezclado en un solo archivo: `app.js`. Esto **NO es una buena práctica**.

---

## ⚠ El Problema Actual: Código Espagueti

Nuestro archivo `app.js` actual tiene demasiadas responsabilidades:

1.  **Configurar y levantar el servidor** (Express).
2.  **Definir las rutas** (GET, POST).
3.  **Leer y escribir en el sistema de archivos** (`fs`).
4.  **Manejar la lógica de negocio** (cómo crear un producto, qué estructura tiene).

Esto viola el:

### Principio de Responsabilidad Única (SRP)

> "Cada módulo, clase o función debe tener una sola razón para cambiar."

Si en el futuro decidimos cambiar nuestro sistema de persistencia (por ejemplo, de un archivo JSON a una base de datos como MongoDB o MySQL), tendríamos que modificar todo `app.js`. Esto hace que el código sea difícil de mantener, probar y escalar.

---

## 🧠 Solución: Modularización (Data Manager)

La solución es separar la lógica de acceso a datos en su propio módulo. Esto crea una **capa de abstracción** entre nuestra aplicación y el archivo físico.

### Nueva Estructura del Proyecto

```bash
mi-crud/
│
├── app.js                  # Capa de presentación (rutas y lógica de servidor)
├── data/                   # Capa de acceso a datos
│   ├── productos.json      # Archivo de persistencia
│   └── productosManager.js # Módulo que maneja la lógica del archivo
```
---

## 📦 2. Crear el Data Manager (`productosManager.js`)

Este archivo será el único responsable de interactuar con `productos.json`. El resto de la aplicación (app.js) no necesita saber cómo se guardan los datos, solo que puede pedirle a este "manager" que los obtenga, los guarde, los modifique o los elimine.

**Archivo:** `data/productosManager.js`

```javascript
const fs = require('fs');
const path = require('path');

// Definimos la ruta fija al archivo JSON
const filePath = path.join(__dirname, 'productos.json');

/**
 * Lee el archivo JSON y devuelve un array de productos.
 * @returns {Array} - Lista de productos.
 */
function getAll() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

/**
 * Sobrescribe el archivo JSON con un nuevo array de productos.
 * @param {Array} productos - El array completo de productos a guardar.
 */
function saveAll(productos) {
    // El null, 2 es para que el JSON se guarde con formato legible (con indentación)
  fs.writeFileSync(filePath, JSON.stringify(productos, null, 2));
}

/**
 * Agrega un nuevo producto al archivo.
 * @param {Object} producto - El producto a agregar.
 */
function create(producto) {
  const productos = getAll();
  productos.push(producto);
  saveAll(productos);
}

/**
 * Busca un producto por su ID.
 * @param {number|string} id - El ID del producto a buscar.
 * @returns {Object|undefined} - El producto encontrado o undefined.
 */
function getById(id) {
  const productos = getAll();
  return productos.find(p => p.id === id);
}

/**
 * Actualiza un producto existente.
 * @param {number|string} id - El ID del producto a actualizar.
 * @param {Object} datosActualizados - Objeto con los nuevos datos.
 */
function update(id, datosActualizados) {
  const productos = getAll();
  const index = productos.findIndex(p => p.id === id);

  if (index !== -1) {
    // Fusionamos el producto existente con los nuevos datos
    productos[index] = { ...productos[index], ...datosActualizados };
    saveAll(productos);
  }
}

/**
 * Elimina un producto por su ID.
 * @param {number|string} id - El ID del producto a eliminar.
 */
function remove(id) {
  const productos = getAll();
  const nuevosProductos = productos.filter(p => p.id !== id);
  saveAll(nuevosProductos);
}

// Exportamos las funciones para que puedan ser usadas desde otros archivos
module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
```

---

## 🧹 3. Refactorizar `app.js`

Ahora, simplificamos `app.js` para que solo se encargue de las rutas y la presentación, delegando toda la lógica de datos al `productosManager`.

**Archivo:** `app.js`

```javascript
const express = require('express');
const productosManager = require('./data/productosManager'); // Importamos nuestro manager

const app = express();

// Middleware para procesar datos de formularios
app.use(express.urlencoded({ extended: true }));

// Ruta para LISTAR productos (GET)
app.get('/productos', (req, res) => {

  const productos = productosManager.getAll(); // Usamos el manager

  let lista = '';
  productos.forEach(p => {
    lista += `
      <article>
        <h3>${p.nombre}</h3>
        <p>Precio: $${p.precio}</p>
        <a href="/productos/eliminar/${p.id}">Eliminar</a>
        <!-- Un enlace para editar (lo implementaremos después) -->
        <a href="/productos/editar/${p.id}">Editar</a>
      </article>
      <hr>
    `;
  });

  res.send(`
    <h1>Productos</h1>
    ${lista}
    <hr>
    <h2>Agregar Producto</h2>
    <form method="POST" action="/productos">
      <input name="nombre" placeholder="Nombre" required>
      <input name="precio" type="number" placeholder="Precio" required>
      <button type="submit">Guardar</button>
    </form>
  `);
});

// Ruta para CREAR un producto (POST)
app.post('/productos', (req, res) => {

  const nuevoProducto = {
    id: Date.now(), // Generamos un ID simple basado en la fecha
    nombre: req.body.nombre,
    precio: Number(req.body.precio) // Aseguramos que sea número
  };

  productosManager.create(nuevoProducto); // Usamos el manager

  res.redirect('/productos');
});

// Ruta para ELIMINAR un producto (GET - por simplicidad)
app.get('/productos/eliminar/:id', (req, res) => {

  const id = Number(req.params.id); // Convertimos a número, ya que Date.now() da un número

  productosManager.remove(id); // Usamos el manager

  res.redirect('/productos');
});

// Iniciamos el servidor
app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
```

---

## ✏️ 4. Agregar Modificación (UPDATE)

Para completar el CRUD, necesitamos una forma de editar productos. Esto normalmente requiere dos rutas:

1.  **GET `/productos/editar/:id`**: Muestra un formulario pre-cargado con los datos del producto a editar.
2.  **POST `/productos/editar/:id`**: Recibe los datos del formulario y actualiza el producto.

Añadamos estas rutas a nuestro `app.js`.

```javascript
// ... (código anterior de app.js) ...

// Ruta para MOSTRAR el formulario de edición (GET)
app.get('/productos/editar/:id', (req, res) => {
    const id = Number(req.params.id);
    const producto = productosManager.getById(id); // Usamos el manager para obtener el producto

    if (!producto) {
        return res.send('Producto no encontrado');
    }

    res.send(`
        <h1>Editar Producto</h1>
        <form method="POST" action="/productos/editar/${id}">
            <input name="nombre" value="${producto.nombre}" placeholder="Nombre" required>
            <input name="precio" value="${producto.precio}" type="number" placeholder="Precio" required>
            <button type="submit">Actualizar</button>
        </form>
        <a href="/productos">Volver</a>
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

// ... (resto del código, incluyendo app.listen) ...
```

---

## ✅ ¿Qué logramos?

✔ **CRUD completo**: Ahora podemos Crear, Leer, Actualizar y Eliminar productos.
✔ **Separación de responsabilidades**: `app.js` maneja la web, `productosManager.js` maneja los datos.
✔ **Código más limpio y legible**: Cada archivo tiene un propósito claro.
✔ **Código más mantenible**: Si cambia la forma de guardar datos, solo modificamos `productosManager.js`.
✔ **Código más escalable**: Es más fácil añadir nuevas funcionalidades o rutas.

---

## 🏗 Arquitectura Aplicada (Capas)

Nuestra aplicación ahora sigue una arquitectura por capas simple pero efectiva:

| Capa | Archivo | Responsabilidad |
| :--- | :--- | :--- |
| **Presentación** | `app.js` | Interactúa con el usuario (rutas, HTML, redirecciones). |
| **Acceso a Datos** | `productosManager.js` | Abstrae la complejidad del archivo. Provee una interfaz clara (getAll, create, etc.). |
| **Persistencia** | `productos.json` | Almacena los datos de forma permanente en el disco. |

---

## 🎓 Reflexión Final

Hoy no solo aprendimos a implementar las operaciones de un CRUD, sino que dimos un paso fundamental en el camino para ser mejores desarrolladores: **pensar en la arquitectura de nuestro código**.

Entender cómo funcionan internamente las operaciones de persistencia (simulando una base de datos con archivos) nos da una base sólida para cuando usemos bases de datos reales. La habilidad de modularizar y separar responsabilidades es universal y se aplica en cualquier lenguaje y framework.
