// Algoritmo Módulo 10 para validar cédulas dominicanas
function validarCedula(cedula) {
  cedula = cedula.replace(/-/g, '');

  if (cedula.length !== 11) return false;

  let suma = 0;
  const multiplicadores = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];

  for (let i = 0; i < 10; i++) {
    let resultado = parseInt(cedula[i]) * multiplicadores[i];
    if (resultado >= 10) resultado -= 9;
    suma += resultado;
  }

  let verificador = (10 - (suma % 10)) % 10;
  return verificador === parseInt(cedula[10]);
}

module.exports = { validarCedula };
