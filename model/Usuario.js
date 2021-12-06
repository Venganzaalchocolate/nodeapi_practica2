// LLamo al módulo de mongoose
const mongoose = require('mongoose');
const bcrypt=require('bcrypt')

// esquema del usuario
const usuarioEsquema=mongoose.Schema({
    email: {type:String, unique:true},
    password: String
})

usuarioEsquema.statics.hashPassword= function(passwordEnClaro){
    return bcrypt.hash(passwordEnClaro, 7);
}

usuarioEsquema.methods.compara = function(passwordEnClaro){
    return bcrypt.compare(passwordEnClaro, this.password);
}

// creo el modelo
const Usuario = mongoose.model('Usuario', usuarioEsquema);

// exporto el modelo
module.exports = Usuario;