var express = require('express');
var router = express.Router();

//lista que se manda a la vista desde el servidor
const game_list = ["Ajedrez","Damas","Parchís","Oca","Mus","Póker","Domino","Go"];

//usuario de prueba para el login
const test_user = { username: "admin", password: "1234" };

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ejercicio 5', games: game_list });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login', error: null });
});

//si coincide vuelve a la principal, si no se vuelve a pintar el login con el error
router.post('/login', function(req, res, next) {
  if (req.body.username === test_user.username && req.body.password === test_user.password) {
    res.redirect('/');
  } else {
    res.render('login', { title: 'Login', error: "Usuario o contraseña incorrectos" });
  }
});

module.exports = router;
