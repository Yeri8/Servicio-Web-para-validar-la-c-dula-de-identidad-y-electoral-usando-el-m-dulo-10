function validarLocal() {
  const cedula = document.getElementById("cedula").value;
  fetch(`/validar/${cedula}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("resultado").textContent = data.valida
        ? "✔ CÉDULA CORRECTA (válida)"
        : "✖ CÉDULA INCORRECTA";
    });
}

function validarServicio() {
  const cedula = document.getElementById("cedula").value;
  fetch(`/validar/${cedula}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("resultado").textContent = data.valida
        ? "✔ CÉDULA CORRECTA (servicio OK)"
        : "✖ ERROR DEL SERVICIO / CÉDULA INCORRECTA";
    })
    .catch(() => {
      document.getElementById("resultado").textContent = "Error del servicio.";
    });
}

function limpiar() {
  document.getElementById("cedula").value = "";
  document.getElementById("resultado").textContent = "";
}
