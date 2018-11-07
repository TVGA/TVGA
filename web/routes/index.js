let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'TVGA'});
});

router.get('/sporttv1', function(req, res, next) {
  res.render('stream', { title: 'TVGA > SPORT TV 1', file: '/stream/sporttv1.m3u8', poster: 'https://i0.wp.com/gigatuga.net/wp-content/uploads/2017/09/spottv-1HD.png?fit=800%2C450'});
});

router.get('/elevensports1', function(req, res, next) {
  res.render('stream', { title: 'TVGA > ELEVEN SPORTS 1', file: '/stream/elevensports1.m3u8', poster: 'https://video.toggle.sg/image/9077680/16x9/947/533/753c9d2d171ad7915880e607c324fb0c/LT/eleven-sports-1.png'});
});

// router.get('/benficatv', function(req, res, next) {
//   res.render('stream', { title: 'TVGA > BENFICA TV', file: '/stream/benficatv.m3u8', poster: 'https://www.atelevisao.com/wp-content/uploads/2017/08/benfica-tv.jpg'});
// });

router.get('/tvcine1', function(req, res, next) {
  res.render('stream', { title: 'TVGA > TVCINE 1', file: '/stream/tvcine1.m3u8', poster: 'https://vignette.wikia.nocookie.net/logopedia/images/a/a7/TVC1_2012.png/revision/latest?cb=20140404133828'});
});

module.exports = router;