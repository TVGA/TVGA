let express = require('express');
let router = express.Router();
let canais = require('../../python/canais.json');
let hash = require('../../python/hash.json');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'TVGA', canais: canais});
});

router.get('/:canal', function(req, res, next) {
  let canal = req.params.canal;
  let grupo;
  for(grupo in canais) {if(canal.toLowerCase().includes(grupo)) break;}
  
  res.render('stream', { title: 'TVGA > ' + canais[grupo][canal]['nome'], file: '/stream/' + canal + '.m3u8' });
});

module.exports = router;