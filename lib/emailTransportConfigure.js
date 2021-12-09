const nodemailer = require('nodemailer')

module.exports=async function(){
    //desarrollo
    const testAccount = await nodemailer.createTestAccount();

    const developTransport= {
    host: 'smtp.ethereal.email',
    port:587,
    secure: false,
    auth: {
        user:testAccount.user,
        pass: testAccount.pass,
    }
}

    const productionTransport = {
        service: process.env.EMAIL_SERVICE_NAME,
        auth: {
            user: process.env.EMAIL_SERVICE_USER,
            pass: process.env.EMAIL_SERVICE_PASS
        }
        
    }

    // funcion para seleccionar que transporte de forma automática dependiento si estas en desarrollo o no 
    /*
    const activeTranpost = process.env.NODE_ENV==='development' ?
        developTransport :
        productionTransport

    const transport = nodemailer.createTransport(activeTranpost)
    */
    const transport = nodemailer.createTransport(developTransport)

    return transport
}
