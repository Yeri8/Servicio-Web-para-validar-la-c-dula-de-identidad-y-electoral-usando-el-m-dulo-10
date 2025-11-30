function validarLocal() {
    const ced = document.getElementById("cedula").value;
    const valido = validarCedula(ced);

    document.getElementById("resultado").innerText =
        valido ? "✔ Cédula válida (local)" : "✘ Cédula inválida (local)";
}

async function validarServicio() {
    const ced = document.getElementById("cedula").value;

    try {
        const resp = await fetch("/api/validar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cedula: ced })
        });

        const data = await resp.json();

        if (data.error) {
            document.getElementById("resultado").innerText = "Error del servicio: " + data.error;
            return;
        }

        document.getElementById("resultado").innerText =
            data.valido ? "✔ Cédula válida (servicio)" : "✘ Cédula inválida (servicio)";
    } catch (err) {
        document.getElementById("resultado").innerText =
           "Error del servicio (Render no respondió)";
    }
}

function limpiar() {
    document.getElementById("cedula").value = "";
    document.getElementById("resultado").innerText = "";
}
