require('dotenv').config();
const { Client } = require('pg');

//Client representa una conexión individual a la base de datos.
const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


async function conectar() {
  try {
    await client.connect()
    console.log('Conectado con Client ✅');

    const res = await client.query('SELECT NOW()');
    // devuelve un objeto con dos propiedades: rows y fields
    // devuelve el dia y la hora actual de la base de datos
    console.log(res.rows)

    await client.end()
    console.log('Conexión cerrada');
  } catch (error) {
    console.error('Error de conexión ❌', error.message);
    console.error('Error de conexión ❌', error);

  }
}

conectar();