let express = require('express');
let router = express.Router();
let canais = require('../../python/canais.json');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'TVGA', canais: canais});
});

router.get('/:canal', function(req, res, next) {
  let canal = req.params.canal;
  res.render('stream', { title: 'TVGA > ' + canais[canal]['nome'], file: '/stream/' + canais[canal]['id'] + '.m3u8' });
});

module.exports = router;