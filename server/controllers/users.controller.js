var models = require('../models/index');
var Sequelize = require('sequelize');

module.exports = (function() {
	return {
        index: function(req, res) {
			try {
				models.User.findAll()
					.then(users => {
						res.json({users: users});
					})
					.catch(err => {
						res.status(400).send({err: err.message});
					})
				}
				catch(err) {
					res.status(500).json({err: err.message});
				}
		},

		show: (req, res) => {
			try {
				const{ id } = req.params;
				models.User.findOne({
					where: {id: id}
				})
					.then(user => {
						res.json({user: user});
					})
					.catch(err => {
						res.status(400).json({err: err.message});
					}) 
			}
			catch(err) {
				res.status(500).json({err: err.message});
			}
		},
		
		create: (req, res) => {
			try {
				models.User.create({
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					email: req.body.email,
					password: req.body.password,
					admin: false
				}).then((user) => {
					return res.json({user:user});
				}).catch((err) => {
					return res.status(400).json({err: err.message.split('\n')});
				})
			}
			catch(err) {
				return res.status(500).json({err: err.message});
			}
		},

		update: (req, res) => {
			try{
				const{ id } = req.params;
				models.User.update(
					req.body,
					{where:{id: id}}
				)
				.then( user => {
					console.log
					res.json({user: user});
				})
				.catch(function(err) {
					return res.status(400).json({err:err.message});
				})
			}
			catch(err) {
				return res.status(500).json(err);
			}
		},

		destroy: (req,res) => {
			try {
				const { id } = req.params;
				models.User.destroy({
					where : {id: id}
				})
				.then(deleted => {
					console.log(deleted);
					return res.status(204).json('user deleted');
				})
				.catch((err) => {
					return res.status(400).json({err: err.message});
				});
			}
			catch(err) {
				return res.status(500).json(err);
			}
		}				
	}
})();