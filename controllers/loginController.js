const {Usuario} = require('../model');
const jwt = require('jsonwebtoken')


class LoginController {

    index(req,res,next) {
        res.locals.error=''
        res.render('login')
    }


    async post(req,res,next){
        try {
            const {email,password} = req.body;

            // buscar el usuario en la BD
            const usuario = await Usuario.findOne({email:email});

            //credenciales erroneas o inexistentes
            if (!usuario || !(await usuario.compara(password))) {
                res.locals.error=res.__('Invalid Credentials')
                res.render('login')
                return
            }

            // credenciales correctas
            // reedirigir a una zona privada
            // decir quién se ha autenticado
            req.session.usuarioLogado = {
                _id: usuario._id
            }

            // envia un mail al hacer login
            const result = await usuario.enviarEmail('Login', 'Bienvenido a NodeApi')
            console.log('Mensaje Enviado:', result.messageId)
            console.log('Mensaje:', result.getTestMessengeUrl)

            res.redirect('/privado');
            
        } catch (err) {
            next(err);
        }
        
    }

    // cerrar sesion
    logout(req,res,next) {
        req.session.regenerate(err=>{
            if(err){
                next (err);
                return;
            }
            res.redirect('/');
        })
    }

    // login del API POST
    async postJWT(req,res,next){
        try {
            const {email,password}=req.body;
            // buscar el usuario en la BD
            const usuario = await Usuario.findOne({email:email});

            //credenciales erroneas o inexistentes
            if (!usuario || !(await usuario.compara(password))) {
                res.locals.error=res.__('Invalid Credentials')
                res.json({error: 'Invalid Credentials'})
                return
            }

            // si el usuario existe y valida la contraseña
            // crear un JTW con el _id del usuario
            jwt.sign({_id:usuario._id}, process.env.JWT_SECRET, {expiresIn: '2h'}, 
            (err,jwtToken) => {
                if (err) {
                    next();
                    return;
                }

                // si no hay error se devuelve el token generado
                res.json({token:jwtToken})
            })


        } catch (error) {
            next()
        }
    }

}

module.exports=LoginController;