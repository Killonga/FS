# Lista de Eventos `addEventListener` en JavaScript

A continuación tienes una lista de eventos comunes que se pueden usar
con **addEventListener**, junto con una breve descripción.

------------------------------------------------------------------------

## 🖱️ Eventos del Mouse

-   **click**\
    Se ejecuta cuando el usuario hace clic con el botón principal del
    mouse.

-   **dblclick**\
    Se activa cuando el usuario hace doble clic.

-   **mouseover**\
    Ocurre cuando el puntero entra en el área de un elemento.

-   **mouseout**\
    Ocurre cuando el puntero sale del área de un elemento.

-   **mousemove**\
    Se ejecuta cada vez que el puntero se mueve sobre un elemento.

-   **mousedown**\
    Cuando se presiona un botón del mouse sobre un elemento.

-   **mouseup**\
    Cuando se suelta el botón del mouse.

------------------------------------------------------------------------

## ⌨️ Eventos del Teclado

-   **keydown**\
    Se activa cuando una tecla es presionada.

-   **keyup**\
    Se activa cuando una tecla es liberada.

-   **keypress**\
    (Deprecated) Cuando una tecla produce un carácter.

------------------------------------------------------------------------

## 📄 Eventos del Documento / Ventana

-   **load**\
    Cuando la página ha terminado de cargar.

-   **DOMContentLoaded**\
    Cuando el DOM está listo sin esperar imágenes.

-   **resize**\
    Cuando se redimensiona la ventana.

-   **scroll**\
    Se dispara al hacer scroll.

------------------------------------------------------------------------

## 📝 Eventos de Formularios

-   **submit**\
    Cuando se envía un formulario.

-   **change**\
    Cuando cambia el valor de un input.

-   **input**\
    Se ejecuta en cada cambio mientras el usuario escribe.

-   **focus**\
    Cuando un input recibe el foco.

-   **blur**\
    Cuando un input pierde el foco.

------------------------------------------------------------------------

## Ejemplo de Uso

``` javascript
document.getElementById("btn").addEventListener("click", () => {
    console.log("Botón presionado");
});
```



////////////////
appendChild
y createElement
