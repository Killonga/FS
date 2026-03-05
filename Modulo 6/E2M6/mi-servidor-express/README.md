<!-- README.md -->
# 📦 Módulo 6: Servidor Express Atomizado

## 🎯 Descripción
Servidor Express con arquitectura modular y escalable que consulta indicadores económicos en tiempo real desde APIs externas.

## 📁 Estructura del Proyecto

```
mi-servidor-express/
│
├── app.js                          # 🚀 Punto de entrada (limpio y simple)
├── package.json                    # 📋 Dependencias
│
├── config/
│   └── config.js                   # ⚙️ Configuración centralizada
│       ├── Puerto, entorno
│       ├── URLs de APIs
│       ├── Headers HTTP
│       └── Configuración de caché
│
├── services/
│   └── indicadoresService.js       # 🔧 Lógica de negocio
│       ├── Consulta APIs externas
│       ├── Procesa indicadores
│       ├── Maneja caché
│       ├── Maneja histórico
│       └── Control de errores
│
├── routes/
│   ├── index.js                    # 🏠 Página principal
│   ├── indicadores.js              # 📈 Ruta de indicadores + gráficos
│   ├── historico.js                # 📊 Histórico completo
│   ├── usuarios.js                 # 👥 Ruta de usuarios
│   ├── status.js                   # 🔍 Estado del servidor
│   └── cache.js                    # 💾 Gestión del caché
│
├── utils/
│   ├── cache.js                    # 📦 Clase de caché reutilizable
│   └── historico.js                # 📊 Clase de histórico de datos
│
└── node_modules/                   # 📚 Dependencias instaladas
```

## 🧩 Componentes

### 1. **config/config.js** - Configuración Centralizada
- Configuración del servidor (puerto, entorno)
- URLs y timeouts de APIs
- Headers HTTP estándar
- Parámetros de caché

### 2. **services/indicadoresService.js** - Servicio de Indicadores
- Consulta simultáneamente 2 APIs externas
- Procesa y cálcula conversiones de monedas
- Implementa sistema de caché automático
- Manejo avanzado de errores

### 3. **routes/** - Rutas Modulares
- **index.js**: Menú principal con navegación
- **indicadores.js**: Mostración de indicadores económicos
- **usuarios.js**: Gestión de usuarios (en desarrollo)
- **status.js**: Información del estado del servidor
- **cache.js**: Dashboard de gestión del caché

### 4. **utils/cache.js** - Utilidad de Caché
- Clase reutilizable para cualquier caché
- Métodos: obtener, guardar, limpiar, estado
- Configurable con TTL personalizado

### 5. **app.js** - Punto de Entrada
- Importa todas las rutas
- Registro centralizado de middlewares
- Manejo de errores global
- Manejo de 404

## 🚀 Cómo Ejecutar

### Instalación de dependencias
```bash
npm install
```

### Ejecutar en modo desarrollo (con nodemon)
```bash
npm start
```

### Ejecutar en modo producción
```bash
node app.js
```

## 🌐 Rutas Disponibles

| Ruta | Método | Descripción |
|------|--------|-------------|
| `/` | GET | Página principal |
| `/indicadores` | GET | Indicadores económicos con gráficos |
| `/historico` | GET | Histórico completo con tabla y estadísticas |
| `/usuarios` | GET | Gestión de usuarios |
| `/status` | GET | Estado del servidor |
| `/cache` | GET | Gestión del caché |
| `/cache/limpiar` | POST | Limpiar caché manualmente |

## 📊 Características

- ✅ **Modular**: Fácil de mantener y escalar
- ✅ **Rápido**: Sistema de caché automático (60s)
- ✅ **Robusto**: Manejo avanzado de errores con reintentos
- ✅ **Timouts**: Protección contra APIs lentas (10s)
- ✅ **Monitoreo**: Dashboard de estado y caché
- ✅ **Gráficos**: Visualización en tiempo real con Chart.js
- ✅ **Histórico**: Registro completo de mediciones
- ✅ **Estadísticas**: Cálculos de min, max y promedio
- ✅ **Limpio**: Código bien organizado y documentado

## 🔄 Flujo de Funcionamiento

```
Cliente → app.js → routes → services → config
                      ↓
         utilidades (caché, histórico)
                      ↓
                   APIs externas
                      ↓
              procesamiento de datos
                      ↓
         gráficos y estadísticas
                      ↓
                   Response
```

## 📈 Nuevas Características: Gráficos e Histórico

### Gráficos Dinámicos
La ruta `/indicadores` ahora muestra gráficos en tiempo real usando Chart.js:
- **Gráfico de Dólar USD**: Evolución del tipo de cambio
- **Gráfico de UF**: Variación del índice chileno
- **Gráfico de Bitcoin**: Volatilidad de criptomoneda

### Histórico Completo
La ruta `/historico` proporciona:
- **Tabla de datos**: Todos los registros capturados
- **Estadísticas**: Min, Max, promedio de cada indicador
- **Límite automático**: Mantiene los últimos 20 registros

### Almacenamiento de Datos
```javascript
// Cada medición se guarda automáticamente
{
    uf: 32452.47,
    dolar: 890.50,
    bitcoin: 45230.25,
    jpy: 130.45,
    fecha: "14:32:45",
    timestamp: 1707582765000
}
```

## 📈 APIs Utilizadas

1. **Mindicador** (https://mindicador.cl/api)
   - UF (Unidad de Fomento Chile)
   - Dólar USD
   - Bitcoin

2. **Exchange Rate** (https://api.exchangerate-api.com/v4/latest/USD)
   - Conversión de monedas (incluye JPY)

## ⚙️ Configuración Personalizada

Edita `config/config.js` para:
- Cambiar puerto
- Modificar URLs de APIs
- Ajustar timeout de requests
- Cambiar TTL del caché

## 🐛 Debugging

Ver logs en consola:
```
📊 Solicitando indicadores económicos...
🔄 Consultando APIs externas...
✅ Datos recibidos correctamente
💾 Datos guardados en caché
```

## 📝 Notas de Desarrollo

- Cada módulo es independiente y reutilizable
- Los servicios no dependen directamente de las rutas
- El caché puede usarse en cualquier servicio
- Fácil agregar nuevas rutas sin modificar app.js

## 🎓 Lecciones del Módulo 6

- ✅ Rutas modulares en Express
- ✅ Peticiones HTTP con axios
- ✅ Async/await y manejo de promesas
- ✅ Caché en memoria
- ✅ Manejo de errores y reintentos
- ✅ Arquitectura modular (separation of concerns)
- ✅ Visualización de datos con gráficos (Chart.js)
- ✅ Almacenamiento temporal de histórico
- ✅ Cálculos estadísticos
- ✅ Interfaz responsiva y moderna

---

**Versión:** 1.0.0  
**Módulo:** 6  
**Estado:** ✅ Producción
