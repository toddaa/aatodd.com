import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitterSquare, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
//import './social.css';

const iconLinkedin = (
	<FontAwesomeIcon icon={faLinkedin} className="fa-fw fa-lg" />
);

const iconGithub = (
	<FontAwesomeIcon icon={faGithub} className="fa-fw fa-lg" />
);

const iconTwitter = (
	<FontAwesomeIcon icon={faTwitterSquare} className="fa-fw fa-lg" />
);

class Social extends Component {

	render() {
		return (
			<div className="social">
				<a href="http://twitter.com/toddaa">{iconTwitter}</a>
				<a href="http://github.com/toddaa">{iconGithub}</a>
				<a href="http://linkedin.com/in/toddaa">{iconLinkedin}</a>
			</div>
		)
	}
}

export default Social;