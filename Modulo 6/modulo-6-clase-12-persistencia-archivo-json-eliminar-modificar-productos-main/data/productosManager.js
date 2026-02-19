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