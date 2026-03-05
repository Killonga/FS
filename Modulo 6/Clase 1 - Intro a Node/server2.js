const http = require('http');

const productos = [
  { id: 1, nombre: "Laptop", precio: 1200 },
  { id: 2, nombre: "Mouse", precio: 25 },
  { id: 3, nombre: "Teclado", precio: 45 }
];

const usuarios = [
  { id: 1, nombre: "Ana", email: "ana@example.com" },
  { id: 2, nombre: "Carlos", email: "carlos@example.com" }
];

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.url === '/usuarios' && req.method === 'GET') {
    res.end(JSON.stringify(usuarios));
  } 
  else if (req.url === '/productos' && req.method === 'GET') {
    res.end(JSON.stringify(productos));
  }
  else if (req.url === '/' && req.method === 'GET') {
    res.end(JSON.stringify({ 
      mensaje: "API Node.js Pura",
      endpoints: ["/usuarios", "/productos"]
    }));
  }
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Ruta no encontrada" }));
  }
});

server.listen(3000, () => {
  console.log('Servidor Node.js puro: http://localhost:3000');
});