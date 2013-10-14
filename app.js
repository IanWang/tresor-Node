
var express    = require('express')
  , router     = require('./routes/router')
  , action     = require('./routes/action')
  , newProduct = require('./routes/newProduct')
  , http       = require('http')
  , path       = require('path');

var app     = express();
var config  = require('./config/index'),
    apiUrl  = config.apiUrl,
    landing = config.login,
    ip      = config.ip,
    env     = config.env;

// all environments
app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.cookieParser('Secret-of-tresor-Login'));
	app.use(express.cookieSession());
	app.use(express.methodOverride());
	app.use(app.router);

	app.all('*',function(req, res, next) {
		var faq = "http://tresor.tw/faq/";
		if(req.session.user && req.session.key) {
			var isAuth = true;
		} else {
			var isAuth = false;
		}
		/*
			if(req.headers['referer'] === 'https://www.facebook.com/') {
				console.log('qqwqwqwqw');	
			}
		*/
		if(isAuth || req.path === faq || req.path === '/token_register'){
			next();
		} else {
			res.redirect(landing);
		}
	});

});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
	app.use(express.responseTime());
	app.use(express.logger('dev'));
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('production', function(){
	app.use(express.errorHandler()); 
	app.use(express.responseTime());
});

app.get('/'               , router.index);
app.get('/allProduct'     , router.allProduct);
app.get('/userProduct'    , router.userProduct);
app.get('/create'         , router.create);
app.get('/user'           , router.user);
app.get('/product/:id'    , router.product);
app.get('/token_register' , router.getToken);
app.get('/log_out'        , router.logout);
app.post('/feedback'      , router.feedback);

app.get('/action'             , action.transaction);
app.get('/product/:id/delete' , action.delProduct);

app.post('/create' , newProduct.createNew);
app.post('/upload' , newProduct.uploadImg);


http.createServer(app).listen(3000, ip);
console.log('[' + env +'] tresor is on port ' + app.get('port'));
console.log('apiUrl:', apiUrl);
console.log('IP:', ip);
