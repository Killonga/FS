/**
 * Módulo 6: Sistema de Histórico
 * Gestiona el almacenamiento y recuperación de histórico de indicadores
 */

class Historico {
    constructor(maxRegistros = 20) {
        this.registros = [];
        this.maxRegistros = maxRegistros; // Máximo de registros a mantener
    }

    /**
     * Agrega un nuevo registro de indicadores
     */
    agregar(datos) {
        const registro = {
            ...datos,
            fecha: new Date().toLocaleTimeString('es-CL'),
            timestamp: Date.now()
        };

        this.registros.push(registro);

        // Mantener solo los últimos N registros
        if (this.registros.length > this.maxRegistros) {
            this.registros.shift(); // Eliminar el más antiguo
        }

        return registro;
    }

    /**
     * Obtiene todos los registros
     */
    obtenerTodos() {
        return this.registros;
    }

    /**
     * Obtiene último registro
     */
    obtenerUltimo() {
        return this.registros.length > 0 
            ? this.registros[this.registros.length - 1] 
            : null;
    }

    /**
     * Formatea datos para gráfico (etiquetas y valores)
     */
    formatoParaGrafico() {
        return {
            etiquetas: this.registros.map(r => r.fecha),
            dolar: this.registros.map(r => parseFloat(r.dolar)),
            uf: this.registros.map(r => parseFloat(r.uf)),
            bitcoin: this.registros.map(r => parseFloat(r.bitcoin)),
            jpy: this.registros.map(r => parseFloat(r.jpy))
        };
    }

    /**
     * Limpia el histórico
     */
    limpiar() {
        this.registros = [];
    }

    /**
     * Obtiene estadísticas del histórico
     */
    estadisticas() {
        if (this.registros.length === 0) {
            return null;
        }

        const dolarValues = this.registros.map(r => parseFloat(r.dolar));
        const ufValues = this.registros.map(r => parseFloat(r.uf));
        const bitcoinValues = this.registros.map(r => parseFloat(r.bitcoin));

        return {
            registros: this.registros.length,
            dolar: {
                min: Math.min(...dolarValues).toFixed(2),
                max: Math.max(...dolarValues).toFixed(2),
                promedio: (dolarValues.reduce((a, b) => a + b, 0) / dolarValues.length).toFixed(2)
            },
            uf: {
                min: Math.min(...ufValues).toFixed(2),
                max: Math.max(...ufValues).toFixed(2),
                promedio: (ufValues.reduce((a, b) => a + b, 0) / ufValues.length).toFixed(2)
            },
            bitcoin: {
                min: Math.min(...bitcoinValues).toFixed(2),
                max: Math.max(...bitcoinValues).toFixed(2),
                promedio: (bitcoinValues.reduce((a, b) => a + b, 0) / bitcoinValues.length).toFixed(2)
            }
        };
    }
}

module.exports = Historico;
