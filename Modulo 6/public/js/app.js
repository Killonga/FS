document.addEventListener("click", function (e) {
  // Eliminar tarea
  const deleteTaskBtn = e.target.closest(".delete-task");
  if (deleteTaskBtn) {
    const taskCard = deleteTaskBtn.closest(".task-card");
    const listContainer = deleteTaskBtn.closest(".list-wrapper");
    const taskId = deleteTaskBtn.dataset.taskId;
    const listId = listContainer.dataset.listId;

    if (confirm("¿Estás seguro de eliminar esta tarea?")) {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "/eliminar-tarjeta";
      form.innerHTML = `
        <input type="hidden" name="taskId" value="${taskId}">
        <input type="hidden" name="listId" value="${listId}">
      `;
      document.body.appendChild(form);
      form.submit();
    }
    return;
  }

  // Cancelar nueva tarea
  const cancelTaskBtn = e.target.closest(".cancel-task");
  if (cancelTaskBtn) {
    const form = cancelTaskBtn.closest("form");
    const footer = form.closest(".card-footer");

    footer.querySelector(".add-new-task")?.classList.remove("d-none");
    form.remove();
    return;
  }

  // Cancelar formulario para nueva lista
  const cancelListBtn = e.target.closest(".cancel-list");
  if (cancelListBtn) {
    const form = cancelListBtn.closest("form");
    const wrapper = form.closest(".add-list-wrapper");

    wrapper.querySelector(".add-new-list")?.classList.remove("d-none");
    form.remove();
    return;
  }
  // Añade formulario para nueva tarea
  const addTaskBtn = e.target.closest(".add-new-task");
  if (addTaskBtn) {
    closeExistingTaskForm();

    const listContainer = addTaskBtn.closest(".list-wrapper");
    const footer = addTaskBtn.closest(".card-footer");

    const listId = listContainer.dataset.listId;

    addTaskBtn.classList.add("d-none");

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/nueva-tarjeta";
    form.className = "task-form mt-2";

    form.innerHTML = `
    <input type="hidden" name="listId" value="${listId}">
    
      <div class="mb-2">
        <textarea 
          class="form-control form-control-sm" 
          name="titulo"
          required
        ></textarea>
      </div>

      <div class="d-flex gap-2">
        <button type="submit" class="btn btn-primary btn-sm">
          Añadir tarjeta
        </button>
        <button type="button" class="btn btn-secondary btn-sm cancel-task">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    `;

    footer.appendChild(form);
    form.querySelector("textarea").focus();
    return;
  }

  // Añade formulario para nueva lista
  const addListBtn = e.target.closest(".add-new-list");
  if (addListBtn) {
    const wrapper = addListBtn.closest(".add-list-wrapper");

    // Si encuentra un formulario abierto, escapa
    if (wrapper.querySelector("form")) return;

    addListBtn.classList.add("d-none");

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/nueva-lista";
    form.className = "p-2 card bg-light-subtle rounded-3";
    form.style.width = "270px";

    form.innerHTML = `

      <div class="mb-2">
        <input
          type="text"
          name="listName"
          class="form-control form-control-sm"
          placeholder="Nombre de la lista.."
          required
        />
      </div>
      <div class="d-flex gap-2">

        <button type="submit" class="btn btn-primary btn-sm">Añadir Lista</button>
        <button type="button" class="btn btn-secondary btn-sm cancel-list">
          <i class="bi bi-x-lg"></i>
        </button>

      </div>
    
    `;

    wrapper.appendChild(form);
    form.querySelector('input[name="listName"]').focus();
    return;
  }

  function closeExistingTaskForm() {
    const existingForm = document.querySelector(".task-form");

    if (existingForm) {
      const footer = existingForm.closest(".card-footer");
      footer.querySelector(".add-new-task")?.classList.remove("d-none");
      existingForm.remove();
    }
  }
});
