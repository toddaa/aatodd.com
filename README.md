# Hey there!
This is the code for my personal site.  I've spent quite a bit of time learning and playing with React lately, but I've found that there are so many tools out there to eliminate the mundane of setting up the environment.  So I bootstrapped this with [Create React App](https://github.com/facebook/create-react-app) as I do with many projects these days.  I've left the original scripts below in place, but have added more at the end for my needs.

I'm trying hard not to `eject` from this setup, but the extra flexibility and the interest to remind myself what's under the hood has me really considering otherwise.  In lieu of that, for now, I've followed this guide [here](https://daveceddia.com/customize-create-react-app-webpack-without-ejecting/) to extend the config without ejecting.  It works surprisingly well.

The blog portion of this site is somewhat unique in that it is fully functional while living within the confines of the object based storage AWS S3 provides.  Articles are written in Markdown format and stored as a public file.  Details for these files need to be appended to articles.json in order for it to show up within the rendered website.  It's really quite cool and doesn't have the extra overhead of server-side rendering.  The extension mentioned in the previous paragraph is being used to automate the build of the articles.json file.

I do anticipate a day when server-side rendering will be required, however.  Search functionality has me particularly worried as while I think I'll be able to search the JSON file of articles fairly easily, I won't be able to search a directory of markdown files for a particular term.

### Available Scripts

In the project directory, you can run:

##### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

##### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

##### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

##### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

##### `npm run deploy-dev`

Runs the previously defined build script and deploys everything in the `build` directory to my AWS S3 bucket used for testing.  This allows me to test my code on the AWS environment once last time before deploying to production.

##### `npm run deploy-prod`

Runs the previously defined build script and deploys everything in the `build` directory to my AWS S3 bucket used for production.  This will also invalidate the associated AWS CloudFront distrobution so that the edge locations know theres something new out there to cache and serve up to users.