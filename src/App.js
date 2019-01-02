import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import './App.css';
import RootPage from './components/pages/root';
import AboutPage from './components/pages/about';
import Error404 from './components/pages/404';
import Sidebar from './components/sidebar';
import Topbar from './components/topbar';


ReactGA.initialize('UA-131576285-01');
ReactGA.pageview(window.location.pathname + window.location.search);

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
							<Route component={Error404} />
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
