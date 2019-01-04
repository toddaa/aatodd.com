import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import './article.css';
import Environment from '../../environment';

class ArticlePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			terms: null,
			path: props.article.path.substr(1),
		}
	}

	componentWillMount() {
		fetch("articles/"+this.state.path+".md").then((response) => response.text()).then((text) => {
			this.setState({ terms: text })
		})
	}

	render() {
		window.scrollTo(0, 0);
		return (
			<div className="container-fluid h-100 content root">
				<div className="row h-100">
					<div className="col-12 col-md-9 offset-md-1">
						<ReactMarkdown source={this.state.terms} />
					</div>
				</div>
				<Environment />
			</div>
		)
	}
}

export default ArticlePage;