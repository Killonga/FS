# 📊 Dashboard Dinámico con Express y HBS

Servidor Express que demuestra el uso de **partials**, **helpers personalizados** y **vistas dinámicas** con datos complejos.

## 🚀 Características

- ✅ **Partials reutilizables** (header y footer)
- ✅ **Helpers personalizados** para lógica de plantillas
- ✅ **Condicionales y bucles** en HBS
- ✅ **Datos complejos** con listas anidadas
- ✅ **Estilos CSS** profesionales con gradientes
- ✅ **Estructura modular** y limpia

## 📁 Estructura del Proyecto

```
v2/
├── app.js                  # Aplicación principal
├── package.json            # Dependencias
├── views/
│   ├── dashboard.hbs       # Vista principal del dashboard
│   └── partials/
│       ├── header.hbs      # Partial del encabezado
│       └── footer.hbs      # Partial del pie de página
└── public/
    └── style.css           # Estilos CSS
```

## 📦 Instalación

1. Navega a la carpeta del proyecto:
   ```bash
   cd "Modulo 6\E2M6\v2"
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## ▶️ Uso

### Iniciar el servidor

```bash
npm start
```

El servidor estará disponible en: **http://localhost:3000**

### Modo desarrollo (con recarga automática)

```bash
npm run dev
```

## 🔗 Rutas Disponibles

| Ruta | Descripción |
|------|-------------|
| `GET /` | Página de inicio con enlace al dashboard |
| `GET /dashboard` | Dashboard con datos dinámicos y parciales |

## 💡 Conceptos Implementados

### 1. **Partials (Parciales)**
Los parciales son plantillas reutilizables. Se incluyen con `{{> nombrePartial}}`:

```handlebars
{{> header}}  <!-- Incluye views/partials/header.hbs -->
{{> footer}}  <!-- Incluye views/partials/footer.hbs -->
```

### 2. **Helpers Personalizados**
Se registran en `app.js` y se usan en las plantillas:

```javascript
hbs.registerHelper('priorityClass', function(priority) {
  if (priority === 'alta') return 'priority-high';
  if (priority === 'media') return 'priority-medium';
  return 'priority-low';
});
```

Uso en plantilla:
```handlebars
<li class="{{priorityClass this.priority}}">{{this.description}}</li>
```

### 3. **Condicionales**
```handlebars
{{#if user.isAdmin}}
  <p>Acceso de Administrador</p>
{{/if}}

{{#if this.isCompleted}}
  Completado ✔
{{else}}
  En Progreso ⏳
{{/if}}
```

### 4. **Bucles (Each)**
```handlebars
{{#each projects}}
  <h4>{{this.name}}</h4>
  {{#each this.tasks}}
    <li>{{this.description}}</li>
  {{/each}}
{{/each}}
```

### 5. **Condicionales sobre Arrays**
```handlebars
{{#if this.tasks.length}}
  <ul><!-- mostrar tareas --></ul>
{{else}}
  <p>Sin tareas asignadas</p>
{{/if}}
```

## 🎨 Estilos CSS

Se incluyen clases para las prioridades:

```css
.priority-high   { color: red; font-weight: bold; }
.priority-medium { color: orange; }
.priority-low    { color: blue; }
```

## 📊 Datos del Dashboard

El endpoint `/dashboard` devuelve:

```javascript
{
  user: {
    name: 'Carlos',
    isAdmin: true
  },
  projects: [
    {
      name: 'API Gateway',
      isCompleted: false,
      tasks: [
        { description: 'Diseñar endpoints', priority: 'alta' },
        { description: 'Implementar JWT', priority: 'alta' },
        { description: 'Crear documentación', priority: 'media' }
      ]
    },
    // ... más proyectos
  ]
}
```

## 🔧 Personalización

### Cambiar el puerto
Edita `app.js` y modifica:
```javascript
const PORT = process.env.PORT || 3000;
```

### Agregar más parciales
1. Crea un archivo en `views/partials/`
2. Usa en plantillas con `{{> nombrePartial}}`

### Agregar más helpers
En `app.js`:
```javascript
hbs.registerHelper('nombreHelper', function(param) {
  // Tu lógica aquí
});
```

## 📚 Referencias

- [Express.js Documentation](https://expressjs.com/)
- [HBS (Handlebars)](https://www.npmjs.com/package/hbs)
- [Handlebars Syntax](https://handlebarsjs.com/)

## 📝 Notas

Este proyecto es parte del **Módulo 6** del curso sobre servidores Node.js con Express, enfocándose en vistas dinámicas, parciales y helpers personalizados.

---

**Versión:** 1.0.0 | **Última actualización:** 2026-02-11
