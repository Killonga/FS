# Servicio de Contenido I – Configuración del Servidor y Servicio de Contenido Estático con Express

## Introducción a la clase

En esta clase se implementa un servidor web utilizando Node.js y Express con el objetivo de servir contenido web estático. El foco está en comprender la configuración del servidor, el uso de rutas implícitas mediante una carpeta pública y la entrega de múltiples archivos HTML y assets compartidos. Esta clase es completamente práctica y está pensada para ser desarrollada mediante live coding.

## Objetivo de aprendizaje

Implementar un servidor Express capaz de servir múltiples páginas HTML estáticas y recursos compartidos, comprendiendo el rol técnico del servidor web, la relación entre URL y archivos, y la base necesaria para evolucionar hacia contenido dinámico con motores de plantillas.

## Conceptos que se aplican en esta clase

Servicio de contenido web, contenido estático, carpeta pública, middleware express.static, archivo index.html, assets compartidos, diferencia entre rutas Express y archivos estáticos.

## Paso 1 – Inicialización del proyecto Node

Se comienza creando un nuevo proyecto Node.js. Esta etapa prepara el entorno base del servidor.

```bash
npm init -y
```

Instalación del framework Express:

```bash
npm install express
```

## Paso 2 – Estructura base del proyecto

Se define una estructura de carpetas clara y alineada con estándares profesionales.

```txt
servidor-estatico/
│── app.js
│── package.json
│── public/
│   ├── index.html
│   ├── nosotros.html
│   ├── servicios.html
│   ├── contacto.html
│   ├── css/
│   │   └── style.css
│   └── img/
│       └── banner.png
```

La carpeta public contendrá todos los recursos accesibles desde el navegador.

## Paso 3 – Configuración del servidor Express

Se crea el archivo app.js y se configura el servidor web.

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
```

El middleware express.static permite que Express entregue directamente los archivos ubicados en la carpeta public.

## Paso 4 – Archivo index.html como punto de entrada

El archivo index.html actúa como página principal del sitio web. Es un estándar reconocido automáticamente por el servidor.

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Inicio</title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <h1>Página de Inicio</h1>
  <img src="/img/banner.png" alt="Banner">
  <p>Servidor Express sirviendo contenido estático.</p>
  <nav>
    <a href="/nosotros.html">Nosotros</a>
    <a href="/servicios.html">Servicios</a>
    <a href="/contacto.html">Contacto</a>
  </nav>
</body>
</html>
```

## Paso 5 – Implementación de páginas HTML adicionales

Se crean páginas HTML independientes que reutilizan los mismos assets.

### nosotros.html

```html
<h1>Nosotros</h1>
<img src="/img/banner.png">
<p>Información institucional de la empresa.</p>
<a href="/">Volver al inicio</a>
```

### servicios.html

```html
<h1>Servicios</h1>
<img src="/img/banner.png">
<ul>
  <li>Desarrollo Web</li>
  <li>Soporte TI</li>
</ul>
<a href="/">Volver al inicio</a>
```

### contacto.html

```html
<h1>Contacto</h1>
<img src="/img/banner.png">
<p>Email: contacto@empresa.cl</p>
<a href="/">Volver al inicio</a>
```

Cada archivo es servido directamente por Express sin necesidad de rutas personalizadas.

## Paso 6 – Assets compartidos

Se implementa una hoja de estilos compartida para todas las páginas.

```css
body {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 2rem;
}

img {
  width: 300px;
  margin: 1rem 0;
}

a {
  margin: 0 0.5rem;
}
```

Esto refuerza el concepto de reutilización de recursos estáticos.

## Paso 7 – Pruebas desde el navegador

Con el servidor en ejecución, se accede a las siguientes rutas:

* [http://localhost:3000/](http://localhost:3000/)
* [http://localhost:3000/nosotros.html](http://localhost:3000/nosotros.html)
* [http://localhost:3000/servicios.html](http://localhost:3000/servicios.html)
* [http://localhost:3000/contacto.html](http://localhost:3000/contacto.html)

Cada URL corresponde directamente a un archivo dentro de la carpeta public.

## Diferencia entre rutas Express y contenido estático

Las rutas Express se definen mediante código y ejecutan lógica del servidor. El contenido estático se entrega directamente desde el sistema de archivos. En esta clase no se utilizan rutas explícitas, reforzando el concepto de servidor como proveedor de archivos.

## Cierre conceptual

En el servicio de contenido estático, Express no genera ni modifica HTML. Su función es entregar archivos solicitados por el navegador. Esta base técnica es fundamental para comprender posteriormente cómo los motores de plantillas permiten generar contenido dinámico.

## Proyección a la siguiente clase

En la próxima clase se implementará un motor de plantillas para reemplazar los archivos HTML estáticos por vistas dinámicas, reutilizando la misma estructura de navegación y assets.
