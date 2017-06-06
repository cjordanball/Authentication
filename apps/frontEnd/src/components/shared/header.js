import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
	render() {
		return (
			<nav className="navbar navbar-light">
				<ul className="nav navbar-nav">
					<li className="nav-item">
						<Link to="/signin">
							Signin
						</Link>
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

export default Header;
