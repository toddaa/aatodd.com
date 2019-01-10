import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import './404.css';

const iconError = (
	<FontAwesomeIcon icon={faExclamationTriangle} className="fa-fw fa-4x" />
);

class ErrorPage extends Component {
	render() {
		const messages_404 = [
			'Fear is the path to the dark side.  Choose another path.',
			'Nope.  Nothing here.',
			'You broke it! Head back and try again.',
			'No match.  Are you sure you know what you want?',
			'This is not the page you are looking for... ',
			'Too soon!  This page isn\'t complete quite yet.'
		];

		window.scrollTo(0, 0);
		return (
			<div className="container-fluid h-100 content">
				<div className="row h-100">
					<div className="col text-center vertical-center">
						<h1>{iconError}</h1>
						{/* <h1>404 - Page Not Found</h1> */}
						<h3>{messages_404[Math.floor(Math.random() * messages_404.length)]}</h3>
					</div>
				</div>
			</div>
		)
	}
}

export default ErrorPage;