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

function TopBarNavButton(props) {
	const isAllowed = props.isAllowed;
	let rendered = "";
	if (isAllowed || process.env.NODE_ENV === 'development') {
		rendered = <li className="nav-item"><NavLink className="nav-link" to={props.path} onClick={props.onClick} activeClassName="active">{props.text}</NavLink></li>;
	}
	return rendered;
}

class Topbar extends Component {
	constructor(props) {
		super(props);

		this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
		this.handleBrandClick = this.handleBrandClick.bind(this);
		this.handleNavClick = this.handleNavClick.bind(this);
		this.state = {
			showMenu: false,
			currentPage:""
		};
	}
	handleHamburgerClick(){
		this.setState({showMenu : !this.state.showMenu});
	}
	handleBrandClick(){
		this.setState({showMenu : false});
	}
	handleNavClick(){
		this.setState({showMenu : false});
		//this.toggle
	}
	render() {
		const navContent = this.props.content.map((page, i) =>
			<TopBarNavButton key={i} text={page.name} path={page.path} onClick={this.handleNavClick} isAllowed={page.auth} />
		);
		return (
				<nav id="topbar" className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top d-md-none">
					<Link to='/' className="navbar-brand" onClick={this.handleBrandClick}><Avatar src="A736416D-1265-43E8-BD43-EA3061A13A79.JPG" name="Aaron Todd" round={true} size={40} /> Aaron Todd</Link>
					<button className="navbar-toggler" type="button" onClick={this.handleHamburgerClick} data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className={'navbar-collapse ' + classnames({ collapse: this.state.showMenu === false })} id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto">
							{navContent}
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