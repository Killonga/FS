//Nombre de variables JS -------------

//Nombre variables en JS no pueden comenzar con un numero    const 1numero = 6; 
//No utilizar palabras reservadas del lenguaje js como por ejemplo ... const else = "entonces";
// Descriptivas, camelCase numeroUno , SnakeCase NumeroUno, numero_uno, NUMERO_1 
//Evitar variables con nombres ... const x = 2, const valor= resultado;
// Case sensitive : Javascript diferncia entre minúsculas y mayúsculas

// Obtener elementos
const numero1 = document.getElementById("nombre1");
const numero2 = document.getElementById("nombre2");

const boton = document.getElementById("btn_sumar");
const botonRestar = document.getElementById("btn_restar");

const resultado = document.getElementById("resultado");


/*
Operadores Lógicos
    = Asignar un valor a una variable
    a==b Comparación 5==5 (verdadero)
    === Comparación (estricta) además del valor , el tipo de variable
     5=="5" (verdadero)  5==="5"(falso)
*/



// Función sumar con validación IF/ELSE
function sumarNumeros() {
    // Validación: verificar si algún input está vacío
    // Si el valor del input con id numero1 es IGUAL a vacio (|| ó) numero 2 es vacio
    if (numero1.value === "" || numero2.value === "") {
        //Si una de estas dos condiciones es verdadera;
        //Entonces se ejecuta el código 
        resultado.className = "alert alert-danger text-center fw-bold";
        resultado.textContent = "Por favor completa ambos campos antes de sumar.";
        return; // Detiene la función si hay error
    } 
    else {
        // Convertir valores y sumar
        const n1 = Number(numero1.value);
        const n2 = Number(numero2.value);
        const suma = n1 + n2;

        resultado.className = "alert alert-info text-center fw-bold";
        resultado.textContent = "Resultado: " + suma;
        //O también resultado.innerText = "Resultado: "+ suma
    }
}


function restarNumeros(){
    const n1 = Number(numero1.value);
    const n2 = Number(numero2.value);
    const resta = n1-n2;

    resultado.textContent = "Resultado: "+ resta;

}


// Configurando el Evento botón
boton.addEventListener("click", sumarNumeros);

botonRestar.addEventListener("click", restarNumeros);
