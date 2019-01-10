import React, { Component } from 'react';
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import {Helmet} from "react-helmet";
import ReactMarkdown from 'react-markdown';
import './article.css';
import Environment from '../../environment';

class ArticlePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			terms: null,
			path: props.article.mdfile,
		}
	}

	componentWillMount() {
		nprogress.start()
		fetch("articles/"+this.state.path).then((response) => response.text()).then((text) => {
			var lines = text.split('\n');
			lines.splice(0,7);
			this.setState({ terms: lines.join('\n') })
			nprogress.done()
		})
	}

	render() {
		window.scrollTo(0, 0);
		return (
			<div className="container-fluid h-100 content article">
				<Helmet>
					<title>{this.props.article.title}</title>
				</Helmet>
				<div className="row h-100">
					<div className="col-12 col-md-9 offset-md-1">
						<div className="article">
							<ReactMarkdown source={this.state.terms} />
						</div>
					</div>
				</div>
				<Environment />
			</div>
		)
	}
}

export default ArticlePage;