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