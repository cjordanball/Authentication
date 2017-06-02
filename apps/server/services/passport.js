const passport = require('passport');
const User = require('../models/users');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
	// here we verify the email and password, then call
	// done if it matches known email and password
	// if not, call done with false as the second parameter
	User.findOne({ email: email })
	.then((user) => {
		if (!user) {
			return done(null, false)
		}
		//compare passwords
		user.comparePassword(password, (err, isMatch) => {
			if (err) {
				return done(err);
			}
			if (!isMatch) {
				return done(null, false);
			}
			return done(null, user);
		});
	})
	.catch((err) => done(err));
});

// set up options for JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

// create jwt Strategy
// the payload is the decoded JWToken
// done is a callback we need to call depending on success of auth
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	// check if userID in the payload exists in our database
	// if yes, call done() with the user as a parameter
	// if no, call done without the user object
	User.findById(payload.sub, function(err, user) {
		// handle situation such as communication failure
		if (err) {
			return done(err, false);
		}
		// successful login, move on with user
		if (user) {
			done(null, user);
		} else {
			// auth worked, but user was not authorized
			done(null, false);
		}
	});
});

// tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
