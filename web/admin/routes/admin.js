let express = require('express');
let app = express();

app.get('/', function(req, res) {
    res.send('admin');
});

module.exports = app;