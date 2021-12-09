// modulo que devuelve un midelware
const jwt= require('jsonwebtoken')

module.exports=(req,res, next)=>{
    // recoge el token d ela cabecera u otros sitios
    const jwtToken= req.get('Authorization') || req.query.token || req.body.token;
    // comprobar si hay token
    if(!jwtToken){
        const error = new Error('Not Found Token')
        error.status=401;
        next(error);
        return
    }

    // comprobar si es válido
    jwt.verify(jwtToken, process.env.JWT_SECRET, 
        (err, payload)=>{
            if(err){
                err.message=('invalid token')
                err.status=401;
                next(err);
                return;
            }
        req.apiUserId=payload._id;
        // si es válido llamar a next
        next();


        })
    
}