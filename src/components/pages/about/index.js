import React, { Component } from 'react';
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import {Helmet} from "react-helmet";
import './about.css';
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
			<div className="container-fluid h-100 content about">
				<Helmet>
					<title>About Aaron</title>
				</Helmet>
				<div className="row h-100">
					<div className="col-12 col-md-9 offset-md-1">
						<h1>About</h1>
						<p>
							I'm Aaron, a software developer from the Lansing, Michigan area.
							I'm consider myself a generalist and I've spent a lot time time learning and getting to know many different technologies.
							Primarily, my career has revolved around web development.
							I've worked on many projects ranging from single pages to extreemly large SaaS platforms.
							Some of which has required me to get very hands on with the underlying infrastructure including IP networking and routing, server hardware, and OS layer software.
							I've even ported and customized open source software to architechures it wasn't originally intended for.
							No need to reinvent the wheel if you can simply adapt it right?
							I've also spent a lot of time focusing on the front end and more importantly the users expierence in regards to the application.
							I like to create applications that people generally want to use.
						</p>
						<p>
							These days I've been focusing a little more on serverless technologies and running code on a cloud platorm.
							I've developed a real love for single page web apps using framworks such as React and Angular.
							Combinded with CI/CD build automation tools I've learned that you can create a robust product that people get excited to be a part of.
						</p>
						<p>
							On top of all that, I love sharing my wealth of knowledge with others.
							Collaborating not only on how to do things, but also why.
							I've learned that there are many different ways to do things.
							I'm willing to share my methods and be open-minded to new.
							It's always exciting to mix things up and develop new processes that work best for a team.
						</p>
						<p>
							In my spare time I love spending time with my wife, Alison, and am heavily involved with our three children Samantha, Connor, and Emma.
							I'm a unit leader to a cub scout group of almost 50 kids.
							Being an Eagle Scout, I was raised learning how to be a service oriented leader.
							Jumping back in to those programs for the next generation, in my mind, is a welcome oportunity.
							Any scouting program will help mold the future of a child, and I want mine to learn to be bold in service to others.
							Plus, have all the fun along the way.
						</p>
					</div>
				</div>
				<Environment />
			</div>
		)
	}
}

export default AboutPage;