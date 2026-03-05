/**
 * Módulo 6: Sistema de Caché
 * Gestiona el almacenamiento temporal de datos para optimizar respuestas
 */

class Cache {
    constructor(ttl = 60000) {
        this.data = null;
        this.timestamp = null;
        this.ttl = ttl; // Time to live en milisegundos
    }

    /**
     * Obtiene datos del caché si son válidos
     */
    obtener() {
        if (this.data && this.timestamp) {
            const ahora = Date.now();
            if (ahora - this.timestamp < this.ttl) {
                console.log("📦 Datos obtenidos del caché");
                return this.data;
            }
        }
        return null;
    }

    /**
     * Guarda datos en el caché
     */
    guardar(datos) {
        this.data = datos;
        this.timestamp = Date.now();
        console.log("💾 Datos guardados en caché");
    }

    /**
     * Limpia el caché
     */
    limpiar() {
        this.data = null;
        this.timestamp = null;
        console.log("🗑️  Caché limpiado");
    }

    /**
     * Obtiene información del estado del caché
     */
    estado() {
        if (!this.data) {
            return { estado: "vacío" };
        }
        const ahora = Date.now();
        const edad = ahora - this.timestamp;
        const valido = edad < this.ttl;
        const tiempoRestante = Math.max(0, this.ttl - edad);

        return {
            estado: valido ? "válido" : "expirado",
            edad: `${(edad / 1000).toFixed(2)}s`,
            tiempoRestante: `${(tiempoRestante / 1000).toFixed(2)}s`,
            ttl: `${(this.ttl / 1000).toFixed(0)}s`
        };
    }
}

module.exports = Cache;
