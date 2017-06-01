const mongoose = require('mongoose');
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

// create the model class
const UserClass = mongoose.model('user', UserSchema);

// export the model
module.exports = UserClass;
