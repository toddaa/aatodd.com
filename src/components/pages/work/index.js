import React, { Component } from 'react';
import './work.css';
import Environment from '../../environment';

class AboutPage extends Component {
	render() {
		window.scrollTo(0, 0);
		return (
			<div className="container-fluid h-100 content work">
				<div className="row h-100">
					<div className="col-12 col-md-9 offset-md-1">
						<h1>Work</h1>
						<p>
							Yeah, I work, and with the hopes of not boring you with a page simular to my resume I'm going to give you the hightlights
						</p>
					</div>
				</div>
				<Environment />
			</div>
		)
	}
}

export default AboutPage;