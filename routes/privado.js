const express= require('express');
const router= express.Router();

//GET

router.get('/', (req, res, next)=>{
    res.render('privado');
});

module.exports = router;