let express = require('express');
let app = express();

app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res) {
    res.render('admin');
});

module.exports = app;