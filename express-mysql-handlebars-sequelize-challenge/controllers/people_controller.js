var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  models.Person.findAll({
    include: [ models.Task ]
  }).then(function(people) {
    res.render('people/index', {
      user_id: req.session.user_id,
      email: req.session.user_email,
      logged_in: req.session.logged_in,
      people: people
    });
  });
});

router.post('/create', function(req, res) {
    models.Person.create({
        name: req.body.name
    }).then(function() {
        res.redirect('/');
    });
});

router.post('/delete', function(req, res) {
    models.Person.destroy({
        where: {id: 1}
    }).then(function () {
        console.log("deleted " + req.body.name)
        res.redirect('/');
    })
});

module.exports = router;
