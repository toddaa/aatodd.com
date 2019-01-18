---
path: '/why-and-why-now'
date: '2019-01-20'
title: 'Why, and Why Now'
author: 'Aaron Todd'
description: 'I know what you’re saying..there are so many blogs these days the last thing we need is another one with some guy spewing his opinions.'
---

Yup, I know what you’re saying...there are so many blogs these days the last thing we need is another one with some guy spewing his opinions. I really hesitated about this believe me.  For years I have hesitated. I don't consider myself a strong writer but know the only way to get better at something is to practice. It's my hope that as I practice, there might be a tidbit from my experiences that may help someone else.  So please keep in mind that much of this is merely my opinions. It’s entirely possible you may agree or disagree. Either is fine, and I'd love you hear your alternative stance. I'm not here to start a war; rather just a conversation where we can learn and evolve from each other.

So let's start with this sites current state of development. If you read my [about](/about) page you would understand that I love technology and being a developer.  I've also come to love working with [Amazon Web Services (AWS)](https://aws.amazon.com/) so naturally this site lives there. I've found that being able to stand up infrastructure in seconds that would take typically take hours to do is exciting. That still seems weird sometimes because I'm the guy who loves system build-out and making different systems work together for a project. With AWS I can still do all of that, but it happens in seconds from the luxury of my chair without a lot of hassle.

The setup for this site is fairly basic, and best of all it only costs a few dollars a month to run.  All files are being stored inside an [AWS S3](https://aws.amazon.com/s3/) bucket.  If you're not aware, this provides object storage and means I don't have to anticipate and allocate my storage needs up front. Instead, files can be added at any time and I can have as much as the service will allow.

Allong with S3, I’m using [AWS CloudFront](https://aws.amazon.com/cloudfront/) to make my buckets content globally available.  It also allows me to apply an SSL certificate for security.  [AWS Route 53](https://aws.amazon.com/route53) runs my domain name which with AWS is absolute cake because of their custom DNS extensions they have developed.

The site was developed in Javascript using the [React](https://reactjs.org/) library, which is another joy to deal with. For me, React helps force me to keep files small and managable. I split things up as much as possible into components and each typically gets its own file. You’d never know this though as everything gets bundled up into a single file before being deployed.  The result is known as a [Single Page Application](https://en.wikipedia.org/wiki/Single-page_application) or SPA for short.  This means that when you load my page you get more than just the one web page you visually see.  Instead you get it all which makes traversing from page to page really fast.

In addition, I also use [Bootstrap](https://getbootstrap.com/) to take much of the style out of my hands. Relying on their style sheets just makes development go faster.  There also several other libraries that do various things I won’t bore you with. They do their part so I don’t have to take the time to do it. Sometimes reinventing the wheel is a complete drag, and there are folks out there that have made some top-notch code available for anyone to use.

These articles are where things get tricky on me, and that's the one thing that you don't get in the bundle. Assuming that someday there could be many I didn't want you to feel the burden of loading all the content along with the SPA.  I also wanted the challenge to do something on my own without the help of yet another library.

So my solution was to keep each article as a separate file outside of the SPA.  I'm using markdown format for those.  Since I'm using [webpack](https://webpack.js.org/) to bundle my code, I looked toward it for some help at this point.  My thought was that if I know some "metadata" for each article I could go fetch it when someone wanted to read it.  So I created a script that runs when webpack creats the bundle.  This parses my articles and creates a JSON file full of the metadata I thought I would need.

The solution seems to work well and the overall experience is enjoyable.
I hope you like it, but I’m always tinkering with things to make them better.

To wrap this up, I dont intend future writing to be about any of the subjects mentioned in this article.
I jump around a lot, and while I do love technology I dont want to limit myself as I have other topics to share.
There will be times that I share a much more focused aticle about one specific technology, and others that will just be fun.
I hope you find some value here.