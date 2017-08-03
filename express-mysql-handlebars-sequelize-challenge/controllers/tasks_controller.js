var models = require('../models');
var express = require('express');
var router = express.Router();

router.post('/:person_id/tasks/create', function (req, res) {
    models.Task.create({
        task: req.body.task,
        person_id: req.params.person_id
    }).then(function () {
        res.redirect('/');
    });

});

router.post('/:person_id/tasks/delete', function (req, res) {

    models.Task.destroy({
        where: {person_id: 1}
    }).then(function () {
        console.log("deleted " + req.body.task)
        res.redirect('/');
    })
});

module.exports = router;
