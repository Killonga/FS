//Importando el modulo http , que ya viene incluido en node
const http = require('http');

//Creando el servidor que atenderá peticiones HTTP
//req representa la petición (request) desde el frontend
//res representa la respuesta (response) que le enviaré de vuelta
const server = http.createServer((req, res) => {
  //tomando la petición entrante filtramos desde donde (req.url) viene la petición
  if (req.url === '/') {
    //definimos en el encabezado de la respuesta el Typo de contenido
    res.writeHead(200, { 'Content-Type': 'text/html' });
    //Le damos el contenido a la respuesta
    res.end('<h1>Servidor Node.js Funcionando</h1>');
  }else{
    res.writeHead(404, {'Content-Type':'text/html'});
    res.end('<h1>URL No Encontrada :( </h1>');
  }
});

//La función listen permite inicializar el servidor a través del puerto 3000
server.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});