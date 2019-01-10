import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import './App.css';
import RootPage from './components/pages/root';
import AboutPage from './components/pages/about';
import WorkPage from './components/pages/work';
import BlogPage from './components/pages/blog';
import ArticlePage from './components/pages/article';
import Error404 from './components/pages/404';
import Sidebar from './components/sidebar';
import Topbar from './components/topbar';

import articles from './articles.json';


ReactGA.initialize('UA-131576285-1');
ReactGA.pageview(window.location.pathname);
//console.log(process.env)

const pages = [
	{name: 'About', path: '/about', component: AboutPage, auth: (process.env.REACT_APP_INC_PAGE_ABOUT === 'true')},
	{name: 'Work', path: '/work', component: WorkPage, auth: (process.env.REACT_APP_INC_PAGE_WORK === 'true')},
	{name: 'Blog', path: '/blog', component: BlogPage, auth: (process.env.REACT_APP_INC_PAGE_BLOG === 'true')},
]

function PageRoutes(props) {
	let hasBlog = false;
	let dynamic_routes = props.pages.map((page, i) => {
		let rendered = "";
		if (page.auth || process.env.NODE_ENV === 'development'){
			if (page.path === '/blog'){
				hasBlog = true;
			}
			rendered = <Route key={i} path={page.path} component={page.component} />;
		}
		return rendered;
	});

	let blog_routes = props.articles.map((article, i) => {
		let rendered = "";
		if (hasBlog){
			rendered = <Route key={i} path={article.path} render={(props) => <ArticlePage {...props} article={article} />} />;
		}
		return rendered;
	})

	return (
		<Switch>
			<Route exact path='/' component={RootPage} />
			{dynamic_routes}
			{blog_routes}
			<Route component={Error404} />
		</Switch>
	);
}

class App extends Component {
	state = {
		mobile_menu_open: false
	};

	hamburgerButtonClickHandler = () => {
		this.setState((prevState) => {
			return {mobile_menu_open: !prevState.mobile_menu_open};
		  });
	}

	bodyClickHandler = () => {
		if (document.activeElement.tagName === "BODY" && window.innerWidth <= 768){
			this.forceHideMenu();
		}
	}

	forceHideMenu = () => {
		this.setState({mobile_menu_open: false});
	}

	render() {
		return (
			<Router>
				<div>
					<Topbar content={pages} menu_state={this.state.mobile_menu_open}  miscClick={this.forceHideMenu} hamburgerClick={this.hamburgerButtonClickHandler} />
					<div className="wrapper" onClick={this.bodyClickHandler}>
						<Sidebar content={pages} />
						<PageRoutes pages={pages} articles={articles}/>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
