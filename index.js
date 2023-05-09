//En este archivo utilizamos la modularizacion de los archivos
//LIbrerias
const express = require('express');
require('dotenv').config();
require('./conexion/conecction');
const PORT = process.env.PORT || 8080;
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const app = express();
const hbs = require('hbs');
const path = require('path');


//middelwzres
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Configuracion de handlebars
app.set('views engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));


//Rutas
app.use('/', userRoutes);
app.use('/productos', productRoutes);

//escucha del puerto
app.listen(PORT, ()=>{
    console.log(`Servidor modularizado corriendo en el puerto ${PORT}`);
})





































