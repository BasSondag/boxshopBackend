const user = require('../controllers/users.controller.js');
const router = require('express').Router();

router.route('/')
    .get(function (req, res) {
        user.index(req, res);
    })
    .post(function(req, res) {
        user.create(req, res);
    });

router.route('/:id')
    .put(function(req, res) {
        user.update(req, res);
    })
    .delete(function (req,res) {
        user.destroy(req,res);
    })
    .get(function(req, res) {
        user.show(req, res);
    });

module.exports = router;