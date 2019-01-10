import React, { Component } from 'react';
import { NavLink, Link  } from 'react-router-dom';
import classnames from 'classnames';
import Avatar from 'react-avatar';
import Social from '../social';
import './topbar.css';

function TopBarNavButton(props) {
	const isAllowed = props.isAllowed;
	let rendered = "";
	if (isAllowed || process.env.NODE_ENV === 'development') {
		rendered = <li className="nav-item"><NavLink className="nav-link" to={props.path} onClick={props.onClick} activeClassName="active">{props.text}</NavLink></li>;
	}
	return rendered;
}

class Topbar extends Component {
	render() {
		const navContent = this.props.content.map((page, i) =>
			<TopBarNavButton key={i} text={page.name} path={page.path} onClick={this.props.miscClick} isAllowed={page.auth} />
		);
		return (
				<nav id="topbar" className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top d-md-none">
					<Link to='/' className="navbar-brand" onClick={this.props.miscClick}><Avatar src="A736416D-1265-43E8-BD43-EA3061A13A79.JPG" name="Aaron Todd" round={true} size={40} /> Aaron Todd</Link>
					<button className="navbar-toggler" type="button" onClick={this.props.hamburgerClick} data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className={'navbar-collapse ' + classnames({ collapse: this.props.menu_state === false })} id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto">
							{navContent}
						</ul>
						<Social/>
					</div>
				</nav>
		)
	}
}

export default Topbar;