import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { Link  } from 'react-router-dom';
import './blog.css';
import Environment from '../../environment';

import articles from '../../../articles.json';

function Articles(props) {
	let blog_atricles = props.content.map((article, i) => {

		//console.log(article)
		return (
			<section key={i} className="article">
				<Link to={article.path}>
					<h5 className="title">{article.title}</h5>
					<p className="date">{article.date} by {article.author}</p>
					<p className="desc">{article.description}</p>
					<p className="more">More...</p>
				</Link>
			</section>
		);
	})

	return blog_atricles;
}

class BlogPage extends Component {
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
						<div className="articles">
							<Articles content={articles}/>
						</div>
					</div>
				</div>
				<Environment />
			</div>
		)
	}
}

export default BlogPage;