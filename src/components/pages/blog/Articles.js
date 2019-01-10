import React, { Component } from 'react';
import { Link  } from 'react-router-dom';

import articles from '../../../articles.json';


class Articles extends Component {
	render() {
		let blog_atricles = articles.map((article, i) => {

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
		return (
			<div className="articles">
				{blog_atricles}
			</div>
		)
	}
}

export default Articles;