/**
 * server.js
 * Servicio Web para validar cédula usando módulo 10.
 */

const express = require('express');
const path = require('path');
const { module10Validate } = require('./module10-validator');

const app = express();
const START_PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function formatResponse(rawCedula) {
  const r = module10Validate(rawCedula);
  const valid = !!r.valid;
  let message = '';
  if (valid) {
    message = 'CÉDULA ES CORRECTA';
  } else {
    if (r.reason === 'estructura') {
      message = 'CÉDULA ES INCORRECTA (estructura)';
    } else if (r.reason === 'digito') {
      message = 'CÉDULA ES INCORRECTA (dígito verificador)';
    } else if (r.reason === 'trivial') {
      message = 'CÉDULA ES INCORRECTA (número trivial)';
    } else {
      message = 'CÉDULA ES INCORRECTA';
    }
  }
  return {
    cedula_raw: String(rawCedula || ''),
    cedula: r.cleaned,
    valid: valid,
    reason: r.reason,
    computedCheck: r.computedCheck !== undefined ? r.computedCheck : null,
    checkDigit: r.checkDigit !== undefined ? r.checkDigit : null,
    method: r.method || null,
    message: message
  };
}

// GET /api/validate?cedula=...
app.get('/api/validate', (req, res) => {
  const ced = req.query.cedula;
  if (!ced) return res.status(400).json({ error: 'Parámetro "cedula" requerido en query string.' });
  res.json(formatResponse(ced));
});

// POST /api/validate { "cedula": "..." }
app.post('/api/validate', (req, res) => {
  const ced = req.body.cedula;
  if (!ced) return res.status(400).json({ error: 'Campo JSON "cedula" requerido en el body.' });
  res.json(formatResponse(ced));
});

// GET /validar/:cedula
app.get('/validar/:cedula', (req, res) => {
  res.json(formatResponse(req.params.cedula));
});

app.get('/', (req, res) => {
  res.json({
    service: 'Cedula Module10 Validator Service (UI integrada)',
    endpoints: [
      'GET /api/validate?cedula=...',
      'POST /api/validate { \"cedula\": \"...\" }',
      'GET /validar/:cedula'
    ]
  });
});

function startServer(port) {
  const srv = app.listen(port, () => {
    console.log(`Cedula validator service listening on port ${port}`);
  });
  srv.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const newPort = parseInt(port) + 1;
      console.warn(`Puerto ${port} en uso. Intentando puerto ${newPort}...`);
      startServer(newPort);
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });
}

startServer(START_PORT);
