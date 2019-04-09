# Hey there!
This is the code for my personal site.  After spending the time learning and playing with React based on [Create React App](https://github.com/facebook/create-react-app) I've realized that while its definetly a great start, it does have some pitfalls.  Specificaly in the SEO realm.  It was definetly a great way to learn some new things with React and how things were implemented with that being the starting point.

Moving forward, since part of my application includes a blog I'll be switching to the [Gatsby](https://www.gatsbyjs.org/) framework which is based on React.  I've taken many of my existing components an made them work under the Gatsby umbrella, which is differnt but still Javascript.


### Available Scripts

In the project directory, you can run:

##### `gatsby develop`

Runs the app in the development mode.
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

##### `gatsby build`

Builds the app for production to the `public` folder.

Your app is ready to be deployed!

##### `npm run deploy-dev`

Runs the previously defined build script and deploys everything in the `build` directory to my AWS S3 bucket used for testing.  This allows me to test my code on the AWS environment once last time before deploying to production.

##### `npm run deploy-prod`

Runs the previously defined build script and deploys everything in the `build` directory to my AWS S3 bucket used for production.  This will also invalidate the associated AWS CloudFront distrobution so that the edge locations know theres something new out there to cache and serve up to users.