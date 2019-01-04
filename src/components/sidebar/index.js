import React, { Component } from 'react';
import { NavLink, Link  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitterSquare, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import Avatar from 'react-avatar';
import './sidebar.css';
import Environment from '../environment';

const iconLinkedin = (
	<FontAwesomeIcon icon={faLinkedin} className="fa-fw fa-lg" />
);

const iconGithub = (
	<FontAwesomeIcon icon={faGithub} className="fa-fw fa-lg" />
);

const iconTwitter = (
	<FontAwesomeIcon icon={faTwitterSquare} className="fa-fw fa-lg" />
);

function SideBarNavButton(props) {
	const isAllowed = props.isAllowed;
	let rendered = "";
	if (isAllowed || process.env.NODE_ENV === 'development') {
		rendered = <li><NavLink className="nav-link" to={props.path} onClick={props.onClick} activeClassName="active">{props.text}</NavLink></li>;
	}
	return rendered;
}

class Sidebar extends Component {
	// constructor(props) {
	// 	super(props);
	// 	//console.log(props)
	// }
	render() {
		const navContent = this.props.content.map((page, i) =>
			<SideBarNavButton key={i} text={page.name} path={page.path} onClick={this.toggle} isAllowed={page.auth} />
		);
		return (
				<nav id="sidebar" className="d-none d-md-block d-print-none">
					<div className="sidebar-header">
						<Link to='/'><Avatar src="A736416D-1265-43E8-BD43-EA3061A13A79.JPG" name="Aaron Todd" round={true} size={100} style={{margin:'1em'}} /></Link>
						<Link to='/'><h4>Aaron Todd</h4></Link>
					</div>

					<ul className="list-unstyled components">
						{navContent}
					</ul>
					<div className="social">
						<a href="http://twitter.com/toddaa">{iconTwitter}</a>
						<a href="http://github.com/toddaa">{iconGithub}</a>
						<a href="http://linkedin.com/in/toddaa">{iconLinkedin}</a>
					</div>
					<Environment />
				</nav>
		)
	}
}

export default Sidebar;