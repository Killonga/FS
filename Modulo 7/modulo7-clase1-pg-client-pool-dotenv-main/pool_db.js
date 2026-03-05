require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 20, // Número máximo de clientes en el pool. Ajustar según la carga.
  idleTimeoutMillis: 8000, // Tiempo en ms que un cliente puede estar inactivo antes de cerrarse.
  connectionTimeoutMillis: 2000, // Tiempo en ms de espera para obtener una conexión del pool antes de un error.
});

async function query(text, params) {
  try {
    const res = await pool.query(text, params)
    return res
  } catch (error) {
    console.error('Error en query:', error.message)
    throw error
  }
}

module.exports = { query }