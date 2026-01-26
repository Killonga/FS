# 🧑‍🏫 Clase: Introducción a JavaScript + DOM + Eventos

**Aplicado a tu Portafolio en HTML5 + Bootstrap**

## 1. ¿Qué es JavaScript y qué puede hacer?

JavaScript es un **lenguaje de programación** que permite agregar
**interactividad** a las páginas web.

Con JS podemos: - Cambiar textos, colores, estilos. - Detectar clics del
usuario. - Validar formularios. - Crear animaciones. - Manipular el HTML
(DOM) Document Object Model. - Crear aplicaciones completas.

## 2. Añadiendo JS a nuestra página

### 1) JS dentro del HTML

``` html
<script>
  console.log("Hola desde JavaScript");
</script>
```

### 2) JS en un archivo externo

``` html
<script src="script.js"></script>
```

## 3. El DOM: Cómo JS ve nuestro HTML

El **DOM** es una representación en forma de árbol del HTML.

``` html
<h1 id="titulo">Hola Mundo</h1>
```

``` js
const titulo = document.getElementById("titulo");
```

## 4. Seleccionar y manipular elementos

``` js
const titulo = document.getElementById("titulo");
titulo.textContent = "Nuevo título";
titulo.style.color = "red";
```

## 5. Eventos

``` js
boton.addEventListener("click", function() {
  console.log("Hiciste clic!");
});
```

