/**
 * Módulo 6: Configuración Central
 * Gestiona todas las variables de configuración de la aplicación
 */

module.exports = {
    // Configuración del servidor
    server: {
        port: 3001,
        env: process.env.NODE_ENV || 'development'
    },

    // Configuración de APIs externas
    apis: {
        mindicador: {
            url: "https://mindicador.cl/api",
            timeout: 10000  // Aumentado a 10 segundos
        },
        exchangeRate: {
            url: "https://api.exchangerate-api.com/v4/latest/USD",
            timeout: 10000  // Aumentado a 10 segundos
        }
    },

    // Headers para solicitudes HTTP
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    },

    // Configuración de caché
    cache: {
        ttl: 60000, // 60 segundos
        enabled: true
    }
};
