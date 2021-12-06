const express= require('express');
const router= express.Router();

//GET

router.get('/:locale', (req, res, next)=>{
    // recogemos el idioma seleccionado
    const locale=req.params.locale;
    // cookie con el idioma
    res.cookie('cookie-idioma', locale, {
        maxAge: 1000 * 60 * 60 * 24 * 30 // duración un mes 
    });
    // reedireccionamos a la misma página donde se encuentra el usuario
    res.redirect(req.get('referer'));

});

module.exports = router;