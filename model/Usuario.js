// LLamo al módulo de mongoose
const mongoose = require('mongoose');
const nodemailer = require('nodemailer')
const emailTransportConfigure=require('../lib/emailTransportConfigure')
const bcrypt=require('bcrypt');

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

usuarioEsquema.methods.enviarEmail= async function(asunto, cuerpo){
    
    const transport = await emailTransportConfigure();

    // enviar el mail
    const result = await transport.sendMail({
        from: process.env.EMAIL_SERVICE_FROM,
        to: this.email,
        subject: asunto,
        html: cuerpo,
    })

    result.getTestMessengeUrl=nodemailer.getTestMessageUrl(result);

    return result;
}

// creo el modelo
const Usuario = mongoose.model('Usuario', usuarioEsquema);

// exporto el modelo
module.exports = Usuario;