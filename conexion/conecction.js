const mongoose = require('mongoose');
require('dotenv').config();

const MONGOLOCAL = process.env.MONGOLOCAL;
const MONGOATLAS = process.env.MONGOATLAS;



//Conexion a la database de mongo - 2
mongoose.connect(MONGOLOCAL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,

})
   .then(()=>{
       console.log('Database conectada a MONGOLOCAL');
   })
   .catch((error)=>{
    console.log(`El error es: ${error}`);
   })


