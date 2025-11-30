// Validación LOCAL (con el archivo module10-validator.js)

async function validarLocal() {
  const cedula = document.getElementById('cedula').value;
  const resultado = document.getElementById('resultado');

  // Importación del módulo local
  const validarCedula = await import('../module10-validator.js')
    .then(m => m.default || m);

  const esValida = validarCedula(cedula);
  resultado.innerText = esValida ? 'CÉDULA CORRECTA' : 'CÉDULA INCORRECTA';
}

// Validación usando el SERVICIO WEB
async function validarServicio() {
  const cedula = document.getElementById('cedula').value;
  const resultado = document.getElementById('resultado');

  const response = await fetch(`/validar/${cedula}`);
  const data = await response.json();

  resultado.innerText = `${data.cedula} → ${data.mensaje}`;
}

