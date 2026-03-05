// db-connect.js
require('dotenv').config();
const { Pool } = require('pg');

// Configuración del pool de conexiones
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: parseInt(process.env.DB_POOL_MAX || '20', 10),           // Máximo de conexiones en el pool
  idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '30000', 10), // Tiempo máximo de inactividad
  connectionTimeoutMillis: parseInt(process.env.DB_CONN_TIMEOUT || '2000', 10), // Timeout de conexión
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

async function testConnection() {
  let client;
  try {
    client = await pool.connect(); // obtiene un cliente del pool
    console.log('✅ Conexión a PostgreSQL exitosa');
  } catch (err) {
    console.error('❌ Error conectando a PostgreSQL:', err.message);
    console.log('💡 Verifica que PostgreSQL esté corriendo y los datos en .env sean correctos');
    process.exitCode = 1; // marcar salida con error, pero permitir que finally se ejecute
  } finally {
    if (client) client.release(); // devolver el cliente al pool
    try {
      await pool.end(); // cerrar el pool (útil en scripts de verificación)
    } catch (endErr) {
      console.error('Error cerrando el pool:', endErr.message);
    }
    if (process.exitCode) process.exit(process.exitCode);
  }
}

// Ejecutamos la prueba de conexión
testConnection();
