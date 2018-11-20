let express = require('express');
let router = express.Router();
let canais = require('../../python/canais.json');

router.get('/:canal', function(req, res, next) {
  let canal = req.params.canal;
  let grupo;
  for(grupo in canais) {if(canal.toLowerCase().includes(grupo)) break;}
  
  res.download(__dirname + '/streams/' + grupo + '/' + canal, canal + '.m3u8');
});

module.exports = router;