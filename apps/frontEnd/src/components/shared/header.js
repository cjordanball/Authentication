import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Header extends Component {

	render() {
		return (
			<nav className="navbar navbar-light">
				<Link to="/" className="navbar-brand">Redux Auth</Link>
				<ul className="nav navbar-nav">
					{this.props.auth.authenticated ? (
						<li className="nav-item">
							<Link
								onClick={this.props.signOutUser}
								className="nav-link"
								to="/signout"
							>
								Sign out
							</Link>
						</li>
					) :
					([
						<li className="nav-item" key="signin">
							<Link className="nav-link" to="/signin">Sign in</Link>
						</li>,
						<li className="nav-item" key="signup">
							<Link className="nav-link" to="/signup">
								Register
							</Link>
						</li>]
						)}
				</ul>
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps, actions)(Header);
