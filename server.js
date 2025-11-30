const express = require("express");
const path = require("path");
const validarCedula = require("./module10-validator");

const app = express();
const PORT = process.env.PORT || 3000;

// 👉 MUY IMPORTANTE
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/validar/:cedula", (req, res) => {
  const cedula = req.params.cedula;
  if (validarCedula(cedula)) {
    res.json({ cedula, valida: true, mensaje: "CÉDULA CORRECTA" });
  } else {
    res.json({ cedula, valida: false, mensaje: "CÉDULA INCORRECTA" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor http://localhost:${PORT}`);
});



