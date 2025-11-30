// server.js
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// Servir carpeta public
app.use(express.static(path.join(__dirname, "public")));

// ENDPOINTS API
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const { validarCedula } = require("./module10-validator");

// Ruta GET /validar/:cedula
app.get("/validar/:cedula", (req, res) => {
    const { cedula } = req.params;
    const resultado = validarCedula(cedula);
    res.json(resultado);
});

// Ruta POST /api/validate
app.post("/api/validate", (req, res) => {
    const { cedula } = req.body;
    const resultado = validarCedula(cedula);
    res.json(resultado);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
