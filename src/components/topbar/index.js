import React, { Component } from 'react';
import { NavLink, Link  } from 'react-router-dom';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitterSquare, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import Avatar from 'react-avatar';
import './topbar.css';

const iconLinkedin = (
	<FontAwesomeIcon icon={faLinkedin} className="fa-fw fa-lg" />
);

const iconGithub = (
	<FontAwesomeIcon icon={faGithub} className="fa-fw fa-lg" />
);

const iconTwitter = (
	<FontAwesomeIcon icon={faTwitterSquare} className="fa-fw fa-lg" />
);

class Topbar extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.state = {
			showMenu: false
		};
	}
	handleClick(){
		this.setState({showMenu : !this.state.showMenu});
	}
	render() {
		return (
				<nav id="topbar" className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top d-sm-none">
					<Link to='/' className="navbar-brand" onClick={this.handleClick}><Avatar src="A736416D-1265-43E8-BD43-EA3061A13A79.JPG" name="Aaron Todd" round={true} size={40} /> Aaron Todd</Link>
					<button className="navbar-toggler" type="button" onClick={this.handleClick} data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className={'navbar-collapse ' + classnames({ collapse: this.state.showMenu === false })} id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item">
								<NavLink className="nav-link" to='/about' onClick={this.handleClick} activeClassName="active">About</NavLink>
							</li>
						</ul>
						<div className="social">
							<a href="http://twitter.com/toddaa">{iconTwitter}</a>
							<a href="http://github.com/toddaa">{iconGithub}</a>
							<a href="http://linkedin.com/in/toddaa">{iconLinkedin}</a>
						</div>
					</div>
				</nav>
		)
	}
}

export default Topbar;