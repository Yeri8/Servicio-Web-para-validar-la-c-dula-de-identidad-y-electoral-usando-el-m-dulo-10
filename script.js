// Cargar secciones dinámicamente
const main = document.getElementById('main');
const navButtons = document.querySelectorAll('.nav button');

function loadSection(section) {
  navButtons.forEach(b => b.classList.remove('active'));
  document.querySelector(`[data-section="${section}"]`).classList.add('active');

  if (section === "home") {
    main.innerHTML = `
      <div class="card">
        <h2>Bienvenido al Servicio Web</h2>
        <p>Este sistema valida cédulas dominicanas usando el <b>algoritmo Módulo 10</b>.</p>
      </div>`;
  }

  else if (section === "validate") {
    main.innerHTML = `
      <div class="card">
        <h2>Validar Cédula</h2>
        <div class="row">
          <input id="cedulaInput" type="text" placeholder="Ingresa la cédula (11 dígitos)" maxlength="11"/>
          <button class="btn" id="btnValidate">Validar</button>
        </div>
        <div id="result" class="result"></div>
      </div>
    `;

    document.getElementById("btnValidate").addEventListener("click", () => {
      const value = document.getElementById("cedulaInput").value;
      const result = document.getElementById("result");

      if (value.length !== 11) {
        result.textContent = "Debe tener 11 dígitos.";
        result.className = "result bad";
        return;
      }

      if (validateCedula(value)) {
        result.textContent = "Cédula válida ✔️";
        result.className = "result ok";
      } else {
        result.textContent = "Cédula NO válida ✖️";
        result.className = "result bad";
      }
    });
  }

  else if (section === "examples") {
    main.innerHTML = `
      <div class="card">
        <h2>Cédulas de ejemplo</h2>
        <ul class="examples">
          <li>00113918205 ✔️</li>
          <li>40200700643 ✔️</li>
          <li>00113918206 ✖️</li>
        </ul>
      </div>`;
  }

  else if (section === "notes") {
    main.innerHTML = `
      <div class="card">
        <h2>Notas</h2>
        <p>Este proyecto es académico y demuestra el uso del <b>Módulo 10</b>.</p>
      </div>`;
  }
}

navButtons.forEach(button => {
  button.addEventListener('click', () => loadSection(button.dataset.section));
});

// Cargar inicio por defecto
loadSection("home");
