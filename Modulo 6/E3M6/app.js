const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

const PORT = 3000;

app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
hbs.registerPartials(path.join(__dirname, "/views/partials"));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist")));

// Helper para la clase de prioridad
hbs.registerHelper("priorityClass", function (priority) {
  if (priority === "alta") {
    return "priority-high";
  } else if (priority === "media") {
    return "priority-medium";
  } else {
    return "priority-low";
  }
});

app.get("/contacto", (request, response) => {
  response.sendFile(path.join(__dirname, "public", "contacto.html"));
});

app.get("/perfil", (req, res) => {
  res.render("perfil", {
    nombre: "Marco",
    profesion: "fullstack dev",
    edad: 30,
  });
});

app.get("/dashboard", (req, res) => {
  const data = {
    user: {
      name: "Marco",
      isAdmin: true,
    },
    projects: [
      {
        name: "API Gateway",
        isCompleted: true,
        tasks: [
          { description: "Diseñar endpoints", priority: "alta" },
          { description: "Implementar JWT", priority: "alta" },
          { description: "Crear documentación", priority: "media" },
        ],
      },
      {
        name: "Refactor del Frontend",
        isCompleted: true,
        tasks: [
          { description: "Migrar a React 18", priority: "baja" },
          { description: "Actualizar dependencias", priority: "baja" },
        ],
      },
      {
        name: "Base de Datos",
        isCompleted: false,
        tasks: [], // Proyecto sin tareas para probar el condicional 'else'
      },
    ],
  };

  res.render("dashboard", data);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
