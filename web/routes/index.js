let express = require('express');
let router = express.Router();
let MobileDetect = require('mobile-detect');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let canais = require('../../python/canais.json');
let hash = require('../../python/streamPath.json');
let User = require('../models/user');


if(!hash) {
    hash = 'stream';
}

router.get('/', function(req, res, next) {
  res.render('index', { canais: canais, messages: null, msg_type: null });
});

for(let grupo in canais) {
  for(let canal in canais[grupo]) {
    router.get('/' + canal , function(req, res, next) {
      let md = new MobileDetect(req.headers['user-agent']);

      let mobile = false;
      if(md.mobile() != null || md.phone() != null || md.tablet() != null) {
        mobile = true;
      }

      res.render('stream', { file: '/' + hash + '/' + canal + '.m3u8', canais: canais, canal: canal, mobile: mobile });
    });
  }
}

router.post('/registar', function(req, res, next) {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let repeatPassword = req.body.repeatPassword;
  let referralCode = req.body.referralCode;

  //Validation
  req.checkBody('username', 'Nome de Utilizador é obrigatório').notEmpty();
  req.checkBody('email', 'Email é obrigatório').notEmpty();
  req.checkBody('email', 'Email inválido').isEmail();
  req.checkBody('password', 'Palavra-chave é obrigatória').notEmpty();
  req.checkBody('repeatPassword', 'As palavras-chave não coincidem').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors) {
    res.render('index', { canais: canais, messages: errors, msg_type: 'Erro' });
  } else {
		User.findOne({ username: { "$regex": "^" + username + "\\b", "$options": "i" }}, function (err, user) {
      User.findOne({ email: { "$regex": "^" + email + "\\b", "$options": "i" }}, function (err, mail) {
        if(user || mail) {
          let taken = [];
          if(user) {
            taken[0] = {'msg': 'Nome de Utilizador já utilizado'};
          }
          if(mail) {
            taken[1] = {'msg': 'Email já utilizado'};
          }

          res.render('index', { canais: canais, messages: taken, msg_type: 'Erro' });
        } else {
          let date = new Date();

          ref_code = username.replace(' ', '').substring(0, 3) + date.getDate() + date.getMonth();

          let newUser = new User({
            username: username,
            email: email,
            password: password,
            ref_code: ref_code,
            ref_by: referralCode
          });

          User.createUser(newUser, function (err, user) {
            if (err) throw err;
            console.log(user);
          });
          let success = [{'msg': 'Obrigado pelo seu registo'}];
          res.render('index', { canais: canais, messages: success, msg_type: 'Sucesso' });
        }
      });
    });
  }
});

passport.use(new LocalStrategy(function (username, password, done) {
  User.getUserByUsername(username, function (err, user) {
    if (err) throw err;
    if (!user) {
      return done(null, false, { message: 'Utilizador desconhecido' });
    }

    User.comparePassword(password, user.password, function (err, isMatch) {
      if (err) throw err;
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Palavra-chave inválida' });
      }
    });
  });
}));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.getUserById(id, function (err, user) {
		done(err, user);
	});
});

router.post('/entrar', passport.authenticate('local', { successRedirect: '/', failWithError: true }), function (err, req, res, next) {
		res.send(err);
});

router.get('/sair', function (req, res, next) {
  req.logout();

	res.redirect('/');
});

module.exports = router;