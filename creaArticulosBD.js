require('dotenv').config();

// conexión a la base de datos
const dbconexion=require('./lib/connectMongoose')

// importamos el modelo de articulo y usuario
const {Articulo, Usuario}= require('./model')

// json de muestra de articulos
const articuloEjemplo = require('./lib/ejemplo.json')

main().catch(err=>console.log('Hubo un error', err))

async function main(){
  // inicio la colección de artículos
  await initArticulos();

  // incio la colección de usurio
  await initUsuario();

  dbconexion.close();
}

async function initArticulos(){
  //elimino todos los documentos de la colección de articulos
  const borrar = await Articulo.deleteMany();
  console.log(borrar);

  //mostramos en la consola lo borrado
  console.log(`Eliminados ${borrar.deletedCount} articulos`)

  // crear articulos iniciales
  const x = await Articulo.insertMany(articuloEjemplo.articulos);
  console.log(`Creados ${x.length} articulos`)

}

async function initUsuario(){
  //elimino todos los documentos de la colección de usuarios
  const borrar = await Usuario.deleteMany();
  console.log(borrar);

  //mostramos en la consola lo borrado
  console.log(`Eliminados ${borrar.deletedCount} usuarios`)

  // crear usuario inicial
  const x = await Usuario.insertMany([
    {
      "email": "user@example.com",
      "password":  await Usuario.hashPassword('1234')
    }
  ]);
  console.log(`Creados ${x.length} usuarios`)

}









