
//load dynamic configuration for the whole system
var nconf = require('nconf');

// get the argv stuff such as --env 
nconf.argv()

// setup the node env (development is the default)
if (!process.env.NODE_ENV)
    process.env.NODE_ENV = (nconf.get('env')!==undefined)?nconf.get('env'):'development';
nconf.env()

exports.env = env = nconf.get('NODE_ENV');
exports.port = nconf.get('port');

/*
start application log and error handler  
*/
var winston = require('winston');

if (env == 'development'){
    var logger = winston;
}
else if (env=='production'){
    var logpath = require('./config.js')[env].logs.path;

    var logger = new (winston.Logger)({
        exitOnError: false,
        handleExceptions: true,
        transports: [
            new winston.transports.File({ filename: logpath+'/system.log' })
        ],
        exceptionHandlers: [
            new winston.transports.File({ filename: logpath+'/expections.log' })
        ]
    });

}
exports.logger = logger;

/*
start application log and error handler  
*/
if (env == 'production')
    exports.privacy = true;
else 
    exports.privacy = false;
/*
get Api url
*/
 u = require('./config.js')[env].api;
 y = require('./config.js')[env].action;
 exports.apiUrl = u.protocol+'://'+u.host+u.port;
 exports.ip = u.ip;
 exports.logout = y.logout;
 exports.login = y.login;
