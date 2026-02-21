console.log('Argumentos pasados:', process.argv);

// Intento de parseo manual
const argumentos = process.argv.slice(2); 
// Ignoramos los dos primeros elementos
console.log("Argumentos procesados:", argumentos);

const indiceUsuario = argumentos.indexOf('--usuario');
let nombreUsuario = 'Invitado';

if (indiceUsuario !== -1 && argumentos[indiceUsuario + 1]) {
    nombreUsuario = argumentos[indiceUsuario + 1];
}

console.log(`Hola, ${nombreUsuario}!`);