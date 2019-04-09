import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"


const Image = () => (
	<StaticQuery
		query={graphql`
			query {
				placeholderImage: file(relativePath: { eq: "A736416D-1265-43E8-BD43-EA3061A13A79.JPG" }) {
					childImageSharp {
						fixed(width: 100, height: 100) {
							...GatsbyImageSharpFixed_tracedSVG
						}
					}

				}
			}
		`}
		render={data => <Img fixed={data.placeholderImage.childImageSharp.fixed} alt="Aaron Todd" critical style={{ borderRadius: '50%', margin: '1em' }} />}
	/>
)
export default Image
