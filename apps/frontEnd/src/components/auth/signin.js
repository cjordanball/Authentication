import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class SignInPage extends Component {
	onSubmit({ email, password }) {
		// Need to do sometbing to log in;
		this.props.signInUser({ email, password }, this.props.history);
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
			</fieldset>
		);
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<div>
				<h2>
					Please Sign In
				</h2>
				<form onSubmit={handleSubmit(values => this.onSubmit(values))}>
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
					{this.props.errorMessage ? (
						<div className="alert alert-danger">
							<strong>Oops!</strong> {this.props.errorMessage}
						</div>
				) : ''}
					<button type="submit" className="btn btn-primary">Sign in</button>
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

export default reduxForm(
	{
		form: 'SignInForm',
		fields: ['email', 'password']
	})(
		connect(mapStateToProps, actions)(SignInPage)
	);
