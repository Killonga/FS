// Importamos el módulo nativo 'fs' para trabajar con archivos
const fs = require('fs');

// Importamos Yargs para manejar parámetros por línea de comandos
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv));

// Ruta del archivo donde guardaremos los mensajes
const filePath = './data/mensajes.json';


/**
 * Función para leer los mensajes del archivo JSON
 */
function getMensajes() {
  // Leemos el archivo de manera síncrona
  const data = fs.readFileSync(filePath, 'utf-8');
  
  // Convertimos el texto JSON a objeto JavaScript
  return JSON.parse(data);
}


/**
 * Función para guardar mensajes en el archivo JSON
 */
function saveMensajes(mensajes) {
  // Convertimos el objeto a formato JSON legible
  fs.writeFileSync(filePath, JSON.stringify(mensajes, null, 2));
}


/**
 * Definimos el comando 'crear'
 */
try {
   argv.command({
  command: 'crear', // Nombre del comando
  describe: 'Crear un nuevo mensaje',

  // Definimos los parámetros obligatorios
  builder: {
    texto: {
      describe: 'Contenido del mensaje',
      demandOption: true, // Obligatorio
      type: 'string'
    },
    autor: {
      describe: 'Autor del mensaje',
      demandOption: true, // Obligatorio
      type: 'string'
    }
  },

  // Función que se ejecuta cuando usamos el comando
  handler(argv) {

    // Obtenemos los mensajes actuales
    const mensajes = getMensajes();
    // Creamos un nuevo objeto mensaje
    const nuevoMensaje = {
      id: Date.now(), // ID único basado en timestamp
      texto: argv.texto, // Valor recibido por parámetro
      autor: argv.autor
    };
    console.log(nuevoMensaje);
    console.log(process.argv);
    console.log(argv);



    // Agregamos el nuevo mensaje al arreglo
    mensajes.push(nuevoMensaje);

    // Guardamos el arreglo actualizado en el archivo
    saveMensajes(mensajes);

    console.log('Mensaje guardado correctamente');
  }
});
} catch (error) {
  console.error('Error al crear el mensaje:', error.message);
}


// Ejecuta Yargs para procesar los argumentos
argv.help().parse();