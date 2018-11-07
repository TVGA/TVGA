let express = require('express');
let app = express();
let path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('admin');
});

module.exports = app;