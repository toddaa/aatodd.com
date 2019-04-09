import React, { Component } from 'react';
import { Link } from "gatsby"
import './sidebar.css';
import Environment from './environment';
import Social from './social';
import AaronFace from "./imgAaron"

function titleCase(str) {
	return str.toLowerCase().split(' ').map(function(word) {
	  return (word.charAt(0).toUpperCase() + word.slice(1));
	}).join(' ');
  }

class Sidebar extends Component {
	render() {
		// console.log(this.props.content.edges)
		const navContent = this.props.content.edges.map((page, i) =>
			<li key={i}>
				<Link className="nav-link" to={"/" + page.node.name} onClick={this.toggle} activeClassName="active">{titleCase(page.node.name)}</Link>
			</li>
		);
		return (
				<nav id="sidebar" className="d-none d-md-block d-print-none">
					<div className="sidebar-header">
						<Link to='/'>
							<AaronFace/>
						</Link>
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