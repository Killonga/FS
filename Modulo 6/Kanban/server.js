const express = require("express");
const hbs = require("hbs");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views/partials"));

app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));
app.use("/icons", express.static("node_modules/bootstrap-icons/font"));
app.use(express.static("public"));

const leerArchivo = () => {
  const data = fs.readFileSync("data.json", "utf8");
  const board = JSON.parse(data);
  return board;
};

const guardarModificaciones = (lists) => {
  fs.writeFileSync("data.json", JSON.stringify(lists, null, 2));
};

// Usuario de ejemplo para login
const USER = {
  email: "admin@kanban.com",
  password: "123456"
};

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === USER.email && password === USER.password) {
    return res.redirect("/dashboard");
  }
  res.render("login", {
    layout: "",
    title: "Login",
    error: "Credenciales incorrectas",
  });
});

app.get("/dashboard", (req, res) => {
  const board = leerArchivo();
  res.render("dashboard", { title: "Dashboard", board: board });
});

app.post("/nueva-lista", (req, res) => {
  const { listName } = req.body;
  try {
    const lists = leerArchivo();

    const nuevaLista = {
      id: Date.now().toString(),
      name: listName.trim(),
      tasks: [],
    };

    lists.push(nuevaLista);
    guardarModificaciones(lists);

    return res.redirect(`/dashboard`);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error interno");
  }
});

app.post("/nueva-tarjeta", (req, res) => {
  const { titulo, listId } = req.body;

  try {
    const data = leerArchivo();
    const list = data.find((l) => l.id === listId);

    // En un comienzo los campos no se utilizan sino hasta mas adelante
    const nuevaTarea = {
      id: Date.now(),
      titulo,
      descripcion: "",
      prioridad: "",
      TAG: "",
      estado: "",
      fecha_creacion: "",
      fecha_inicio: "",
      fecha_fin: "",
      autor: "",
      responsable: "",
    };

    list.tasks.push(nuevaTarea);
    guardarModificaciones(data);

    return res.status(201).redirect(`/dashboard`);
  } catch (error) {
    return res.json({ message: error });
  }
});

app.post("/eliminar-tarjeta", (req, res) => {
  const { taskId, listId } = req.body;

  try {
    const data = leerArchivo();
    const list = data.find((l) => l.id === listId);

    if (list) {
      list.tasks = list.tasks.filter((task) => task.id != taskId);
      guardarModificaciones(data);
    }

    return res.redirect(`/dashboard`);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error interno");
  }
});

app.listen(PORT, () => {
  console.log(`Sirviendo desde http://localhost:${PORT}`);
});
