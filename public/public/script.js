// Dirección del backend en Render
const RENDER_URL = "https://servicio-web-para-validar-la-c-dula-de.onrender.com";

// Validación local en el navegador
function validarLocal() {
    const cedula = document.getElementById("cedula").value.trim();
    const resultado = validarModulo10(cedula);
    document.getElementById("resultado").textContent = resultado.mensaje;
}

// Validación usando el servicio web (Render)
async function validarServicio() {
    const cedula = document.getElementById("cedula").value.trim();

    try {
        const response = await fetch(`${RENDER_URL}/validar/${cedula}`);
        if (!response.ok) throw new Error("Error HTTP " + response.status);

        const data = await response.json();
        document.getElementById("resultado").textContent = data.mensaje;
    } catch (error) {
        document.getElementById("resultado").textContent =
            "Error del servicio: " + error.message;
    }
}

// Función local del módulo 10
function validarModulo10(cedula) {
    cedula = cedula.replace(/-/g, "");
    if (!/^[0-9]{11}$/.test(cedula)) {
        return { valida: false, mensaje: "CÉDULA INCORRECTA" };
    }

    let suma = 0;
    const multiplicadores = [1,2,1,2,1,2,1,2,1,2];

    for (let i = 0; i < 10; i++) {
        let mult = parseInt(cedula[i]) * multiplicadores[i];
        if (mult >= 10) mult = Math.floor(mult / 10) + (mult % 10);
        suma += mult;
    }

    const digitoVerificador = (10 - (suma % 10)) % 10;
    return {
        mensaje: digitoVerificador === parseInt(cedula[10])
            ? "CÉDULA CORRECTA"
            : "CÉDULA INCORRECTA"
    };
}
