const { body } = require('express-validator');
const { validationResult } = require('express-validator');
//importamos el medelo
const Usuario = require('../models/userModel');
const bcrypt = require('bcrypt');






//Pegamos las funciones de las rutas de userRutas


const paginaPrincipal = (req, res)=>{
    //console.log(req);
    res.status(200).json({
        mensaje: " codigo 200 - Todo OK!"
    });
};



const paginaError = (req, res) =>{
    console.log('Error');
    res.status(500).send('<h1> TODO MAL<h1>')
};


const registrarUsuario = async (req, res) => {   
    
    //1. Verificamos si los datos son correctos- viene de check
    const errores = validationResult(req);
    
    if(!errores.isEmpty()){
        return res.status(400).json({
            errores: errores.array()
        })
    }
    
    //2.desestructuramos los datos y lo guardamos en variables
    const { nombre, email, password } = req.body;
    console.log(`1. Mis datos son: ${nombre} - ${email} - ${password}`);

    //3.Verificar si el usuario ya existe
try{
    let usuarioExiste = await Usuario.findOne({email})
    console.log(`2.Existe: ${usuarioExiste}`);
    
    if(usuarioExiste){
        return res.status(400).json({
            errores: 'El usuario ya existe'
        })
    }
   //4.Si no existe, creamos un nuevo usuario.
   let nuevoUsuario = new Usuario(req.body);

   console.log(`3.Nuevo usuario a guardar ${nuevoUsuario}`);

    //5. Creamos la salt para mezclar con el password
    const salt = bcrypt.genSaltSync();

    console.log(`4. Sal para encriptacion: ${salt}`);
    console.log(`5. El password sin salt es:${nuevoUsuario.password}`);



    //6. Mezclamos la sal con el password del usuario
    nuevoUsuario.password = bcrypt.hashSync(password, salt);

    console.log(`6. El password con SALT es: ${nuevoUsuario.password}`);

    //7. Insertamos en la Database el nuevo usuario.
    
    await nuevoUsuario.save();




  





  //6. Respondemos a la peticion del cliente si todo va bien
  res.status(200).end('Tus datos fueron recibidos y guardados en la DB')

}catch(error){
    console.log(error);
    return res.status(400).json({
        mensaje: 'Nuestros mejores Deps estan trabajando para solucionar el problema'
    })

}

};

const paginaPrueba =  (req, res) => {
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
    };


    module.exports={
        paginaPrincipal,
        paginaError,
        registrarUsuario,
        paginaPrueba
    }