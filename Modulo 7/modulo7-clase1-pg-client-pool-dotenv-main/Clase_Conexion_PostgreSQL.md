# Clase: Conexión a PostgreSQL con Node.js

## Objetivos

-   Entender cómo conectarse a PostgreSQL desde Node
-   Diferenciar Client vs Pool
-   Implementar variables de entorno con dotenv
-   Crear un archivo db.js reutilizable
-   Ejecutar consultas de prueba

------------------------------------------------------------------------

## 1. Instalación

``` bash
npm init -y
npm install pg dotenv
```

Estructura del proyecto:

    /proyecto
      app.js
      db.js
      .env

------------------------------------------------------------------------

## 2. Configuración de Variables de Entorno

Archivo `.env`:

    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=1234
    DB_NAME=tienda

En `app.js`:

``` js
require('dotenv').config()
```

------------------------------------------------------------------------

## 3. Conexión usando Client

`db.js`:

``` js
require('dotenv').config()
const { Client } = require('pg')

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

async function conectar() {
  try {
    await client.connect()
    console.log('Conectado con Client ✅')

    const res = await client.query('SELECT NOW()')
    console.log(res.rows)

    await client.end()
    console.log('Conexión cerrada')
  } catch (error) {
    console.error('Error de conexión ❌', error.message)
  }
}

conectar()
```

### Características de Client

-   Abre una sola conexión
-   Debe cerrarse manualmente
-   Ideal para scripts o pruebas simples

------------------------------------------------------------------------

## 4. Conexión usando Pool (Recomendado)

`db.js`:

``` js
require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

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
```

`app.js`:

``` js
const db = require('./db')

async function test() {
  const resultado = await db.query('SELECT NOW()')
  console.log(resultado.rows)
}

test()
```

### Características de Pool

-   Maneja múltiples conexiones
-   Reutiliza conexiones
-   Mejor rendimiento
-   Ideal para aplicaciones web

------------------------------------------------------------------------

## 5. Comparación

  Client                      Pool
  --------------------------- -------------------------------
  Una conexión                Varias conexiones
  Debe cerrarse manualmente   Se administra automáticamente
  Para scripts                Para aplicaciones web
  Menos eficiente             Escalable

------------------------------------------------------------------------

## 6. Flujo Profesional Recomendado

dotenv\
↓\
db.js (Pool)\
↓\
Servicios / Controladores\
↓\
app.js

------------------------------------------------------------------------

## 7. Preguntas para Reflexión

-   ¿Qué pasa si olvidamos cerrar Client?
-   ¿Por qué Pool mejora rendimiento?
-   ¿Por qué no debemos hardcodear credenciales?
-   ¿Qué diferencia hay entre conectar y consultar?
