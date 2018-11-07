let express = require('express');
let router = express.Router();

router.get('/', function(req, res) {
    res.render('admin', {title: 'TVGA > ADMIN'});
});

module.exports = router;