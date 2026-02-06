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
    try {
        const { data: mindicador } = await axios.get("https://mindicador.cl/api");
        const { data: exchange } = await axios.get("https://api.exchangerate-api.com/v4/latest/USD");

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
        console.error(error);
        res.status(500).send("Error al obtener los indicadores");
    }
});

// Configuración del servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
