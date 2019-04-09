/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { Component } from 'react';
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

// this ensures that the icon CSS is loaded immediately before attempting to render icons
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from "@fortawesome/fontawesome-svg-core";
// Prevent fontawesome from dynamically adding its css since we did it manually above

import '../../node_modules/bootstrap-css-only/css/bootstrap.min.css';
import '../../node_modules/mdbreact/dist/css/mdb.css';

import Sidebar from "./sidebar"
import "./layout.css"
import Topbar from "./topbar"
import "./topbar.css"

config.autoAddCss = false;


// const Layout = ({ children }) => (
class Layout extends Component {
  constructor(props){
    super();
    this.state = {
      mobile_menu_open: false
    };
    this.children = props.children;
  }

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
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
        },
        allFile(filter: { sourceInstanceName: { eq: "routable" } }) {
          edges {
            node {
            name
            }
          }
          }
          }
        `}
        render={data => (
          <>
            <Topbar content={data.allFile} menu_state={this.state.mobile_menu_open}  miscClick={this.forceHideMenu} hamburgerClick={this.hamburgerButtonClickHandler} />
            <Sidebar content={data.allFile} />
            <div className="wrapper">
              {this.children}
            </div>
          </>
        )}
      />
    )
    }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
