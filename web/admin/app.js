let express = require('express');
let app = express();
let path = require('path');

let indexRouter = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);

module.exports = app;