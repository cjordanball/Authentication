import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {

	render() {
		console.log(this.props);
		return (
			<nav className="navbar navbar-light">
				<ul className="nav navbar-nav">
					<li className="nav-item">
						{this.props.auth ? (
							<Link to="/">Sign out</Link>
						) :
						(
							<Link to="/signin">Sign in</Link>
						)}
					</li>
					<li className="nav-item">
						<Link to="/signup">
							Register
						</Link>
					</li>
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

export default connect(mapStateToProps)(Header);
