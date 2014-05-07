
// Module
var express        = require('express'),
    http           = require('http'),
    path           = require('path'),
    favicon        = require('static-favicon'),
    morgan         = require('morgan'),
    cookieParser   = require('cookie-parser'),
    bodyParser     = require('body-parser'),
    session        = require('express-session'),
    //session      = require('cookie-session'),
    methodOverride = require('method-override');

// Routing
var routes     = require('./routes/index'),
    action     = require('./routes/action'),
    newProduct = require('./routes/newProduct');

var app         = express();
var memoryStore = session.MemoryStore;


app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(morgan('dev'));           
app.use(cookieParser('secret-of-tresor'));
app.use(bodyParser());
app.use(methodOverride());      
app.use(session({ 
  key: 'secret-of-tresor',
  cookie: { httpOnly: true, secure: true },
  store: new memoryStore()
}));
app.use(express.static(path.join(__dirname + '/public')));   

var env = process.env.NODE_ENV || 'development';

if( env === 'development') {
  app.use(function(req, res, next) {
    console.log('auth');
    next();
  });
};


app.use('/', routes);
/*
app.get('/'               , router.index);
app.get('/allProduct'     , router.allProduct);
app.get('/userProduct'    , router.userProduct);
app.get('/create'         , router.create);
app.get('/user'           , router.user);
app.get('/product/:id'    , router.product);
app.get('/token_register' , router.getToken);
app.get('/log_out'        , router.logout);
app.post('/feedback'      , router.feedback);
app.get('/advanceInfo'    , router.advance);

app.get('/action'             , action.transaction);
app.get('/product/:id/delete' , action.delProduct);

app.post('/create' , newProduct.createNew);
app.post('/upload' , newProduct.uploadImg);
*/

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {

  var error = (app.get('env') === 'development') ?
    err : {};
    // development error handler
    // will print stacktrace
        // production error handler
        // no stacktraces leaked to user

  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });

});

module.exports = app;

