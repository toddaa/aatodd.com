import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import './404.css';

const iconError = (
	<FontAwesomeIcon icon={faExclamationTriangle} className="fa-fw fa-4x" />
);

class ErrorPage extends Component {
	render() {
		window.scrollTo(0, 0);
		return (
			<div className="container-fluid h-100">
				<div className="row h-100">
					<div className="col text-center vertical-center">
						<h1>{iconError}</h1>
						<h1>- 404 -</h1>
						<h2>Fear is the path to the dark side.  Choose another path.</h2>
					</div>
				</div>
			</div>
		)
	}
}

export default ErrorPage;