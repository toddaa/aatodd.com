import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faSplotch } from '@fortawesome/free-solid-svg-icons';
import './404.css';

const iconError = (
	<span className="fa-layers fa-fw fa-6x">
			<FontAwesomeIcon icon={faSplotch}  />
			<FontAwesomeIcon icon={faExclamationTriangle} className="fa-inverse"  style={{width:".5em", left:'-25px'}} />
	</span>
);

class ErrorPage extends Component {
	constructor() {
		super();
		const messages_404 = [
			'Fear is the path to the dark side.  Choose another path.',
			'Nope.  Nothing here.',
			'You broke it! Head back and try again.',
			'No match.  Are you sure you know what you want?',
			'This is not the page you are looking for... ',
			'Too soon!  This page isn\'t complete quite yet.'
		];
		this.state = {
			loadMsg: messages_404[Math.floor(Math.random() * messages_404.length)]
		};
	}
	render() {
		window.scrollTo(0, 0);
		const { loadMsg } = this.state;
		return (
			<div className="container-fluid h-100 content">
				<Helmet>
					<title>404 - Page Not Found</title>
				</Helmet>
				<div className="row h-100">
					<div className="col text-center vertical-center">
						<h1>{iconError}</h1>
						{/* <h1>404 - Page Not Found</h1> */}
						<h3>{loadMsg}</h3>
					</div>
				</div>
			</div>
		)
	}
}

export default ErrorPage;