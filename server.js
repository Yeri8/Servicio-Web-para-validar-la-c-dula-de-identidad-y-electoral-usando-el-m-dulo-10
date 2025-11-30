// server.js
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON (por si usas POST)
app.use(express.json());

// Servir carpeta PUBLIC automáticamente
app.use(express.static(path.join(__dirname, "public")));

// Ruta principal → enviar index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Validar cédula (servicio web)
app.get("/validar/:cedula", (req, res) => {
  const cedula = req.params.cedula;

  if (validarCedula(cedula)) {
    res.json({ cedula, valida: true, mensaje: "CÉDULA CORRECTA" });
  } else {
    res.json({ cedula, valida: false, mensaje: "CÉDULA INCORRECTA" });
  }
});

// Función de validación (módulo 10)
function validarCedula(cedula) {
  cedula = cedula.replace(/-/g, "");
  if (cedula.length !== 11) return false;

  let suma = 0;
  let multiplicadores = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1];

  for (let i = 0; i < 11; i++) {
    let digito = parseInt(cedula[i]) * multiplicadores[i];
    if (digito > 9) digito -= 9;
    suma += digito;
  }

  return suma % 10 === 0;
}

app.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});


