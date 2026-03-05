/**
 * Módulo 6: Servicio de Indicadores
 * Gestiona todas las consultas a APIs externas de indicadores económicos
 */

const axios = require("axios");
const config = require("../config/config");
const Cache = require("../utils/cache");
const Historico = require("../utils/historico");

class IndicadoresService {
    constructor() {
        this.cache = new Cache(config.cache.ttl);
        this.historico = new Historico(20); // Mantener últimos 20 registros
    }

    /**
     * Consulta una API con reintentos automáticos
     */
    async consultarAPIConReintentos(url, timeout, reintentos = 3) {
        for (let intento = 1; intento <= reintentos; intento++) {
            try {
                console.log(`🔄 Intento ${intento}/${reintentos} para: ${url.split('/')[2]}`);
                const response = await axios.get(url, {
                    headers: config.headers,
                    timeout: timeout
                });
                return response;
            } catch (error) {
                if (intento === reintentos) {
                    throw error; // Último intento fallido
                }
                console.warn(`⚠️ Intento ${intento} falló, reintentando...`);
                await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo
            }
        }
    }

    /**
     * Obtiene indicadores económicos de las APIs
     * Utiliza caché para optimizar respuestas
     */
    async obtenerIndicadores() {
        const tiempoInicio = Date.now();
        console.log("📊 Solicitando indicadores económicos...");

        // Verificar caché
        const datosEnCache = this.cache.obtener();
        if (datosEnCache) {
            const tiempoTotal = Date.now() - tiempoInicio;
            console.log(`✅ Respuesta desde caché en ${tiempoTotal}ms\n`);
            return datosEnCache;
        }

        try {
            console.log("🔄 Consultando APIs externas (reintentos habilitados)...");
            
            // Realizar peticiones simultáneamente con reintentos
            const [mindicadorRes, exchangeRes] = await Promise.all([
                this.consultarAPIConReintentos(
                    config.apis.mindicador.url,
                    config.apis.mindicador.timeout,
                    3
                ),
                this.consultarAPIConReintentos(
                    config.apis.exchangeRate.url,
                    config.apis.exchangeRate.timeout,
                    3
                )
            ]);

            const mindicador = mindicadorRes.data;
            const exchange = exchangeRes.data;

            console.log("✅ Datos recibidos correctamente");

            // Extrae información
            const datos = {
                uf: mindicador.uf.valor,
                dolar: mindicador.dolar.valor,
                bitcoin: mindicador.bitcoin.valor,
                jpy: (mindicador.dolar.valor / exchange.rates.JPY).toFixed(2),
                timestamp: new Date().toLocaleTimeString('es-CL')
            };

            // Guardar en caché
            this.cache.guardar(datos);

            // Guardar en histórico
            this.historico.agregar(datos);

            const tiempoTotal = Date.now() - tiempoInicio;
            console.log(`✅ Datos procesados en ${tiempoTotal}ms\n`);

            return datos;

        } catch (error) {
            const tiempoTotal = Date.now() - tiempoInicio;
            console.error("❌ Error al obtener indicadores:", error.message);
            console.error(`   Tiempo transcurrido: ${tiempoTotal}ms`);
            
            if (error.response) {
                console.error("   Status:", error.response.status);
            } else if (error.code === 'ECONNABORTED') {
                console.error("   Razón: TIMEOUT - Las APIs tardaron más de los 10 segundos permitidos");
            }

            throw error;
        }
    }

    /**
     * Limpia el caché de indicadores
     */
    limpiarCache() {
        this.cache.limpiar();
    }

    /**
     * Obtiene el estado del caché
     */
    estadoCache() {
        return this.cache.estado();
    }

    /**
     * Obtiene el histórico de indicadores
     */
    obtenerHistorico() {
        return this.historico.obtenerTodos();
    }

    /**
     * Obtiene datos del histórico formateados para gráfico
     */
    obtenerDatosGrafico() {
        return this.historico.formatoParaGrafico();
    }

    /**
     * Obtiene estadísticas del histórico
     */
    obtenerEstadisticas() {
        return this.historico.estadisticas();
    }

    /**
     * Limpia el histórico
     */
    limpiarHistorico() {
        this.historico.limpiar();
    }
}

module.exports = new IndicadoresService();
