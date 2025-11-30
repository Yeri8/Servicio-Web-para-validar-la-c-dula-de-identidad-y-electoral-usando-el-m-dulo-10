// VALIDACIÓN MÓDULO 10 - SOLO CLIENTE (NO USA NODE!)
function validarCedula(cedula) {
  cedula = cedula.replace(/-/g, ''); // quitar guiones
  
  if (cedula.length !== 11) return false;

  let suma = 0;
  let multiplicadores = [1,2,1,2,1,2,1,2,1,2,1];

  for (let i = 0; i < 11; i++) {
    let resultado = cedula[i] * multiplicadores[i];
    if (resultado >= 10) resultado = Math.floor(resultado / 10) + (resultado % 10);
    suma += resultado;
  }

  return (suma % 10 === 0);
}
