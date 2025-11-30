// module10-validator.js
function validarModulo10(cedula) {
    cedula = cedula.replace(/-/g, "");

    if (!/^[0-9]{11}$/.test(cedula)) {
        return { cedula, valida: false, mensaje: "CÉDULA INCORRECTA" };
    }

    let suma = 0;
    const multiplicadores = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];

    for (let i = 0; i < 10; i++) {
        let mult = parseInt(cedula[i]) * multiplicadores[i];
        if (mult >= 10) mult = Math.floor(mult / 10) + (mult % 10);
        suma += mult;
    }

    const digitoVerificador = (10 - (suma % 10)) % 10;

    return {
        cedula,
        valida: digitoVerificador === parseInt(cedula[10]),
        mensaje:
            digitoVerificador === parseInt(cedula[10])
                ? "CÉDULA CORRECTA"
                : "CÉDULA INCORRECTA"
    };
}

module.exports = validarModulo10;
