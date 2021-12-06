// LLamo al módulo de mongoose
const mongoose = require('mongoose');

// si hay un error en la conexión de la BBDD me enseñará el error y parará el proceso
mongoose.connection.on('error', err => {
    console.log('Error de conexión', err);
    process.exit(1);
});

// La primera vez que se conecte me pondrá a que base de datos se ha conectado
mongoose.connection.once('open', () => {
    console.log('Conectado a MongoDB a la BD:', mongoose.connection.name);
});

// Me conecto a la BD
mongoose.connect(process.env.MONGODB_CONNECTION, {});

// opcional
module.exports = mongoose.connection

