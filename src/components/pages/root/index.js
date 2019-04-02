import React, { Component } from 'react';
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import {Helmet} from "react-helmet";
import './root_page.css';
import Environment from '../../environment';

class RootPage extends Component {
	componentWillMount () {
	  nprogress.start()
	}

	componentDidMount () {
	  nprogress.done()
	}
	render() {
		window.scrollTo(0, 0);
		return (
				<div className="container-fluid h-100 content root">
					<Helmet>
						<title>Aaron Todd | Full Stack Developer and UX addict.</title>
					</Helmet>
					<div className="row h-100">
						<div className="col-12 col-md-9 offset-md-1">
							<h1>Hello World!  I'm Aaron.</h1>
							<h4>Welcome to the site.</h4>
							<p>
								I'm a software developer and plan to share my experiences here.
								Sharing my thoughts publicly is a fairly new endeavor, and it is my hope that you will find something useful.
								So please, allow me to stir the pot...
							</p>
							<p>
								Shoot me a DM on <a href="http://twitter.com/toddaa">Twitter</a> if you'd like to discuss anything further.
							</p>
						</div>
					</div>
					<Environment />
				</div>
		)
	}
}

export default RootPage;