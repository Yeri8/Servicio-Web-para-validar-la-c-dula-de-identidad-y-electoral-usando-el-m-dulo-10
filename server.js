// server.js
const express = require("express");
const path = require("path");
const validator = require("./module10-validator");

const app = express();
app.use(express.json());

// Sirve la carpeta public
app.use(express.static(path.join(__dirname, "public")));

// Página principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ruta GET para API
app.get("/validar/:cedula", (req, res) => {
    const cedula = req.params.cedula;
    const resultado = validator(cedula);
    res.json(resultado);
});

// Puerto para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});

