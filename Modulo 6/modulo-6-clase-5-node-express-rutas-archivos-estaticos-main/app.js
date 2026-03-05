
const express = require("express");
const path = require("path");
const app = express();

const PORT = 3000;

//middleware : implementación de nuevas funciones
app.use(express.static(path.join(__dirname, "public")));


//Rutas
app.get("/home", (request, response)=>{
    response.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/contacto", (request, response)=>{
    response.sendFile(path.join(__dirname, "public","contactanos.html"));
});

app.get("/servicios", (request, response)=>{
    response.sendFile(path.join(__dirname, "public","servicios.html"));
});

app.listen(PORT, ()=>{
    console.log(`Iniciando el servidor de contenido estático
        http://localhost:3000/home
        http://localhost:3000/contacto
        http://localhost:3000/servicios`);
})





