const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());

// Ruta estática → Render sí sirve index.html
app.use(express.static(path.join(__dirname, "public")));

// Algoritmo módulo 10
function validarCedula(cedula) {
  cedula = cedula.replace(/-/g, "").trim();
  if (!/^\d{11}$/.test(cedula)) return false;

  let suma = 0;
  for (let i = 0; i < 10; i++) {
    let multiplicador = (i % 2 === 0) ? 1 : 2;
    let resultado = parseInt(cedula[i]) * multiplicador;
    if (resultado > 9) resultado = Math.floor(resultado / 10) + (resultado % 10);
    suma += resultado;
  }
  let ultimoDigito = parseInt(cedula[10]);
  return ((10 - (suma % 10)) % 10) === ultimoDigito;
}

// Endpoint
app.get("/api/validate", (req, res) => {
  const cedula = req.query.cedula;
  res.json({
    cedula,
    valida: validarCedula(cedula)
  });
});

// Render requiere esto 👇
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});

