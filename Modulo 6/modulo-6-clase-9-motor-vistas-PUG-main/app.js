const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Inicio' });
});

app.get('/proyectos', (req, res) => {
  res.render('proyectos', {
    title: 'Nuestros Proyectos',
    proyectos: [
      { nombre: 'Sistema ERP', descripcion: 'Solución empresarial moderna.' },
      { nombre: 'App Mobile', descripcion: 'Aplicación multiplataforma.' },
      { nombre: 'E-learning', descripcion: 'Plataforma educativa digital.' }
    ]
  });
});

app.get('/quienes-somos', (req, res) => {
  res.render('quienes', { title: 'Quiénes Somos' });
});

app.get('/contacto', (req, res) => {
  res.render('contacto', { title: 'Contáctanos' });
});

app.get('/trabaja-con-nosotros', (req, res) => {

  res.render('trabajos', {
    title: 'Únete a Nuestro Equipo',
    trabajos: [
      { puesto: 'Backend Developer', modalidad: 'Remoto' },
      { puesto: 'Frontend Developer', modalidad: 'Híbrido' },
      { puesto: 'UX/UI Designer', modalidad: 'Presencial' }
    ], 
    practicas: [
      { puesto: 'Backend Developer Junior', modalidad: 'Remoto' },
      { puesto: 'Frontend Developer Junior', modalidad: 'Híbrido' },
      { puesto: 'Fullstack Developer Junior', modalidad: 'Remoto' }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
