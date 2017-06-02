const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
mongoose.Promises = global.Promises;

// Define the user schema
const UserSchema = new Schema(
	{
		email: {
			type: String,
			required: [true, 'Please enter username.'],
			lowercase: true,
		},
		password: {
			type: String,
			required: [true, 'Please enter password.']
		}
	}
);

// on save, encrypt password
UserSchema.pre('save', function(next) {
	console.log('hashing');
	console.log('this', this);
	// const user = this;

	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
		}
		console.log('genSalt')
		bcrypt.hash(this.password, salt, null, (err, hash) => {
			if (err) {
				return next(err);
			}
			console.log('hash', hash);
			this.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) {
			return callback(err);
		}
		callback(null, isMatch);
	});
}



// create the model class
const UserClass = mongoose.model('user', UserSchema);

// export the model
module.exports = UserClass;
