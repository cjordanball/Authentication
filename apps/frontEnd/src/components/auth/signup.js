import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SignUpPage extends Component {

	onFormSubmit({ email, password }) {
		this.props.signUpUser({ email, password }, this.props.history);
	}

	renderField(field) {
		return (
			<fieldset className="form-group">
				<label htmlFor={field.name}>{field.label}</label>
				<input
					className="form-control"
					type={field.type}
					{...field.input}
				/>
			{field.meta.touched && field.meta.error && !field.meta.active ? (
				<div className="error">
					{field.meta.error}
				</div>
			) : null}
			</fieldset>
		);
	}

	renderAlert() {
		const message = this.props.errorMessage;

		return message ? (
			<div className="alert alert-danger">
				<strong>Oops!</strong> {message}
			</div>
		) : null;
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<div>
				<h2>
					Please register!
				</h2>
				<form onSubmit={handleSubmit(values => this.onFormSubmit(values))}>
					<Field
						label="Email"
						name="email"
						type="text"
						component={this.renderField}
					/>
					<Field
						label="Password"
						type="password"
						name="password"
						component={this.renderField}
					/>
					<Field
						label="Confirm Password"
						type="password"
						name="passwordConfirm"
						component={this.renderField}
					/>
					{this.renderAlert()}
					<button type="submit" className="btn btn-primary">Registerf</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => (
	{
		errorMessage: state.auth.error
	}
);

const validate = (values) => {
	const errors = {};

	if (!values.email) {
		errors.email = 'Please enter an email';
	}
	if (!values.password) {
		errors.password = 'Please enter a password';
	}
	if (!values.passwordConfirm) {
		errors.passwordConfirm = 'Please re-enter the password';
	}

	if (values.password !== values.passwordConfirm) {
		errors.passwordConfirm = 'Password entries do not match!';
	}
	return errors;
};

export default reduxForm(
	{
		form: 'SignUpForm',
		fields: ['email', 'password', 'passworConfirm'],
		validate
	})(
		connect(mapStateToProps, actions)(SignUpPage)
	);
