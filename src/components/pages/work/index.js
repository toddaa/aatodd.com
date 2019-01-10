import React, { Component } from 'react';
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import {Helmet} from "react-helmet";
import './work.css';
import Environment from '../../environment';

class AboutPage extends Component {
	componentWillMount () {
	  nprogress.start()
	}

	componentDidMount () {
	  nprogress.done()
	}
	render() {
		window.scrollTo(0, 0);
		return (
			<div className="container-fluid h-100 content work">
				<Helmet>
					<title>Aaron's Work Portfolio</title>
				</Helmet>
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