let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'TVGA'});
});

router.get('/sporttv1', function(req, res, next) {
  res.render('stream', { title: 'TVGA > SPORT TV 1', file: '/stream/sporttv1.m3u8', poster: 'https://i0.wp.com/gigatuga.net/wp-content/uploads/2017/09/spottv-1HD.png?fit=800%2C450'});
});

module.exports = router;