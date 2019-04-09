module.exports = {
  siteMetadata: {
    title: `Aaron Todd`,
    description: `This is my site.  Enjoy!`,
	author: `Aaron Todd`,
	siteUrl: `https://aatodd.com`
  },
  plugins: [
	`gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Aaron Todd`,
        short_name: `Aaron Todd`,
        start_url: `/`,
        background_color: `#ff6700a6`,
        theme_color: `#ff6700a6`,
        display: `standalone`,
		icon: `src/images/A736416D-1265-43E8-BD43-EA3061A13A79.jpg`, // This path is relative to the root of the site.
		include_favicon: true,
      },
	},
	`gatsby-transformer-remark`,
    'gatsby-plugin-offline',
	{
		resolve: `gatsby-source-filesystem`,
		options: {
		  path: `${__dirname}/src/pages`,
		  name: "routable",
		  ignore: [`**/404.js`, `**/index.js`, `**/*.md`, `**/*.jpg`]
		},
	},
	{
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
	  },
	},
	{
		resolve: `gatsby-transformer-remark`,
		options: {
			plugins: [
				`gatsby-remark-prismjs`,
			]
		}
	}
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
