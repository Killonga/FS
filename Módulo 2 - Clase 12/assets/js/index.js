// =============================
// Mensajes iniciales en consola
// =============================
// Sirven para comprobar que el archivo JS está conectado correctamente.
console.log("Hola Mundo JavaScript");
console.log("Hola Mundo JavaScript");
console.log("Hola Mundo JavaScript");
console.log("Hola Mundo JavaScript");
console.log("Hola Mundo JavaScript");
console.log("Hola Mundo JavaScript");
console.log("Hola Mundo JavaScript");

// -----------------------------------------
// Comentarios en una línea y varias líneas
// -----------------------------------------

// Ejemplo de comentario simple de una sola línea

/*
 Ejemplo de comentario de múltiples líneas
 Ideal cuando queremos explicar algo más extenso
 o dejar documentación del código.
*/


// ==============================================
// 1. Seleccionar un elemento por su ID en el DOM
// ==============================================

// Guardamos la referencia del elemento con id="titulo"
const titulo = document.getElementById("titulo");


// ==========================================================
// 2. Evento: Detectar clic en el título y mostrar su contenido
// ==========================================================
// Cuando se hace clic, imprimimos el texto original del título.
titulo.addEventListener("click", function () {
    console.log(titulo.textContent);
});

// Mostramos el contenido actual del h1 antes de modificarlo
console.log(titulo.textContent);


// =====================================================
// 3. Manipulación del DOM: Cambiar contenido y estilos
// =====================================================

// Cambiamos el texto del título
titulo.textContent = "Roberto González - Desarrollador Web FullStack";

// Cambiamos el color del texto a rojo
titulo.style.color = "red";

// Mostramos nuevamente el contenido para verificar los cambios
console.log(titulo.textContent);


// =========================================================
// 4. Seleccionar botón y agregar eventos (clic y mouseover)
// =========================================================

// Obtenemos el botón con id="enviar_formulario"
const boton = document.getElementById("enviar_formulario");


// ------------------------------------------------------------
// Evento 1: click
// - preventDefault evita que el formulario se envíe automáticamente
// ------------------------------------------------------------
boton.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("Hiciste clic!");
});


// ------------------------------------------------------------
// Evento 2: mouseover
// - Se ejecuta cuando el usuario pasa el mouse por encima del botón
// ------------------------------------------------------------
boton.addEventListener("mouseover", function (event) {
    event.preventDefault();
    console.log("Pasaste por arriba del botón!!!");
});


////validador de Input de Formulario

//agregar un event listener al formulario de contacto.Al enviar el formulario,
//el script debe validar que los campos no estén vacíos.Si la validación es exitosa,
//mostrar un mensaje de agradecimiento en la página; si no, mostrar un mensaje de error.
//  Se debe usar getElementById para seleccionar los elementos y.
//  innerHTML o.textContent para mostrar los mensajes.