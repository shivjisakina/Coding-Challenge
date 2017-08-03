var bcrypt = require('bcryptjs');
var models  = require('../models');
var express = require('express');
var router  = express.Router();

//this is the users_controller.js file
router.get('/new', function(req,res) {
	res.render('users/new');
});

router.get('/sign-in', function(req,res) {
	res.render('users/sign_in');
});

router.get('/sign-out', function(req,res) {
  req.session.destroy(function(err) {
     res.redirect('/people')
  })
});

//if user trys to sign in with the wrong password or email tell them that on the page
router.post('/login', function(req, res) {
  models.User.findOne({
    where: {email: req.body.email}
  }).then(function(user) {

		if (user == null){
		  res.redirect('/users/sign-in')
		}

    bcrypt.compare(req.body.password, user.password_hash, function(err, result) {
        if (result == true){

          req.session.logged_in = true;
          req.session.user_id = user.id;
          req.session.user_email = user.email;

          res.redirect('/people');
        }else{
		      res.redirect('/users/sign-in')
		    }
    });
  })
});

router.post('/create', function(req,res) {
	models.User.findAll({
    where: {email: req.body.email}
  }).then(function(users) {

		if (users.length > 0){
			console.log(users)
			res.send('we already have an email or username for this account')
		}else{

			bcrypt.genSalt(10, function(err, salt) {
					bcrypt.hash(req.body.password, salt, function(err, hash) {
						models.User.create({
							email: req.body.email,
							password_hash: hash
						}).then(function(user){

							req.session.logged_in = true;
							req.session.user_id = user.id;
							req.session.user_email = user.email;

							res.redirect('/people')
						});
					});
			});

		}
	});
});

module.exports = router;
