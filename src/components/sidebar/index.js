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

class Sidebar extends Component {

	render() {
		return (
				<nav id="sidebar" className="d-none d-md-block d-print-none">
					<div className="sidebar-header">
						<Link to='/'><Avatar src="A736416D-1265-43E8-BD43-EA3061A13A79.JPG" name="Aaron Todd" round={true} size={100} style={{margin:'1em'}} /></Link>
						<Link to='/'><h4>Aaron Todd</h4></Link>
					</div>

					<ul className="list-unstyled components">
						<li>
							<NavLink className="nav-link" to='/about' activeClassName="active">About</NavLink>
						</li>
						<li>
							<NavLink className="nav-link" to='/work' activeClassName="active">Work</NavLink>
						</li>
						{/* <li>
							<NavLink className="nav-link" to='/blog' onClick={this.toggle} activeClassName="active">Blog</NavLink>
						</li>
						<li>
							<NavLink className="nav-link" to='/contact' onClick={this.toggle} activeClassName="active">Contact</NavLink>
						</li> */}
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