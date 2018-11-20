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
let logger = require('morgan');

let indexRouter = require('./routes/index');
let streamRouter = require('./routes/stream');
let adminApp = require('./admin/app')

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(subdomain('admin', adminApp));
app.use('/', indexRouter);
app.use('/stream', streamRouter);

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