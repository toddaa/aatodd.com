import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import RootPage from './components/pages/root';
import AboutPage from './components/pages/about';
import WorkPage from './components/pages/work';
import Error404 from './components/pages/404';
import Sidebar from './components/sidebar';
import Topbar from './components/topbar';

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Topbar />
					<div className="wrapper">
						<Sidebar />
						<Switch>
							<Route exact path='/' component={RootPage} />
							<Route path='/about' component={AboutPage} />
							<Route path='/work' component={WorkPage} />
							<Route component={Error404} />
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
