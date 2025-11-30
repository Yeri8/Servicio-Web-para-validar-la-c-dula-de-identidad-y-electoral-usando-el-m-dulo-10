document.addEventListener('DOMContentLoaded', () => {
  loadSection('home');

  document.querySelectorAll('.nav button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      loadSection(btn.dataset.section);
    });
  });
});

function loadSection(section) {
  const main = document.getElementById('main');
  if (section === 'home') {
    main.innerHTML = `
      <div class="card"><h2>Bienvenido</h2>
      <p>Servicio Web para validar cédulas usando el algoritmo Módulo 10. Usa la sección <strong>Validar</strong> para probar.</p></div>`;
  } else if (section === 'validate') {
    main.innerHTML = `
      <div class="card">
        <h2>Validar Cédula</h2>
        <p>Introduce la cédula (con o sin guiones). La validación puede hacerse localmente o mediante el servicio.</p>
        <div class="row" style="margin-top:12px">
          <input type="text" id="cedInput" placeholder="Ej: 001-1377777-2" />
          <button class="btn" id="localBtn">Validar (local)</button>
        </div>
        <div class="row" style="margin-top:10px">
          <button class="btn ghost" id="serviceBtn">Validar (servicio)</button>
          <button class="btn ghost" id="clearBtn">Limpiar</button>
        </div>
        <div id="result" class="result" aria-live="polite"></div>
      </div>`;
    document.getElementById('localBtn').addEventListener('click', ()=> {
      const v = document.getElementById('cedInput').value;
      if (typeof module10Validate === 'function') {
        const r = module10Validate(v);
        showResult(r);
      } else {
        document.getElementById('result').textContent = 'Validación local no disponible';
      }
    });
    document.getElementById('serviceBtn').addEventListener('click', async ()=> {
      const v = document.getElementById('cedInput').value;
      try {
        const q = '/api/validate?cedula=' + encodeURIComponent(v);
        const res = await fetch(q);
        if (!res.ok) {
          document.getElementById('result').textContent = 'Error del servicio: ' + res.status;
          return;
        }
        const json = await res.json();
        showResult(json);
      } catch (e) {
        document.getElementById('result').textContent = 'Error conectando al servicio: ' + e.message;
      }
    });
    document.getElementById('clearBtn').addEventListener('click', ()=> {
      document.getElementById('cedInput').value = '';
      document.getElementById('result').textContent = '';
    });
  } else if (section === 'examples') {
    main.innerHTML = `<div class="card"><h2>Ejemplos</h2>
      <ul class="examples">
        <li>79927398713 — ejemplo Luhn válido</li>
        <li>001-1377777-2 — formato RD (prueba)</li>
      </ul></div>`;
  } else if (section === 'notes') {
    main.innerHTML = `<div class="card"><h2>Notas</h2>
      <ul><li>El servicio aplica Módulo 10 y devuelve mensaje en español.</li>
      <li>La verificación local usa el mismo código (archivo module10-validator.js).</li></ul></div>`;
  }
}

function showResult(r) {
  const el = document.getElementById('result');
  if (!r) { el.textContent = 'Error'; return; }
  const valid = !!r.valid || !!r.valida;
  const msg = r.message || (valid ? 'CÉDULA ES CORRECTA' : 'CÉDULA ES INCORRECTA');
  el.textContent = msg;
  el.className = 'result ' + (valid ? 'ok' : 'bad');
}
