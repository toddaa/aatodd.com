import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';
import mdFile from './markdown_test.md';

class App extends Component {
	constructor(props) {
		super(props)

		this.state = { terms: null }
	}

	componentWillMount() {
		fetch(mdFile).then((response) => response.text()).then((text) => {
			this.setState({ terms: text })
		})
	}

	render() {
		return (
			<div className="App">
				<ReactMarkdown source={this.state.terms} />
			</div>
		);
	}
}

export default App;
