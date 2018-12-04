let express = require('express');
let router = express.Router();
let canais = require('../../python/canais.json');
let hash = require('../../python/streamPath.json');

if(!hash) {
    hash = 'stream';
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'TVGA', canais: canais});
});

for(let grupo in canais) {
  for(let canal in canais[grupo]) {
    router.get('/' + canal , function(req, res, next) {
      res.render('stream', { file: '/' + hash + '/' + canal + '.m3u8', canais: canais, canal: canal });
    });
  }
}

module.exports = router;