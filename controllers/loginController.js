const {Usuario} = require('../model');

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
}

module.exports=LoginController;