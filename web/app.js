// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const subdomain = require('express-subdomain');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const constants = require('constants');
const helmet = require('helmet')
let path = require('path');
let cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
let logger = require('morgan');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tvga', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
var db = mongoose.connection;

let indexRouter = require('./routes/index');
let adminApp = require('./admin/app');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

        while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
        }
        return {
        param : formParam,
        msg   : msg,
        value : value
        };
    }
}));

// Global Vars
app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});

app.use(subdomain('admin', adminApp));
app.use('/', indexRouter);

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/tvga.ml/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/tvga.ml/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/tvga.ml/chain.pem', 'utf8');
const dhparam =  fs.readFileSync("/etc/letsencrypt/archive/tvga.ml/dh4096.pem");

const credentials = {
    secureOptions: constants.SSL_OP_NO_SSLv3 | constants.SSL_OP_NO_SSLv2,
	key: privateKey,
	cert: certificate,
    ca: ca,
    dhparam: dhparam
};

app.use(helmet.hsts({
    maxAge: 31536000000,
    includeSubdomains: true,
    force: true
}));

app.use('/', indexRouter);

// Starting both http & https servers
// const httpServer = http.createServer(function (req, res) {
//     res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
//     res.end();
// });
const httpsServer = https.createServer(credentials, app);

// httpServer.listen(80, () => {
// 	console.log('HTTP Server running on port 80');
// });

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});