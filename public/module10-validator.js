/*
module10-validator.js (robusta)
Validador Módulo 10: limpia la cédula, rechaza triviales y aplica variantes.
*/
function cleanCedula(s) {
  return String(s || '').replace(/[^0-9]/g, '');
}

function isTrivial(ced) {
  return /^(\d)\1+$/.test(ced);
}

// Luhn clásico (procesar body de derecha a izquierda, sin dígito verificador)
function luhnRight(ced) {
  const digits = ced.split('').map(d => parseInt(d,10));
  const checkDigit = digits[digits.length - 1];
  const body = digits.slice(0, digits.length - 1).reverse();
  let sum = 0;
  for (let i = 0; i < body.length; i++) {
    let v = body[i];
    if (i % 2 === 0) {
      v = v * 2;
      if (v > 9) v -= 9;
    }
    sum += v;
  }
  const mod = sum % 10;
  const computedCheck = (mod === 0) ? 0 : (10 - mod);
  return { computedCheck, checkDigit, sum, ok: computedCheck === checkDigit, method: 'luhn-right' };
}

// Variante: multiplicar empezando desde la izquierda (útil para 11 dígitos)
function mod10Left(ced) {
  const digits = ced.split('').map(d => parseInt(d,10));
  const checkDigit = digits[digits.length - 1];
  const body = digits.slice(0, digits.length - 1);
  let sum = 0;
  for (let i = 0; i < body.length; i++) {
    let v = body[i];
    if (i % 2 === 1) {
      v = v * 2;
      if (v > 9) v -= 9;
    }
    sum += v;
  }
  const mod = sum % 10;
  const computedCheck = (mod === 0) ? 0 : (10 - mod);
  return { computedCheck, checkDigit, sum, ok: computedCheck === checkDigit, method: 'mod10-left' };
}

function module10Validate(cedulaRaw) {
  const ced = cleanCedula(cedulaRaw);
  if (!(ced.length === 10 || ced.length === 11)) {
    return { valid: false, reason: 'estructura', cleaned: ced };
  }
  if (isTrivial(ced)) {
    return { valid: false, reason: 'trivial', cleaned: ced };
  }
  if (ced.length === 11) {
    const res = mod10Left(ced);
    return {
      valid: res.ok,
      reason: res.ok ? 'ok' : 'digito',
      cleaned: ced,
      computedCheck: res.computedCheck,
      checkDigit: res.checkDigit,
      method: res.method,
      sum: res.sum
    };
  } else {
    const res = luhnRight(ced);
    return {
      valid: res.ok,
      reason: res.ok ? 'ok' : 'digito',
      cleaned: ced,
      computedCheck: res.computedCheck,
      checkDigit: res.checkDigit,
      method: res.method,
      sum: res.sum
    };
  }
}

// Export para Node
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { module10Validate, cleanCedula, isTrivial };
}

