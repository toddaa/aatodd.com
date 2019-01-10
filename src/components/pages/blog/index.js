import React, { Component } from 'react';
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import {Helmet} from "react-helmet";
import './blog.css';
import Environment from '../../environment';
import Articles from './Articles';

class BlogPage extends Component {
	componentWillMount () {
	  nprogress.start()
	}

	componentDidMount () {
	  nprogress.done()
	}
	render() {
		window.scrollTo(0, 0);
		return (
			<div className="container-fluid h-100 content blog">
				<Helmet>
					<title>Aaron's Blog</title>
				</Helmet>
				<div className="row h-100">
					<div className="col-12 col-md-9 offset-md-1">
						<h1>Blog</h1>
						<h6><em>A blog about nothing</em></h6>
						<Articles/>
					</div>
				</div>
				<Environment />
			</div>
		)
	}
}

export default BlogPage;