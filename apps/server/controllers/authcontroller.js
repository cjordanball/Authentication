const User = require('../models/users');
const jwt = require('jwt-simple');
const mongoose = require('mongoose');
const config = require('../config');
mongoose.Promises = global.Promises;

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp, favpart: 'butt' }, config.secret);
}

exports.signin = function (req, res, next) {
	res.status(200).json({
		token: tokenForUser(req.user)
	})
}

exports.signup = function(req, res, next) {
	if (!req.body.email || !req.body.password) {
		res.status(422).send({ error: 'Must submit a username and password!' });
	}
	const email = req.body.email;
	const password = req.body.password;
	if (email !== email.toLowerCase()) {
		res.status(422)
			.send({ error: 'userName must be all lowercase' }
		);
	}

	// see if a user with given email exists
	User.findOne({ email: email })
	// if such a user exists, return an Error
		.then((user) => {
			if (user) {
				return res.status(422).send({ error: 'User already exists.' });
			}

			// if a user does not exist, create and save user record
			const newUser = new User({ email, password })
			newUser.save()
				.then(() => {
					// respond to request indicating the user was created
					res.status(200)
					.json({ token: tokenForUser(newUser) });
				})
				.catch( (err) => { return next(err)});
		});



}
