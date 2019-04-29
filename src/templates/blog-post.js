import React from 'react';
import Layout from '../components/layout';
import Img from 'gatsby-image';
import { graphql } from 'gatsby'
// import SEO from "../components/seo"
import PostSEO from '../components/post-seo';
import './blog-post.css';

function BlogPost(props) {
	// console.log(props)

	const post = props.data.markdownRemark;
	const { title, description } = post.frontmatter;
	const { date } = post.frontmatter;
	const { author } = post.frontmatter;
	const url = props.data.site.siteMetadata.siteUrl
	// console.log(post.frontmatter)
	const thumbnail = (post.frontmatter.image != null ? post.frontmatter.image.childImageSharp.fluid.src : '')

	let img = '';
	if (thumbnail){
		img = <Img fluid={post.frontmatter.image.childImageSharp.fluid} />
	}

	return (
		<Layout>
			<PostSEO
				title={title}
				description={description}
				thumbnail={url + thumbnail}
				url={url}
				pathname={props.location.pathname}
			/>
			<div className="container-fluid h-100 content post">
				<div className="row h-100">
					<div className="col-12 col-md-9 offset-md-1">
					<h1>{title}</h1>
					<h6 className="date">{date}</h6>
					<h6 className="author">Written by {author}</h6>
					{img}
					<div dangerouslySetInnerHTML={{ __html: post.html }} />
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default BlogPost;

export const query = graphql`
query PostQuery($slug: String!) {
	markdownRemark(fields: { slug: { eq: $slug } }) {
		html
		frontmatter {
			title
			description
			date
			author
			image {
				childImageSharp {
					resize(width: 1500, height: 1500) {
						src
					}
					fluid(maxWidth: 786) {
						...GatsbyImageSharpFluid
					}
				}
			}
		}
	}
	site {
		siteMetadata {
			siteUrl
		}
  }
}
`