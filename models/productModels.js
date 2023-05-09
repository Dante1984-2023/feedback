const mongoose = require('mongoose');
const { Schema } = require('mongoose');

//configuramos con Schema nuestra coleccion de DB
const productSchema = new Schema({
    nombre: {
        type: String,
        require: true,
    },
    precio:{
        type:Number,
        require: true
    },
    stock:{
        type: Number,
        require: true
    },
    timestamp:{
        type: Date,
        default: new Date(),  //Fecha de dato insertado
    }
});

//exportamos la configuracion con el nombre de la coleccion

module.exports = mongoose.model('Producto', productSchema);

