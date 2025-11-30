const { module10Validate } = require('./module10-validator');
const tests = ['79927398713','00113777772','40212054885','40200700675','12345678901','001-1377777-2'];
for(const t of tests){
  const r = module10Validate(t);
  console.log(t, '=>', r.valid ? 'CÉDULA ES CORRECTA' : 'CÉDULA ES INCORRECTA', r);
}
