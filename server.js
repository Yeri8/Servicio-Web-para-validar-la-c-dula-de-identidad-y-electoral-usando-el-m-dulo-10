// server.js
const express = require("express");
const path = require("path");
const validator = require("./module10-validator");

const app = express();
app.use(express.json());

// Servir archivos estáticos (index.html)
app.use(express.static(path.join(__dirname, "public")));

// Página principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ruta API GET
app.get("/validar/:cedula", (req, res) => {
    const cedula = req.params.cedula;
    const resultado = validator(cedula);
    res.json(resultado);
});

// API POST (opcional)
app.post("/api/validate", (req, res) => {
    const cedula = req.body.cedula;
    const resultado = validator(cedula);
    res.json(resultado);
});

// Puerto para Render (importante)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
