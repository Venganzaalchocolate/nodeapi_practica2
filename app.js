const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const utils =require('./lib/utils')
const session = require('express-session')
const LoginController=require('./controllers/loginController');
const sessionAuth= require('./lib/sesionesControl')
const MongoStore= require('connect-mongo');

const app = express();

// conectamos a la base de datos
require('./lib/connectMongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.engine('html', require('ejs').__express);

app.locals.title='NodeApi';


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





// rutas de mi API
app.use('/api/articulos',   require('./routes/api/articulos'));

//inicio de i18n 
const i18n=require('./lib/i18n')
app.use(i18n.init);

// Setup de sesiones del Website
app.use(session({
  name: 'nodeapi-session',
  secret: 'BRzbyO*80tLPqiA2^gZatzR7^@BT',
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 2 // dos días sin entrar en el servicio 
  },
  store: MongoStore.create({mongoUrl: process.env.MONGODB_CONNECTION})
}))

// sesiones accesible a vistas
app.use((req,res,next)=> {
  res.locals.session=req.session;
  next();
});

// variables globales de las vistas
app.locals.title = 'NodeAPI';

const loginController = new LoginController();

// rutas de mi webside
app.use('/', require('./routes/index'));
app.use('/prueba', require('./routes/prueba'));
app.use('/privado', sessionAuth, require('./routes/privado'));
app.use('/cambio-idioma', require('./routes/cambio-idioma'));
app.use('/users', require('./routes/users'));


// se usa un controlador
app.get('/login', loginController.index);
app.post('/login', loginController.post);
app.get('/logout', loginController.logout);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  if (utils.esAPI(req)) {
    res.status(err.status || 500),
    res.json({error:err.message})
    return
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
