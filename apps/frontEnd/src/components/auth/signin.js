import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class SignInPage extends Component {
	renderField(field) {
		return (
			<fieldset className="form-group">
				<label htmlFor={field.name}>{field.label}</label>
				<input
					className="form-control"
					type="text"
					{...field.input}
				/>
			</fieldset>
		);
	}

	onSubmit({ email, password }) {
		console.log(email, password);
		//Need to do sometbing to log in;
	}
	render() {
		const { handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit((values) => this.onSubmit(values))}>
				<Field
					label="Email"
					name="email"
					component={this.renderField}
				/>
				<Field
					label="password"
					name="password"
					component={this.renderField}
				/>
				<button type="submit" className="btn btn-primary">Sign in</button>
			</form>
		);
	}
}

export default reduxForm({
	form: 'SignInForm',
	fields: ['email', 'password']
})(SignInPage);
