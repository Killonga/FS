const express = require("express");
const { pool, verificarConexion } = require("./db.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Check para verificar la conexion a la base de datos
// END-POINT
app.get("/health", async (req, res) => {
  try {
    await verificarConexion();
    res.json({ status: "ok", db: "connected" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error });
  }
});

// Consulta usuarios
app.get("/usuarios", async (req, res) => {
  const { email } = req.query;

  try {
    // *Si recibimos el query params email, filtramos el resultado por email
    // *Aplicamos return para salir de la funcion
    if (email) {
      const queryEmail = "select * from usuarios where email=$1";
      const values = [email];

      const result = await pool.query(queryEmail, values);
      return res.json({ status: "ok", result: result.rows });
    }

    // *Por defecto si no se recibe email, retornamos todos los usuarios
    const query = "select * from usuarios";
    const result = await pool.query(query);

    res.json({ status: "ok", users: result.rows });
  } catch (error) {
    res.status(500).json({ status: "error", message: error });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
