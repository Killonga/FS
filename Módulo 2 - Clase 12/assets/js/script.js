const formulario = document.getElementById('form-contacto');

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const mensaje = document.getElementById("mensaje").value;   
    console.log("Nombre");
    console.log("correo");
     console.log("mensaje");

});