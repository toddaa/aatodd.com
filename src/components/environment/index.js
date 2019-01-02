import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faAws } from '@fortawesome/free-brands-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './environment.css';

const iconReact = (
	<FontAwesomeIcon icon={faReact} className="fa-fw fa-lg react" />
);
const iconAWS = (
	<FontAwesomeIcon icon={faAws} className="fa-fw fa-lg aws" />
);
const iconPlus = (
	<FontAwesomeIcon icon={faPlus} className="fa-fw fa-xs" />
);

class Environment extends Component {

	render() {
		return (
				<div className="design">
					{iconReact} {iconPlus} {iconAWS}
				</div>
		)
	}
}

export default Environment;