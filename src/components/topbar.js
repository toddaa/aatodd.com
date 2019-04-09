import React, { Component } from 'react';
import { Link } from "gatsby"
import { HamburgerButton } from 'react-hamburger-button';
import classnames from 'classnames';
// import Avatar from 'react-avatar';
import Social from './social';
import './topbar.css';
import AaronFace from "./imgAaronMobile"

function titleCase(str) {
	return str.toLowerCase().split(' ').map(function(word) {
	  return (word.charAt(0).toUpperCase() + word.slice(1));
	}).join(' ');
  }

class Topbar extends Component {
	render() {
		const navContent = this.props.content.edges.map((page, i) =>
			<li className="nav-item" key={i}>
				<Link className="nav-link" to={"/" + page.node.name} onClick={this.props.miscClick} activeClassName="active">{titleCase(page.node.name)}</Link>
			</li>
		);
		return (
				<nav id="topbar" className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top d-md-none">
					<Link to='/' className="navbar-brand" onClick={this.props.miscClick}>
						<AaronFace/>
					</Link>
					<div className="navbar-toggler">
						<HamburgerButton
							open={this.props.menu_state}
							onClick={this.props.hamburgerClick}
							width={20}
							height={16}
							strokeWidth={2}
							color='white'
							animationDuration={0.3}
						/>
					</div>
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