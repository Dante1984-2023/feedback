

const express = require('express');
const app = express();
//importamos la libreria mongoose para conectar la data base
const mongoose =require('mongoose');
//importamos librerias para Validar datos
const { check, validationResult } = require('express-validator');
const {body} = require('express-validator');

//importamos las configuraciones para las variables de entorno
const dotenv = require('dotenv');
//un metodo
//dotenv.config();

//otro metodo
require('dotenv').config();
const PORT = process.env.PORT || 8080;

//Traemos las url de conexiones a Mongo
const MONGOLOCAL = process.env.MONGOLOCAL;
const MONGOATLAS = process.env.MONGOATLAS;




//conexion a la database de mongo - 1
//mongoose.connect(MONGOLOCAL);





//Conexion a la database de mongo - 2
mongoose.connect(MONGOATLAS,{
    useNewUrlParser: true, 
    useUnifiedTopology: true, 

})
   .then(()=>{
       console.log('Database conectada a MONGOLOCAL');
   })
   .catch((error)=>{
    console.log(`El error es: ${error}`);
   })




  //conexion a la database de mongo - 3 
   /* mongoose.connect(MONGOATLAS)
    .then(()=>{
    console.log('Database conectada a ATLAS');
})
.catch((error)=>{
 console.log(`El error es: ${error}`)
}) 

*/




//Conexion a la database de mongo - 4
//esperamos 5 seg para conectar a la database
/*setTimeout(function(){
    console.log('Arranco en 5 seg');
    mongoose.connect(MONGOLOCAL);},5000);
*/


//Middelwares: funciones intermedias
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//Rutas de aplicacion
app.get('/', (req, res)=>{
    console.log(req);
    res.status(200).json({
        mensaje: " codigo 200 - Todo OK!"
    });
});


app.get('/', (requiere,response)=>{   //callback una funcion adentro de otra funcion
                                      //requiere al servidor datos y se le responde con datos

})
app.post('/error', (req, res) =>{
    console.log('Error');
    res.status(500).send('<h1> TODO MAL<h1>')
});

app.post('/', 
    [
        check('nombre').isLength({min:4}),
        check('email').isEmail(),
        check('password').isLength({min:5}),
    ]
    ,    
    (req, res) => {

        const errores = validationResult(req);

        if (!errores.isEmpty()) {
          return res.status(400).json({ 
            errores: errores.array() 
        })
        }
    

        /* try{
            validationResult(req).throw()
            console.log(`Todo Bien`);
        }catch{
            console.log(`Todo Mal`);
        } */
    
    //obtenemos los datos y las gurdamos en variables
    /*   let nombre = req.body.nombre;
    let email = req.body.email;
    let password = req.body.password;  */
    console.log(req.body);
    //desestructuramos los datos y lo guardamos en variables
    const { nombre, email, password } = req.body;
    /* if(password.length >= 8){ //ejemplo de validaciones anteriores
        console.log('Pass OK')
    }else{
        console.log(`El pass debe tener 8 caracteres`);
    } */
    //console.log(req.body);
    console.log(`Mis datos son: ${nombre} - ${email} - ${password}`);
    res.status(200).end('Tus datos fueron recibidos')
});
app.post('/body', 
    body('nombre').isLength({min:4}),
    body('email').isEmail(),
    body('password').isLength({min:5})
    




    ,    
    (req, res) => {
        const { nombre, email, password } = req.body;
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
          return res.status(400).json({ 
            errores: errores.array()
         })
        }
        res.status(200).json({
            mensaje:'User creado'
        })
        console.log(`Mis datos son: ${nombre} - ${email} - ${password}`);
    });




app.listen(PORT, function(){
    console.log(`servidor conectado en el puerto ${PORT}` );
})
