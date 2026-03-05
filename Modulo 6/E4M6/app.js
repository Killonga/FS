const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const mensajes = JSON.parse(fs.readFileSync('mensajes.json', 'utf-8'));
  res.render('index', { mensajes });
});

app.post('/nuevo-mensaje', (req, res) => {
  const nuevoMensaje = { usuario: req.body.usuario, mensaje: req.body.mensaje };
  const mensajes = JSON.parse(fs.readFileSync('mensajes.json', 'utf-8'));
  mensajes.push(nuevoMensaje);
  fs.writeFileSync('mensajes.json', JSON.stringify(mensajes, null, 2));
  res.redirect('/');
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});