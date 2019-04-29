import React from 'react';
import { Link, graphql } from 'gatsby'
// import nprogress from 'nprogress'
// import 'nprogress/nprogress.css'
// import {Helmet} from "react-helmet";
// import './about.css';
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPage = (props) => {
	const postList = props.data.allMarkdownRemark;
	return(
		<Layout>
			<SEO title="Aaron's Blog" keywords={[`gatsby`, `application`, `react`]} />
				<div className="container-fluid h-100 content blog">
					<div className="row h-100">
						<div className="col-12 col-md-9 offset-md-1">
							<h1>Blog</h1>
							<h6><em>A blog about nothing</em></h6>
							{postList.edges.map(({ node }, i) => (
								<section key={i} className="article">
									<Link to={node.fields.slug} >
										<div className="post-list">
											<h3 className="article_title">{node.frontmatter.title}</h3>
											<p className="article_date">{node.frontmatter.date}</p>
											<p className="article_desc">{node.excerpt}</p>
											<p className="more">More...</p>
										</div>
									</Link>
								</section>
								))}
						</div>
					</div>
				</div>
		</Layout>
	)
}

export default BlogPage;

export const listQuery = graphql`
  query ListQuery {
	allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
	  edges {
		node {
		  fields{
			slug
		  }
		  excerpt(pruneLength: 250)
		  frontmatter {
			date(formatString: "MMMM Do YYYY")
			title
		  }
		}
	  }
	}
  }
`