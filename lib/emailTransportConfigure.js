const nodemailer = require('nodemailer')

module.exports=async function(){
    //desarrollo
    const testAccount = await nodemailer.createTestAccount();

    const develop= {
    host: 'smtp.ethereal.email',
    port:587,
    secure: false,
    auth: {
        user:testAccount.user,
        pass: testAccount.pass,
    }
}

    const production = {
        service: process.env.EMAIL_SERVICE_NAME,
        auth: {
            user: process.env.EMAIL_SERVICE_USER,
            pass: process.env.EMAIL_SERVICE_PASS
        }
        
    }

    const transport = nodemailer.createTransport(process.env.EMAIL_ENVIRONMENT)

    return transport
}
