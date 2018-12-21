import React, { Component } from 'react';
import './root_page.css';

const ContentRoot = () => (
	<section className="welcome">

	</section>
);

class RootPage extends Component {
	render() {
		window.scrollTo(0, 0);
		return (
				<div className="container-fluid h-100 content root">
					<div className="row h-100">
						<div className="col-12 col-sm-9 offset-sm-1">
							<h1>Hello World!</h1>
							<h4>
								Welcome to the site.
							</h4>
							<p>
								I've got lots to offer here and plan to have plenty more in the future.
							</p>
							{/* <p>
								I consider myself and IT generalist.
								I've dabbled in many different technologies as both a network engineer and a software developer.
								Anything considered digital technology interests me, and if I dont know the answer to a problem I'll gladly learn and figure it out.
								I primarily develop for web based applicatons, but have been known to go deeper should the project require it.
							</p>
							<p>
								I'm expierenced with many different opperating systems...Windows, MacOS, Linux, IBM i to name a few.
								I've been very fortunate have a very diverse set of skill
							</p>
							<p>
								My interests are currently in software development.
								I seriously love running in a cloud environment where I can write code and deploy it in seconds without the overhead of worrying about infrastructure.
								It's refreshing to be able to automate tests and deployments to be asured the end product is exactly as planned.
							</p> */}
						</div>
					</div>
				</div>
		)
	}
}

export default RootPage;