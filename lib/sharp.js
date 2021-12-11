const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const fs=require('fs')

//sharp
const redimensionarImagen = async (imagen) => {
    const nombreImagen=uuidv4()
    fs.writeFileSync(`./public/assets/${nombreImagen}.jpg`, imagen.buffer)
    const imagenProcesada= sharp(imagen.buffer)
    const imagenRedimensionada= imagenProcesada.resize(50,50, {
        fit: 'cover' 
}).jpeg()
    const imagenRedimensionadaBuffer= await imagenRedimensionada.toBuffer()
    fs.writeFileSync(`./public/assets/miniatura_${nombreImagen}.jpg`, imagenRedimensionadaBuffer)
    return nombreImagen
}

module.exports=redimensionarImagen
