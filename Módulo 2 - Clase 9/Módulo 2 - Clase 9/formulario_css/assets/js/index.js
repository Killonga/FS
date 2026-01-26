// === Script para capturar y mostrar los datos del formulario ===
// Al cargar la página, se agrega el listener para el envío del formulario
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario-subsidio");

  formulario.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita el envío real del formulario

    //Creamos un objeto vacío para guardar los valores
    const datos = {};

    //Recorremos todos los campos del formulario
    const elementos = formulario.querySelectorAll("input, select, textarea");

    elementos.forEach((elemento) => {
      const nombre = elemento.name || elemento.id;
      let valor = "";

      //Manejamos diferentes tipos de input
      if (elemento.type === "checkbox") {
        valor = elemento.checked ? "Sí" : "No";
      } else if (elemento.type === "radio") {
        if (elemento.checked) valor = elemento.value;
      } else {
        valor = elemento.value;
      }

      //Guardamos solo si hay nombre y valor
      if (nombre && valor !== undefined) {
        datos[nombre] = valor;
      }
    });

    //Mostramos el resultado formateado en consola
    console.clear();
    console.log("=== Datos del Formulario de Subsidio ===");
    console.table(datos);

    //También lo mostramos como objeto para depuración
    console.log("Objeto completo:", datos);

    //Ejemplo visual opcional:
    alert("Formulario procesado correctamente.");
  });
});