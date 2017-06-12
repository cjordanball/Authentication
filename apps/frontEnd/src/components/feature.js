import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class FeaturePage extends Component {
	componentWillMount() {
		this.props.fetchMessage();
	}
	render() {
		console.log('this.props', this.props);
		return (
			<div>
				<h1>
					{this.props.message}
				</h1>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log('state', state);
	return {
		message: state.auth.message
	};
};

export default connect(mapStateToProps, actions)(FeaturePage);
