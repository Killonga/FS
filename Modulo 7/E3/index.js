let listaDeTareas = [];

// Tareas iniciales de branding
listaDeTareas.push("Desarrollar propuesta de identidad visual para cliente nuevo.");
listaDeTareas.push("Diseñar logo principal y sus variaciones para el manual de marca.");
listaDeTareas.push("Crear paleta cromática y sistema tipográfico para el branding.");
listaDeTareas.push("Preparar mockups y pitch de presentación para entregar al cliente.");

function actualizarLista() {
  const contenedor = document.getElementById("lista");
  contenedor.innerHTML = "";

  console.clear();
  console.log("--- Lista de Tareas Actualizada ---");

  listaDeTareas.forEach((tarea, index) => {
    console.log(`${index + 1}. ${tarea}`);

    contenedor.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${tarea}</td>
      </tr>
    `;
  });
}

actualizarLista();

function gestionarTareas() {
  let continuar = true;

  while (continuar) {
    let nuevaTarea = prompt("Ingresa una nueva tarea:");

    if (nuevaTarea && nuevaTarea.trim() !== "") {
      listaDeTareas.push(nuevaTarea.trim());
      actualizarLista();
    } else {
      alert("Por favor ingresa una tarea válida.");
      continue;
    }

    continuar = confirm("¿Deseas agregar otra tarea?");
  }
}
