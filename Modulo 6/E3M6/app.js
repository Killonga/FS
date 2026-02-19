const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
app.use(express.urlencoded({ extended: true }));
const fs = require('fs');
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

app.get('/', (req, res) => {
    try {
        const data = fs.readFileSync('mensajes.json', 'utf-8');
        const mensajes = JSON.parse(data);
        
        // Generar HTML simple para mostrar los mensajes
        let html = '<h1>Mensajes</h1><ul>';
        mensajes.forEach(mensaje => {
            html += `<li><strong>${mensaje.usuario}:</strong> ${mensaje.mensaje}</li>`;
        });
        html += '</ul>';
        
        res.send(html);
    } catch (error) {
        res.status(500).send('Error al leer los mensajes');
    }
});

app.post('/nuevo-mensaje', (req, res) => {
    try {
      console.log(req.body.usuario, req.body.mensaje);
        const nuevoMensaje = { usuario: req.body.usuario, mensaje: req.body.mensaje };
        
        const data = fs.readFileSync('mensajes.json', 'utf-8');
        const mensajes = JSON.parse(data);
        
        mensajes.push(nuevoMensaje);
        
        const jsonString = JSON.stringify(mensajes, null, 2);
        fs.writeFileSync('mensajes.json', jsonString);
        
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error al guardar el mensaje');
    }
});

app.get("/contacto", (request, response) => {
  response.sendFile(path.join(__dirname, "public", "contacto.html"));
});

app.get("/perfil", (req, res) => {
  res.render("perfil", {
    nombre: "Victor",
    profesion: "fullstack dev",
    edad: 30,
  });
});

app.get("/dashboard", (req, res) => {
  const data = {
    user: {
      name: "Victor",
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
  console.log(`⛷⛷Servidor corriendo en http://localhost:${PORT}`);
});
