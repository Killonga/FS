const express = require("express");
const axios = require("axios");

const app = express();
const port = 3001;

// Ruta principal
app.get("/", (req, res) => {
    res.send("Hola mundo express. <br> <a href='/indicadores'>Ver Indicadores</a>");
});

// Ruta usuarios
app.get("/usuarios", (req, res) => {
    res.send("<h1>Hola mundo</h1>");
});

// Ruta indicadores
app.get("/indicadores", async (req, res) => {
    console.log("Solicitando indicadores...");
    try {
        //me mandaba error en el HEADERS, encontre esta sugerencia en internet y me funciono.
        //User-Agent añadido: APIs como mindicador.cl a menudo bloquean solicitudes que no parecen provenir de un navegador. 
        const config = {
            headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" }
        };

        const { data: mindicador } = await axios.get("https://mindicador.cl/api", config);
        console.log("Datos de mindicador recibidos"); //indicador para consola

        const { data: exchange } = await axios.get("https://api.exchangerate-api.com/v4/latest/USD", config);
        console.log("Datos de exchange recibidos");

        const uf = mindicador.uf.valor;
        const dolar = mindicador.dolar.valor;
        const bitcoin = mindicador.bitcoin.valor;

        // Calculo de JPY en CLP: (1 USD en CLP) / (JPY por USD)
        const jpyRate = exchange.rates.JPY;
        const jpy = (dolar / jpyRate).toFixed(2);

        res.send(`
            <h1>Indicadores Económicos</h1>
            <p>Pesos Chilenos (UF): $${uf}</p>
            <p>Dolar USD: $${dolar}</p>
            <p>Moneda de Japon (JPY): $${jpy} CLP</p>
            <p>Bitcoin: $${bitcoin} USD</p>
        `);
    } catch (error) {
        console.error("Error detallado:", error.message);
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        }
        res.status(500).send(`Error al obtener los indicadores: ${error.message} <br> Ver consola del servidor para mas detalles.`);
    }
});

// Configuración del servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
