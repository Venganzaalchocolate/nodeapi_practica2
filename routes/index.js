var express = require('express');
var router = express.Router();
const Articulo = require('../model/Articulo');

// Devuelve una lista de articulos
router.get('/', async (req, res, next) => {
  // con try y except gestionamos el posible error que pueda salir
  try{
    const articulos = await Articulo.find();
    res.render('index', { articulos });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
