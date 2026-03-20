/**
 * One-time migration script to convert existing markdown blog posts to HTML
 * and insert them into Supabase.
 *
 * Usage:
 *   1. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 *   2. Run: npx tsx scripts/migrate-posts.ts
 *
 * This script uses the service role key to bypass RLS policies.
 */

import { createClient } from "@supabase/supabase-js";
import { marked } from "marked";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    "Missing env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const posts = [
  {
    title: "Why, and Why Now",
    slug: "why-and-why-now",
    description:
      "I know what you're saying...there are so many blogs these days the last thing we need is another one with some guy spewing his opinions.",
    date: "2019-01-04T00:00:00Z",
    author: "Aaron Todd",
    featured_image: null,
    content: `Yup, I know what you're saying...there are so many blogs these days the last thing we need is another one with some guy spewing his opinions.
I really hesitated about this believe me.
For years I have hesitated.
I don't consider myself a strong writer but know the only way to get better at something is to practice.
It's my hope that as I practice, there might be a tidbit from my experiences that may help someone else.
So please keep in mind that much of this is merely my opinions.
It's entirely possible you may agree or disagree.
Either is fine, and I'd love you hear your alternative stance.
I'm not here to start a war; rather just a conversation where we can learn and evolve from each other.

So let's start with this sites current state of development.
If you read my [about](/about) page you would understand that I love technology and being a developer.
I've also come to love working with [Amazon Web Services (AWS)](https://aws.amazon.com/) so naturally, this site lives there.
I've found that being able to stand up infrastructure in seconds that would take typically take hours to do is exciting.
That still seems weird sometimes because I'm the guy who loves system build-out and making different systems work together for a project.
With AWS I can still do all of that, but it happens in seconds from the luxury of my chair without a lot of hassle.

The setup for this site is fairly basic, and best of all it only costs a few dollars a month to run.
All files are being stored inside an [AWS S3](https://aws.amazon.com/s3/) bucket.
If you're not aware, this provides object storage and means I don't have to anticipate and allocate my storage needs up front.
Instead, files can be added at any time and I can have as much as the service will allow.

Along with S3, I'm using [AWS CloudFront](https://aws.amazon.com/cloudfront/) to make my buckets content globally available.
It also allows me to apply an SSL certificate for security.
[AWS Route 53](https://aws.amazon.com/route53) runs my domain name which with AWS is absolute cake because of their custom DNS extensions they have developed.

The site was developed in Javascript using the [React](https://reactjs.org/) library, which is another joy to deal with.
For me, React helps force me to keep files small and manageable.
I split things up as much as possible into components and each typically gets its own file.
You'd never know this though as everything gets bundled up into a single file before being deployed.
The result is known as a [Single Page Application](https://en.wikipedia.org/wiki/Single-page_application) or SPA for short.
This means that when you load my page you get more than just the one web page you visually see.
Instead, you get it all which makes traversing from page to page really fast.

In addition, I also use [Bootstrap](https://getbootstrap.com/) to take much of the style out of my hands.
Relying on their style sheets just makes development go faster.
There also several other libraries that do various things I won't bore you with.
They do their part so I don't have to take the time to do it.
Sometimes reinventing the wheel is a complete drag, and there are folks out there that have made some top-notch code available for anyone to use.

These articles are where things get tricky on me, and that's the one thing that you don't get in the bundle.
Assuming that someday there could be many I didn't want you to feel the burden of loading all the content along with the SPA.
I also wanted the challenge to do something on my own without the help of yet another library.

So my solution was to keep each article as a separate file outside of the SPA.
I'm using markdown format for those.
Since I'm using [webpack](https://webpack.js.org/) to bundle my code, I looked toward it for some help at this point.
My thought was that if I know some "metadata" for each article I could go fetch it when someone wanted to read it.
So I created a script that runs when webpack creates the bundle.
This parses my articles and creates a JSON file full of the metadata I thought I would need.

The solution seems to work well, and the overall experience is enjoyable.
I hope you like it, but I'm always tinkering with things to make them better.

To wrap this up, I don't intend future writings to be about any of the subjects mentioned in this article.
I jump around a lot, and while I do love technology I don't want to limit myself as I have other thoughts and topics to share.
There will be times that I write a much more focused article about one specific technology and others that will just be fun.
I truly hope you find some value here.`,
  },
  {
    title:
      "How to use multiple runtimes (both natively and non-natively supported) in a single serverless microservice",
    slug: "lambda-and-multiple-runtimes",
    description:
      "So I've been working a lot with AWS lately. Specifically, I've been setting up microservices that encompass several AWS offerings for a single purpose.",
    date: "2019-03-26T00:00:00Z",
    author: "Aaron Todd",
    featured_image: null, // Update with Supabase Storage URL after uploading
    content: `I've been working a lot with [AWS](https://aws.amazon.com/) lately.  Specifically, I've been setting up serverless microservices using AWS Lambda along with several other offerings within the AWS ecosystem. To do this I've been leveraging [CloudFormation](https://aws.amazon.com/cloudformation/) and the [Serverless Framework](https://serverless.com/).

I won't bore you with all the details as there are other valuable resources to explain things. Once I got my application working the way I wanted to I stumbled on [this](https://serverless.com/blog/building-mutliple-runtimes) article by [Jeremy Coffield](https://twitter.com/functorgrease).  If you don't need to consider non-natively supported runtimes then it's a great read.

In my case, I'm working with Nodejs and PHP. Now before you choke on this please understand that much of my day-to-day is spent modernizing existing code which an investment has already been made. As much as I would like to spend the time rewriting things in cutting edge languages I really have to consider the cost of doing so. In some cases, it simply doesn't make sense to do an extensive rewrite.

Moving on, I'm going to assume that you already have the business logic of your Nodejs and PHP code ready to go.  The [project files](https://github.com/toddaa/aws-multiple-runtime-microservice) on GitHub will include some basic samples though if you need them. The rest of this will focus primarily on Serverless and deploying to AWS. To get going you'll need to create a serverless.yml file in the root of your project. Inside we'll specify the service name, provider, and some settings to help Serverless know where we're deploying to:
\`\`\`yml
service: test-service
provider:
  name: aws
  runtime: nodejs8.10
  region: us-east-1
\`\`\`

Next we add our Nodejs function:
\`\`\`yml
functions:
  js-app
    handler: app.handler
\`\`\`
At this point, we have a very simple function. The Javascript code could do a variety of things. This should all look pretty standard if you're at all familiar with the Serverless Framework.

Now we need to get things set up for PHP. Here is the next function we are adding to our serverless.yml file:
\`\`\`yml
  php-app
    handler: app.handler
    runtime: provided
    timeout: 120
    layers:
      - arn:aws:lambda:us-east-1:887080169480:layer:php71:9
      - {Ref: VendorLambdaLayer}
      - {Ref: RuntimeLambdaLayer}
\`\`\`
For the most part, this is exactly the same as the Nodejs function, but there are a few key differences. First, we're specifying "provided" as the value of \`runtime\`. This tells Lambda that it isn't using a native runtime and will need to immediately execute the \`/opt/bootstrap\` file.

We also have a few layers defined. Layers, in essence, allow you to include a group of files that are extracted within the Lambda environment before the function is executed. The first layer includes the actual PHP binary along with the libraries and configuration files it needs to run properly on its own. This is from a third party so I can't take credit for this one. I have created my own, but at the end of the day, I utilized this layer from [Stackery.io](https://www.stackery.io/).  My feeling is that since they are an AWS partner it will be better maintained and include more options available.

The Stackery layer is designed to run your function and return an HTTP response for consumption in a browser or be handled by another piece of code. In my case, I honestly don't need all that so we're going to override it a bit.

You'll notice that the other two layers listed do not have a full ARN. That's because we're actually going to use Serverless to create them while deploying our functions. \`Ref\` is an intrinsic function and will return the ARN once the layer is deployed. CloudFormation knows to wait for these before deploying the Lambda functions. Adding the layers is as simple as adding the following code:
\`\`\`yml
layers:
  runtime:
    path: layer/php
  vendor:
    path: vendor
\`\`\`

Here we have the layer names: 'runtime' and 'vendor'. Under each one, we specify the path that each layer will include. Back in the function, notice that these are referenced a bit different than you see here. Serverless appends 'LambdaLayer' and needs us to use Pascal Case to know what we're referencing.

The 'runtime' layer is where we're overriding the built-in functionality of the Stackery layer. Inside \`layer/php/\` we'll place our bootstrap file. As I said before this will deploy to \`/opt\` and if an existing one is found it will be replaced in order as the layers are stacked.

There's also a \`runtime.php\` file in \`/layer/php\` as well which handles the PHP child process.

Our bootstrap file looks like this:
\`\`\`bash
#!/bin/sh
/opt/bin/php -c /var/task/php.ini -d extension_dir=/opt/lib/php/7.1/modules /opt/runtime.php
\`\`\`

Here bash is being told to immediately fire PHP with extra settings from the php.ini file in our application and execute the \`runtime.php\` file. Here's what that file looks like:
\`\`\`php
<?php
require '/opt/autoload.php';

do {
    // Ask the runtime API for a request to handle.
    $request = getNextRequest();

    // Obtain the function name from the _HANDLER environment variable and ensure the functions code is available.
    $handlerParts = explode('.', $_ENV['_HANDLER']);
    $handlerFile = $handlerParts[0];
    $handlerFunction = $handlerParts[1];

    require_once $_ENV['LAMBDA_TASK_ROOT'] . '/' . $handlerFile . '.php';

    // Execute the desired function and obtain the response.
    $response = $handlerFunction($request['payload']);

    // Submit the response back to the runtime API.
    sendResponse($request['invocationId'], $response);
} while (true);


function getNextRequest(){
    $client = new \\GuzzleHttp\\Client();
    $response = $client->get('http://' . $_ENV['AWS_LAMBDA_RUNTIME_API'] . '/2018-06-01/runtime/invocation/next');

    return [
        'invocationId' => $response->getHeader('Lambda-Runtime-Aws-Request-Id')[0],
        'payload' => json_decode((string) $response->getBody(), true)
    ];
}

function sendResponse($invocationId, $response){
    $client = new \\GuzzleHttp\\Client();
    $client->post(
    'http://' . $_ENV['AWS_LAMBDA_RUNTIME_API'] . '/2018-06-01/runtime/invocation/' . $invocationId . '/response',
        ['body' => $response]
    );
}
\`\`\`

This script is where we're primarily getting the body of the message sent to Lambda. Since PHP isn't natively supported, we have to do this on our own, and it has to be done through an HTTP request to the runtime API. Since multiple messages could be sent to the function, we're requesting only one at a time.  However, once we have the message body, we start parsing the environment variables to figure out how to handle the data.  For that, I wanted to keep things as similar as possible to Nodejs, so we're parsing the \`$_ENV['_HANDLER']\` variable.  This variable will hold the same string \`app.handler\` used in the serverless.yml file.  We want the function named 'handler' to be executed from the file app.php. For PHP we have to include the \`app.php\` file from \`/var/task\` which is where our function ends up.  Once included, invoke the \`handler()\` function passing it the data we requested from the Lambda runtime API.

The 'vendor' layer is optional, but it really made things easier for me. Lambda has a 3MB limit before the web-based editor restricts you from modifying or even viewing your code. The AWS-SDK for PHP alone is larger than that, so if you need access to it, then you will immediately lose the ability to make quick changes without another full deploy. I found that this feature was particularly useful during development so moving PHP dependencies to its own layer made sense. Keep in mind though that if you do this, you'll have to use full paths to the PSR-4 autoloader in your PHP code.  This seemed like a small sacrifice.

At this point, the only thing left to do is a little housekeeping. Currently, both functions will be deployed at the same time, and each one will have all files for both the Nodejs code as well as the PHP code.  This makes things a little muddier than I like, but Serverless makes it fairly easy to remedy. Under the Nodejs function adding the following will exclude all the PHP files:

\`\`\`yml
    package:
      exclude:
        - vendor/**
        - php-src/**
        - "*.php"
        - composer.json
        - composer.lock
        - php.ini
\`\`\`

The same goes for the PHP function:

\`\`\`yml
    package:
      exclude:
        - node_modules/**
        - "*.js"
        - package.json
        - package-lock.json
\`\`\`

Now both functions will be deployed with only what they need to run, and your entire microservice application is still all contained in a single development repo.

To give this a try for yourself clone the [project files](https://github.com/toddaa/aws-multiple-runtime-microservice) and run \`serverless deploy\`.`,
  },
  {
    title: "Go Go Gadget...Gatsby",
    slug: "go-go-gadget-gatsby",
    description:
      "A few weeks ago I reached a wall with Create React App which I'm sure many others have already found.",
    date: "2019-05-09T00:00:00Z",
    author: "Aaron Todd",
    featured_image: null, // Update with Supabase Storage URL after uploading
    content: `A few weeks ago I reached a wall with [Create React App](https://github.com/facebook/create-react-app) which I'm sure many others have already found...SEO. Now before anyone assumes I'm bashing on this project, I'd like to say that Create React App is a handy starting point for React development. For me, it was the perfect boilerplate to allow me to get my feet wet and learn React. However, as my project needs grew it quickly became apparent that I needed more flexibility and server-side rendering. My options were either to eject and tweak a bunch of config on my own, or I could find a new framework.

[Gatsby](https://www.gatsbyjs.org/) has been on my list of frameworks to try out for some time. I have been reading and listening to several podcasts lately suggesting that it's going to quickly become the next Wordpress. Given that, and my new found love for React, I decided to bite the bullet and give it a try, and I'm extremely glad I did.

Since Gatsby is based on React, all my existing component fit right in. I did, of course, make minor changes so they would fit the mold even better, but they were very minor. Just like Create React App, Gatsby allows developers to get started really quickly. Literally, in just a few commands, you're ready to customize. Customization took very little time given the React components I had already developed. I would say at most it took me about 3 to 4 hours to port everything from Create React App to Gatsby.

Once I integrated my existing components to fit the Gatsby mold, I could pick up where I left off with SEO. Since everything is pre-rendered it all works as I had initially intended, and each page can modify the head for Facebook OpenGraph, Twitter cards, and whatever other metadata you want to include to optimize your pages.

So, if you're considering a site like mine, or anything requiring SEO considerations you might give Gatsby a shot. I'm fairly certain you will enjoy the developer experience.`,
  },
];

async function migrate() {
  console.log("Starting migration...\n");

  for (const post of posts) {
    console.log(`Converting: ${post.title}`);
    const html = await marked(post.content);

    const { error } = await supabase.from("posts").upsert(
      {
        ...post,
        content: html,
        published: true,
      },
      { onConflict: "slug" }
    );

    if (error) {
      console.error(`  Error: ${error.message}`);
    } else {
      console.log(`  Inserted successfully`);
    }
  }

  console.log("\nMigration complete!");
  console.log(
    "\nNote: Upload blog images to Supabase Storage and update the featured_image URLs for:"
  );
  console.log("  - lambda-and-multiple-runtimes");
  console.log("  - go-go-gadget-gatsby");
}

migrate();
