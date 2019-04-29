import React from 'react';
import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => (
	<Layout>
		<SEO title="About Aaron" keywords={[`gatsby`, `application`, `react`]} />
			<div className="container-fluid h-100 content about">
				<div className="row h-100">
					<div className="col-12 col-md-9 offset-md-1">
						<h1>About</h1>
						<p>
							I'm Aaron, a software developer from the Lansing, Michigan area.
							I consider myself a generalist, and I've spent a lot of time learning and getting to know many different technologies.
							Primarily, my career has revolved around web development.
							I've worked on many projects ranging from single pages to extremely large SaaS platforms.
							Some of which has required me to get very hands-on with the underlying infrastructure including IP networking and routing, server hardware, and OS layer software.
							I've even ported and customized open source software to architectures they weren’t initially intended for.
							No need to reinvent the wheel if you can just adapt it right?
							I've also spent a lot of time focusing on the front end and more importantly the user’s experience in regards to the application.
							I love creating applications that people want to use!
						</p>
						<p>
							These days I've been focusing a little more on serverless technologies and running code on a cloud platform.
							I've developed a real love for single page web apps using frameworks such as React.
							Combined with CI/CD build automation tools I've learned that you can create a robust product that people get excited to be a part of.
						</p>
						<p>
							On top of all that, I love sharing my wealth of knowledge with others.
							Collaborating not only on how to do things but also why.
							I've learned that there are many different ways to do things.
							I'm happy to share my methods and be open-minded to alternative approaches too.
							It's always exciting to mix things up and develop new processes that work best for a team.
						</p>
						<p>
							In my spare time, I love spending time with my wife, Alison, and am heavily involved with our three children Samantha, Connor, and Emma.
							I'm a unit leader to a Cub Scout group of almost 50 kids.
							Being an Eagle Scout, I was raised learning how to be a service-oriented leader.
							Jumping back into those programs for the next generation, in my mind, is a welcome opportunity.
							Any scouting program will help mold the future of a child, and I want mine to learn to be bold in service to others.
							Plus, have all the fun along the way.
						</p>
					</div>
				</div>
			</div>
			</Layout>
)

export default AboutPage;