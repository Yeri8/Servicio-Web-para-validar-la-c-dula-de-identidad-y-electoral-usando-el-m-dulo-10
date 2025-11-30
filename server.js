
const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function validarCedula(num) {
    num = num.replace(/-/g,'');
    if(!/^[0-9]{11}$/.test(num)) return false;

    let sum = 0;
    let alt = false;

    for (let i = num.length - 1; i >= 0; i--) {
        let n = parseInt(num[i]);
        if (alt) {
            n *= 2;
            if (n > 9) n -= 9;
        }
        sum += n;
        alt = !alt;
    }
    return sum % 10 === 0;
}

app.post('/validar', (req,res)=>{
    const { cedula } = req.body;
    res.json({ valido: validarCedula(cedula) });
});

app.listen(port, ()=>{
    console.log("Servidor en puerto " + port);
});




