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
						{/* <p>
							Yeah, I work, and with the hopes of not boring you with a page simular to my resume I'm going to give you the hightlights
						</p> */}
						<section>
							<h3>The H.T. Hackney Co.</h3>
							<h6>2017 - Current</h6>
							<h5>Technology</h5>
							<p>HTML, CSS, Javascript, PHP, RPG, DB2</p>
							<h5>Platform</h5>
							<p>IBM System i, Linux</p>
							<h5>Goal</h5>
							<p>To provide customers, associates, and management the tools they need to manage orders and predict future profitibiliy trends.  
								Corporate level logistics reporting was also on the forefront of my projects.</p>
						</section>
						<hr/>
						<section>
							<h3>LEIGHTRONIX, INC.</h3>
							<h6>1999 - 2017</h6>
							<h5>Technology</h5>
							<p>HTML, CSS, Javascript, PHP, C, </p>
							<h5>Platform</h5>
							<p>Linux</p>
							<h5>Goal</h5>
							<p>Provide customers cloud based Video-On-Demand and LIVE video services to increase their viewership reach.</p>
						</section>
					</div>
				</div>
				<Environment />
			</div>
		)
	}
}

export default AboutPage;