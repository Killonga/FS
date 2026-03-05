
const { query } = require('./pool_db');

let opciones = { year: 'numeric', month: 'short', day: 'numeric' };

const selectSimple = async () => {
    try {
        const res = await query('SELECT NOW()');
        console.log('Hora actual de la base de datos:', res.rows[0].now);
    } catch (error) {
        console.error('Error en selectSimple:', error.message);
    }
};


const selectTodosLosMensajes = async () => {
    try {
        const res = await query('SELECT * FROM mensajes');
        console.log(res.rows[0].id);

        console.log(new Date(res.rows[0].fecha).toLocaleDateString('es', opciones));

        console.log(res.rows[0].contenido);

        console.log(new Date(res.rows[0].fecha).toLocaleString('es-CL', {
            timeZone: 'America/Santiago',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }));

    } catch (error) {
        console.error('Error en selectTodosLosMensajes:', error.message);
    }
};

selectSimple();

selectTodosLosMensajes();