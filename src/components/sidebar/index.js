import React, { Component } from 'react';
import { NavLink, Link  } from 'react-router-dom';
import Avatar from 'react-avatar';
import classnames from 'classnames';
import './sidebar.css';
import Environment from '../environment';
import Social from '../social';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGalacticRepublic } from '@fortawesome/free-brands-svg-icons';
import { withRouter } from 'react-router'

const iconSW = (
	<FontAwesomeIcon icon={faGalacticRepublic} className="fa-6x" />
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
	state = {
		hover_state: false
	};

	//  constructor(props) {
	//  	super(props);
	// // 	//console.log(props)
    // 	this.flip = this.flip.bind(this);
	// }
	componentDidUpdate () {
		// let { location: { pathname } } = this.props

		// if (prevProps.location.pathname === pathname) return
		//this.routeChanged()
		//this.setState({hover_state: false});
		//this.flip()
	}

	flip = () => {
		/*this.setState((prevState) => {
			return {hover_state: !prevState.hover_state};
		});*/
		this.setState({hover_state: true});
		setTimeout(function(){ this.setState({hover_state: false}); }.bind(this), 1000);
	}
	render() {
		const navContent = this.props.content.map((page, i) =>
			<SideBarNavButton key={i} text={page.name} path={page.path} onClick={this.toggle} isAllowed={page.auth} />
		);
		return (
				<nav id="sidebar" className="d-none d-md-block d-print-none">
					<div className="sidebar-header">
						<Link to='/'>
							<div className={'flip-container ' + classnames({ hover: this.state.hover_state === true })} onClick={this.flip} >
								<div className="flipper">
									<div className="front">
										<Avatar src="A736416D-1265-43E8-BD43-EA3061A13A79.JPG" name="Aaron Todd" round={true} size={100} style={{margin:'1em'}} />
									</div>
									<div className="back">
										<div style={{display: "inline-block", verticalAlign: "middle", width: "100px", height: "100px", borderRadius: "100%", fontFamily: "Helvetica, Arial, sans-serif", margin: "1em"}}>
											{iconSW}
										</div>
									</div>
								</div>
							</div>
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