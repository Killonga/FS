# Ejecución y Parámetros con Yargs

## Ejemplo práctico: Guardar mensajes en un archivo JSON

------------------------------------------------------------------------

## Objetivo

Aprender a:

-   Ejecutar Node.js con parámetros
-   Usar Yargs para validar argumentos
-   Guardar información en un archivo JSON con fs
-   Comprender el código paso a paso

------------------------------------------------------------------------

## Instalación

``` bash
npm init -y
npm install yargs
```

Crear archivo `mensajes.json`:

``` json
[]
```

------------------------------------------------------------------------

# app.js (Código Comentado)

``` js
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
```

------------------------------------------------------------------------

# Cómo ejecutar

``` bash
node app.js crear --texto="Hola mundo" --autor="Juan"
```

------------------------------------------------------------------------

## ¿Qué hace Yargs aquí?

-   Define comandos estructurados
-   Valida parámetros obligatorios
-   Valida tipos de datos
-   Ejecuta lógica específica según el comando

------------------------------------------------------------------------

## Resultado

El archivo `mensajes.json` se actualizará automáticamente con cada nuevo
mensaje.

------------------------------------------------------------------------

## Conclusión

Yargs permite construir aplicaciones CLI profesionales, organizadas y
escalables, evitando validaciones manuales y código desordenado.
