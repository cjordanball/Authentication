const Authentication = require('./controllers/authController');

module.exports = function(app) {
	app.post('/signup', Authentication.signup);
}
