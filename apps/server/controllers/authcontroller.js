const User = require('../models/users');
const mongoose = require('mongoose');
mongoose.Promises = global.Promises;

exports.signup = function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;
	if (email !== email.toLowerCase()) {
		res.send({
			ok: false,
			message: 'userName must be all lowercase'
		});
	}

	// see if a user with given email exists
	User.findOne({ email: email })
		.then((user) => {
			if (user) {
				res.status(422)
				.send({
					ok: false,
					message: 'User already exists.'
				})
			} else {
				newUser = new User({ email, password })
				newUser.save()
					.then(() => {
						res.status(200)
						.send({
							ok: true,
							message: 'User saved.'
						})
					});
			}
		});

	// if such a user exists, return an Error

	// if a user does not exist, create and save user record

	// respond to request indicating the user was created
}
