function validarLocal() {
  const cedula = document.getElementById("cedula").value.trim();

  fetch("/validar/" + cedula)
    .then(res => res.json())
    .then(data => {
      document.getElementById("resultado").innerHTML = data.mensaje;
    })
    .catch(() => {
      document.getElementById("resultado").innerHTML = "Error de conexión";
    });
}

function validarServicio() {
  const cedula = document.getElementById("cedula").value.trim();

  fetch("/api/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cedula })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("resultado").innerHTML = data.mensaje;
  })
  .catch(() => {
    document.getElementById("resultado").innerHTML = "Error del servicio";
  });
}

