import React, { Component } from 'react';
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import ReactMarkdown from 'react-markdown';
import CodeBlock from "./CodeBlock";
import ImageBlock from "./ImageBlock";
import './article.css';
import Environment from '../../environment';
import MetaTags from 'react-meta-tags';


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
				<MetaTags>
					<title>{this.props.article.title}</title>
					<meta id="description-meta-tag" name="description" content={this.props.article.description} />
					<meta id="og-title-meta-tags" property="og:title" content={this.props.article.title} />
					<meta id="og-description-meta-tags" property="og:description" content={this.props.article.description} />
					<meta id="og-url-meta-tags" property="og:url" content={"https://" + process.env.REACT_APP_BASE_DOMAIN + this.props.article.path} />
				</MetaTags>
				<div className="row h-100">
					<div className="col-12 col-md-9 offset-md-1">
						<div className="article">
							<h1>{this.props.article.title}</h1>
							<h6 className="date">{this.props.article.date}</h6>
							<h6 className="author">Written by {this.props.article.author}</h6>
							<ReactMarkdown source={this.state.terms} renderers={{ code: CodeBlock, image: ImageBlock }} />
						</div>
					</div>
				</div>
				<Environment />
			</div>
		)
	}
}

export default ArticlePage;