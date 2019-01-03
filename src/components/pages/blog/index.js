import React, { Component } from 'react';
import './blog.css';
import Environment from '../../environment';

class BlogPage extends Component {
	render() {
		window.scrollTo(0, 0);
		return (
			<div className="container-fluid h-100 content root">
				<div className="row h-100">
					<div className="col-12 col-md-9 offset-md-1">
						<h1>Blog</h1>
						<h6><em>A blog about nothing</em></h6>

					</div>
				</div>
				<Environment />
			</div>
		)
	}
}

export default BlogPage;