'use strict';
const utils =require('../../lib/utils')

const express = require('express');
const { noHay } = require('../../lib/utils');
const router = express.Router();
const Articulo = require('../../model/Articulo');


// Devuelve una lista de tags existentes
router.get('/tags', async (req, res, next)=> {
    try {
        const articulo = await Articulo.find()
        let listaTags=[]
        articulo.forEach(x=>{x.tags.forEach(y=>{if (!listaTags.includes(y)) {listaTags.push(y)}})})
        res.json({listaTags})   
    } catch (err) {
        next(err);
    }
    
}) 

// /api/articulos
// Devuelve una lista de articulos
// linea 15 de Articulo.js, método static
router.get('/', async (req, res, next) => {
    // con try y except gestionamos el posible error que pueda salir
    try{
        let nombre = req.query.nombre;
        const precio = req.query.precio;
        const tags = req.query.tags;


        const filtro = {};

        // skip = muestrame el resultado a partir de x
        const skip = parseInt(req.query.skip);

        // limit = muestrame x resultados
        const limit = parseInt(req.query.limit);
        
        // ordename los resultados
        const sort=req.query.sort;


        if(nombre){
            nombre = new RegExp (`^${req.query.nombre}`, 'i');
            filtro.nombre=nombre;
        }

        if(precio) {
            const mayorQue = precio.slice(-1) 
            const menorQue = precio.slice(0,1)
            const entre=precio.split('-')

            if (mayorQue==='-')
            {   let x=precio.substr(0, precio.length - 1);
                filtro.precio ={$gte:`${x}`};}
                
            else if (menorQue==='-')
            {   let y=precio.slice(1);
                filtro.precio ={$lt:`${y}`};}

            else if (Math.sign(precio))
            {filtro.precio = precio;}
            
            else if (entre[0]!=='' && entre[1]!=='')
            {filtro.precio ={$gte:`${entre[0]}`, $lt:`${entre[1]}`};}
        }

        

        if(tags){
            filtro.tags=tags;
        }
        console.log(filtro)
        // linea 15 de Articulo.js, método static
        const articulos = await Articulo.lista(filtro,skip, limit, sort);
        res.json({ articulos });
    } catch (err) {
        next(err);
    }
});

// obtener un articulo por id
router.get('/:identificador', async (req, res, next)=> {
    try {
    const _id = req.params.identificador;
    

    const articulo = await Articulo.find({_id: _id})
    res.json({articulo})   
    } catch (err) {
        next(err);
    }
}) 

//Crear un articulo POSTMAN:(post > body > x-www)
router.post('/', async (req, res, next) => {
    try {
        const articuloData = req.body;
        const articulo = new Articulo(articuloData);
        const articuloCreado = await articulo.save();

        res.status(201).json({result: articuloCreado});

    } catch (err) {
        next(err);
    }
})

// Eliminar un articulo POSTMAN:(delete)
router.delete('/:id', async (req, res, next) => {
    try {
        const identificador= req.params.id;
        await Articulo.deleteOne({ _id:identificador})
        res.json();

    } catch (err) {
        next(err);
    }
})

// Modificar un articulo POSTMAN:(put>body(¿el que?)>x-www)
router.put('/:id', async (req, res, next) => {
    try {
        const identificador= req.params.id;
        const articuloData = req.body;
        // findOneAndUpdate devuelve el articulo antes de actualizarlo
        const articuloActualizado = await Articulo.findOneAndUpdate({_id:identificador}, articuloData, {
            // options
            new:true // para que me devuelva el articulo después de actualizarlo
        })
        utils.noHay(articuloActualizado);
        res.json({result:articuloActualizado});

    } catch (err) {
        next(err);
    }
})



module.exports = router;
