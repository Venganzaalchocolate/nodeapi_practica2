'use strict';
const multer = require('multer');

const memoria = multer.memoryStorage()
const upload = multer({storage: memoria})

module.exports= {upload}



// const { v4: uuidv4 } = require('uuid');
// const path = require('path');
// const { memoryStorage } = require('multer');

// const storage = multer.diskStorage({
//     storage: multer.memoryStorage(),
//     filename: (req, file, cb) => {
//         cb(null, uuidv4() + path.extname(file.originalname))
//     }
// });
// const filefilter = (req, file, cb) => {
//     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' 
//         || file.mimetype === 'image/jpeg'){
//             cb(null, true);
//         }else {
//             cb(null, false);
//         }
// }

// const upload = multer({storage: storage, fileFilter: filefilter});

// module.exports = {upload}