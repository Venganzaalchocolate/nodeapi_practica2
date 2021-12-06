// LLamo al módulo de mongoose
const mongoose = require('mongoose');

// definimos un esquema
const articuloSchema = mongoose.Schema({
    // he indexado todos los parámetros menos la foto para que se pueda filtrar de forma más efectiva
    nombre: {type: String, index: true, required: '{PATH} is required!'},
    venta: {type: Boolean, index: true, required: '{PATH} is required!'},
    precio: {type: Number, index: true, required: '{PATH} is required!'},
    foto: {type: String},
    tags: [{type: String, index: true, enum: {
        values: ['work', 'lifestyle', 'motor', 'mobile' ],
        message: '{VALUE} is not supported'
      }}]
});

// muchas no aceptan arrow function CUIDADO
articuloSchema.statics.lista =  (filtro, skip, limit,sort) => {
    const query = Articulo.find(filtro);
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);
    return query.exec();
}

// creamos el modelo
const Articulo = mongoose.model('Articulo', articuloSchema);

// exportamos el modelo (opcional)
module.exports = Articulo;

