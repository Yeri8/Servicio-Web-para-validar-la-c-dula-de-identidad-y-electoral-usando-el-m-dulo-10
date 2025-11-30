// =====================================================
//   SCRIPT PRINCIPAL - Validación Local de la Cédula RD
// =====================================================

// Función para validar la cédula usando módulo 10 (desde module10-validator-client.js)
function validarLocal() {
  const cedula = document.getElementById("cedulaInput").value.trim();

  // Si el input está vacío
  if (!cedula) {
    mostrarResultado("⚠ Debes escribir una cédula.", "bad");
    return;
  }

  const esValida = validarCedula(cedula); // función importada

  if (esValida) {
    mostrarResultado("✔ Cédula válida (Módulo 10 correcto)", "ok");
  } else {
    mostrarResultado("❌ Cédula inválida (No pasa el módulo 10)", "bad");
  }
}

// Función para mostrar el mensaje con colores
function mostrarResultado(mensaje, tipo) {
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.textContent = mensaje;
  resultadoDiv.className = "result " + tipo; // Agrega clase CSS
}

// Función para limpiar
function limpiar() {
  document.getElementById("cedulaInput").value = "";
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.textContent = "";
  resultadoDiv.className = "";
}

// =====================================================
//    EVENTO PARA ENTER (Presionar Enter en el campo)
// =====================================================
document.getElementById("cedulaInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") validarLocal();
});

