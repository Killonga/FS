//'fs' es el módulo de Node para interactuar con el File System
const fs = require('fs'); 

console.log("--- Inicio del programa ---");

// Operación Síncrona (Bloqueante)
try {
    const data = fs.readFileSync('archivo-inexistente.txt', 'utf8');
    console.log("Contenido del archivo (síncrono):", data);
} catch (err) {
    console.error("Error al leer el archivo de forma síncrona. Error:"+ err);
}
console.log("Después de la llamada síncrona.");


// Operación Asíncrona (No Bloqueante)
fs.readFile('archivo-inexistente.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error al leer el archivo de forma asíncrona.");
        return;
    }
    console.log("Contenido del archivo (asíncrono):", data);
});
console.log("Después de la llamada asíncrona.");
console.log("--- Fin del programa ---");