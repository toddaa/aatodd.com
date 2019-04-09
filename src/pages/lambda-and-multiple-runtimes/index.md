---
title: 'How to use multiple runtimes (both natively and non-natively supported) in a single serverless microservice'
description: 'So I’ve been working a lot with AWS lately.  Specifically, I’ve been setting up microservices that encompass several AWS offerings for a single purpose.'
date: '2019-03-26'
author: 'Aaron Todd'
image: analysis-blackboard-board-355952.jpg
---

I’ve been working a lot with [AWS](https://aws.amazon.com/) lately.  Specifically, I’ve been setting up serverless microservices using AWS Lambda along with several other offerings within the AWS ecosystem. To do this I’ve been leveraging [CloudFormation](https://aws.amazon.com/cloudformation/) and the [Serverless Framework](https://serverless.com/).

I won't bore you with all the details as there are other valuable resources to explain things. Once I got my application working the way I wanted to I stumbled on [this](https://serverless.com/blog/building-mutliple-runtimes) article by [Jeremy Coffield](https://twitter.com/functorgrease).  If you don't need to consider non-natively supported runtimes then it’s a great read.

In my case, I’m working with Nodejs and PHP. Now before you choke on this please understand that much of my day-to-day is spent modernizing existing code which an investment has already been made. As much as I would like to spend the time rewriting things in cutting edge languages I really have to consider the cost of doing so. In some cases, it simply doesn't make sense to do an extensive rewrite.

Moving on, I'm going to assume that you already have the business logic of your Nodejs and PHP code ready to go.  The [project files](https://github.com/toddaa/aws-multiple-runtime-microservice) on GitHub will include some basic samples though if you need them. The rest of this will focus primarily on Serverless and deploying to AWS. To get going you’ll need to create a serverless.yml file in the root of your project. Inside we'll specify the service name, provider, and some settings to help Serverless know where we're deploying to:
```yml{numberLines: true}
service: test-service
provider:
  name: aws
  runtime: nodejs8.10
  region: us-east-1
```

Next we add our Nodejs function:
```yml{numberLines: true}
functions:
  js-app
    handler: app.handler
```
At this point, we have a very simple function. The Javascript code could do a variety of things. This should all look pretty standard if you’re at all familiar with the Serverless Framework.

Now we need to get things set up for PHP. Here is the next function we are adding to our serverless.yml file:
```yml{numberLines: true}
  php-app
    handler: app.handler
    runtime: provided
    timeout: 120
    layers:
      - arn:aws:lambda:us-east-1:887080169480:layer:php71:9
      - {Ref: VendorLambdaLayer}
      - {Ref: RuntimeLambdaLayer}
```
For the most part, this is exactly the same as the Nodejs function, but there are a few key differences. First, we’re specifying "provided" as the value of `runtime`. This tells Lambda that it isn't using a native runtime and will need to immediately execute the `/opt/bootstrap` file.

We also have a few layers defined. Layers, in essence, allow you to include a group of files that are extracted within the Lambda environment before the function is executed. The first layer includes the actual PHP binary along with the libraries and configuration files it needs to run properly on its own. This is from a third party so I can’t take credit for this one. I have created my own, but at the end of the day, I utilized this layer from [Stackery.io](https://www.stackery.io/).  My feeling is that since they are an AWS partner it will be better maintained and include more options available.

The Stackery layer is designed to run your function and return an HTTP response for consumption in a browser or be handled by another piece of code. In my case, I honestly don’t need all that so we’re going to override it a bit.

You’ll notice that the other two layers listed do not have a full ARN. That’s because we’re actually going to use Serverless to create them while deploying our functions. `Ref` is an intrinsic function and will return the ARN once the layer is deployed. CloudFormation knows to wait for these before deploying the Lambda functions. Adding the layers is as simple as adding the following code:
```yml{numberLines: true}
layers:
  runtime:
    path: layer/php
  vendor:
    path: vendor
```

Here we have the layer names: 'runtime' and 'vendor'. Under each one, we specify the path that each layer will include. Back in the function, notice that these are referenced a bit different than you see here. Serverless appends 'LambdaLayer' and needs us to use Pascal Case to know what we're referencing.

The 'runtime' layer is where we're overriding the built-in functionality of the Stackery layer. Inside `layer/php/` we’ll place our bootstrap file. As I said before this will deploy to `/opt` and if an existing one is found it will be replaced in order as the layers are stacked.

There's also a `runtime.php` file in `/layer/php` as well which handles the PHP child process.

Our bootstrap file looks like this:
```bash{numberLines: true}
#!/bin/sh
/opt/bin/php -c /var/task/php.ini -d extension_dir=/opt/lib/php/7.1/modules /opt/runtime.php
```

Here bash is being told to immediately fire PHP with extra settings from the php.ini file in our application and execute the `runtime.php` file. Here’s what that file looks like:
```php{numberLines: true}
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
    $client = new \GuzzleHttp\Client();
    $response = $client->get('http://' . $_ENV['AWS_LAMBDA_RUNTIME_API'] . '/2018-06-01/runtime/invocation/next');

    return [
        'invocationId' => $response->getHeader('Lambda-Runtime-Aws-Request-Id')[0],
        'payload' => json_decode((string) $response->getBody(), true)
    ];
}

function sendResponse($invocationId, $response){
    $client = new \GuzzleHttp\Client();
    $client->post(
    'http://' . $_ENV['AWS_LAMBDA_RUNTIME_API'] . '/2018-06-01/runtime/invocation/' . $invocationId . '/response',
        ['body' => $response]
    );
}

```

This script is where we’re primarily getting the body of the message sent to Lambda. Since PHP isn't natively supported, we have to do this on our own, and it has to be done through an HTTP request to the runtime API. Since multiple messages could be sent to the function, we’re requesting only one at a time.  However, once we have the message body, we start parsing the environment variables to figure out how to handle the data.  For that, I wanted to keep things as similar as possible to Nodejs, so we're parsing the `$_ENV['_HANDLER']` variable.  This variable will hold the same string `app.handler` used in the serverless.yml file.  We want the function named 'handler' to be executed from the file app.php. For PHP we have to include the `app.php` file from `/var/task` which is where our function ends up.  Once included, invoke the `handler()` function passing it the data we requested from the Lambda runtime API.

The 'vendor' layer is optional, but it really made things easier for me. Lambda has a 3MB limit before the web-based editor restricts you from modifying or even viewing your code. The AWS-SDK for PHP alone is larger than that, so if you need access to it, then you will immediately lose the ability to make quick changes without another full deploy. I found that this feature was particularly useful during development so moving PHP dependencies to its own layer made sense. Keep in mind though that if you do this, you’ll have to use full paths to the PSR-4 autoloader in your PHP code.  This seemed like a small sacrifice.

At this point, the only thing left to do is a little housekeeping. Currently, both functions will be deployed at the same time, and each one will have all files for both the Nodejs code as well as the PHP code.  This makes things a little muddier than I like, but Serverless makes it fairly easy to remedy. Under the Nodejs function adding the following will exclude all the PHP files:

```yml{numberLines: true}
    package:
      exclude:
        - vendor/**
        - php-src/**
        - "*.php"
        - composer.json
        - composer.lock
        - php.ini
```

The same goes for the PHP function:

```yml{numberLines: true}
    package:
      exclude:
        - node_modules/**
        - "*.js"
        - package.json
        - package-lock.json

```

Now both functions will be deployed with only what they need to run, and your entire microservice application is still all contained in a single development repo.

To give this a try for yourself clone the [project files](https://github.com/toddaa/aws-multiple-runtime-microservice) and run `serverless deploy`.
