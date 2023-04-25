const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();

const MONGOLOCAL = process.env.MONGOLOCAL;
const MONGOATLAS = process.env.MONGOATLAS;



//Conexion a la database de mongo - 2
mongoose.connect(MONGOATLAS, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,

})
   .then(()=>{
       console.log('Database conectada a MONGOATLAS');
   })
   .catch((error)=>{
    console.log(`El error es: ${error}`);
   })


