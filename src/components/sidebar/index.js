import React, { Component } from 'react';
import { NavLink, Link  } from 'react-router-dom';
import Avatar from 'react-avatar';
import './sidebar.css';
import Environment from '../environment';
import Social from '../social';

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
					<Social/>
					<Environment />
				</nav>
		)
	}
}

export default Sidebar;