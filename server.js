const express = require("express");
const path = require("path");
const { validarCedula } = require("./module10-validator");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Servir correctamente la carpeta public SIN "/public/public"
app.use(express.static(path.join(__dirname, "public")));

// Ruta principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Endpoint API web
app.get("/validar/:cedula", (req, res) => {
  const cedula = req.params.cedula;
  const valida = validarCedula(cedula);
  res.json({ cedula, valida });
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});



