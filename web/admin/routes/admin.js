let express = require('express');
let router = express.Router();

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

router.get('/', function(req, res) {
    res.render('index');
});

module.exports = router;