// Validación Módulo 10 (local)
function validarLocal() {
  const cedula = document.getElementById("cedula").value.replace(/-/g, "");
  let suma = 0;

  if (cedula.length !== 11) {
    mostrar("Cédula incompleta", "red");
    return;
  }

  for (let i = 0; i < 10; i++) {
    let num = parseInt(cedula[i]);
    if (i % 2 === 0) num *= 1;
    else num *= 2;

    if (num > 9) num = Math.floor(num / 10) + (num % 10); // 12 → 1 + 2
    suma += num;
  }

  const verificador = (10 - (suma % 10)) % 10;

  if (verificador === parseInt(cedula[10])) {
    mostrar("✔ CÉDULA CORRECTA", "green");
  } else {
    mostrar("❌ CÉDULA INCORRECTA", "red");
  }
}

function mostrar(texto, color) {
  const r = document.getElementById("resultado");
  r.textContent = texto;
  r.style.color = color;
}

function limpiar() {
  document.getElementById("cedula").value = "";
  mostrar("", "black");
}
