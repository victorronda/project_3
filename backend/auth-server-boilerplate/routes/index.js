// Necesario index con un render? (Lo veo en todos los proyectos, pero no entiendo para qué)

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Project 3 - MGBite' });
});

module.exports = router;