//En este archivo utilizamos la modularizacion de los archivos
//LIbrerias
const express = require('express');
require('dotenv').config();
require('./conexion/conecction');
const PORT = process.env.PORT || 8080;
const userRoutes = require('./routes/userRoutes');


const app = express();

//middelwzres
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Rutas
app.use('/', userRoutes);


//escucha del puerto
app.listen(PORT, ()=>{
    console.log(`Servidor modularizado corriendo en el puerto ${PORT}`);
})

































