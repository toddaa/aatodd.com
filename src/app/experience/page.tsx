import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aaron Todd's Experience",
  description:
    "Aaron Todd's professional experience. 15+ years of software engineering, cloud architecture on AWS, React/React Native development, and technical leadership.",
  alternates: { canonical: "/experience" },
};

const experience = [
  {
    title: "Director of Technology Services",
    company: "Roady's Truck Stops",
    period: "Jan 2025 - Present",
    bullets: [
      "Lead a team of developers and support staff delivering digital platforms serving a nationwide truck stop network with 50+ locations processing millions of fuel transactions annually",
      "Define technical strategy and architecture standards across web applications, mobile apps, and API integrations with major fuel card processors",
      "Hands-on development of customer-facing web applications and APIs using Node.js, React, and serverless AWS architecture",
      "Continue to own and evolve the mobile app (React Native), shipping features and performance improvements alongside cross-functional teams",
      "Maintain and extend CI/CD pipelines with GitHub Actions and AWS CDK, ensuring fast and reliable deployments across all platforms",
      "Integrated AI-assisted development workflows, improving team productivity and code quality",
      "Mentor engineers through code reviews, architectural guidance, and engineering standards",
    ],
  },
  {
    title: "Technical Lead",
    company: "Roady's Truck Stops",
    period: "May 2022 - Dec 2024",
    bullets: [
      "Architected and led migration of all database platforms to AWS RDS Aurora PostgreSQL, improving query performance by 40% and enabling horizontal scalability",
      "Directed development of customer-facing web applications using Node.js, React, and serverless AWS architecture serving thousands of daily active users",
      "Led development of a mobile app (React Native) from planning through delivery, coordinating cross-functional teams",
      "Implemented comprehensive CI/CD automation using GitHub Actions and AWS CDK, reducing deployment time from hours to minutes",
      "Established engineering standards, design principles, and SOPs; mentored developers through code reviews and architectural guidance",
    ],
  },
  {
    title: "Software & DevOps Developer",
    company: "Roady's Truck Stops",
    period: "Jul 2021 - May 2022",
    bullets: [
      "Designed and deployed containerized REST API on AWS ECS, replacing legacy ad-hoc endpoints with scalable, maintainable architecture",
      "Built multi-language SMS messaging infrastructure supporting high-volume customer communications",
      "Introduced CI/CD practices organization-wide; trained development team on automated testing and deployment workflows",
    ],
  },
  {
    title: "Web Application Developer",
    company: "The H.T. Hackney Co.",
    period: "Apr 2017 - Jul 2021",
    bullets: [
      "Deployed customer-facing e-commerce websites to AWS using CloudFormation for automated, scalable infrastructure",
      "Architected scalable REST API web services and integrated React into the e-commerce platform",
      "Created serverless computing solutions for resource-intensive report generation, reducing processing costs",
      "Promoted Agile development practices and introduced Git-based version control with GitLab CI/CD",
    ],
  },
  {
    title: "Senior Engineer",
    company: "LEIGHTRONIX, INC.",
    period: "Apr 2012 - Apr 2017",
    bullets: [
      "Developed multi-tenant SaaS video streaming platform delivering Live and VOD services with adaptive bitrate streaming and geographically-aware CDN",
      "Built subscription and licensing infrastructure securing premium services across video server appliance product line",
      "Created encoding pipeline automation using local and AWS cloud services for media normalization at scale",
    ],
  },
  {
    title: "Network Administrator",
    company: "LEIGHTRONIX, INC.",
    period: "Jan 2001 - Apr 2012",
    bullets: [
      "Managed enterprise network infrastructure including VPN, firewall, and server administration",
      "Led data center migration and network architecture redesign",
    ],
  },
];

const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "August 2019",
  },
];

const leadership = [
  {
    role: "Council / Division Commissioner",
    org: "Michigan Crossroads Council (Scouting America)",
    period: "May 2023 - Present",
  },
  {
    role: "Scoutmaster",
    org: "Scout BSA",
    period: "Aug 2020 - Present",
  },
  {
    role: "Pack Committee Chair",
    org: "Cub Scouts",
    period: "Aug 2019 - Present",
  },
  {
    role: "Eagle Scout",
    org: "Boy Scouts of America",
    period: "May 1999",
  },
];

export default function WorkPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://aatodd.com" },
          { "@type": "ListItem", position: 2, name: "Experience", item: "https://aatodd.com/experience" },
        ],
      },
      {
        "@type": "WebPage",
        url: "https://aatodd.com/experience",
        name: "Aaron Todd - Experience",
        description:
          "Aaron Todd professional experience: 15+ years of software engineering, cloud architecture, React development, and technical leadership.",
        about: { "@id": "https://aatodd.com/#person" },
      },
    ],
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <script
        type="application/ld+json"
        // Static page values, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-12">
        <h1 className="font-mono text-xs uppercase tracking-[0.2em] text-neon flex items-center gap-3 mb-4">
          <span className="text-muted-foreground" aria-hidden="true">//</span>
          Experience
        </h1>
        <p className="text-sm text-muted-foreground font-mono">
          <span className="text-neon">$</span> git log --oneline career
        </p>
      </div>

      {/* Experience */}
      <section className="mb-16">
        <h2 className="font-mono text-xs text-neon uppercase tracking-widest mb-6 flex items-center gap-3">
          <span className="text-muted-foreground">//</span>
          Experience
        </h2>
        <div className="space-y-4">
          {experience.map((job, i) => (
            <div
              key={i}
              className="border border-border bg-card p-6 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                <div>
                  <h3 className="font-semibold tracking-tight">
                    {job.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </div>
                <span className="font-mono text-[0.65rem] text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                  {job.period}
                </span>
              </div>
              <ul className="space-y-1.5">
                {job.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                  >
                    <span className="text-neon font-mono text-xs mt-1 shrink-0">
                      &gt;
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-16">
        <h2 className="font-mono text-xs text-neon uppercase tracking-widest mb-6 flex items-center gap-3">
          <span className="text-muted-foreground">//</span>
          Certifications
        </h2>
        <div className="space-y-4">
          {certifications.map((cert, i) => (
            <div
              key={i}
              className="border border-border bg-card p-6 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1"
            >
              <div>
                <h3 className="font-semibold tracking-tight">{cert.name}</h3>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              </div>
              <span className="font-mono text-[0.65rem] text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                {cert.date}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership & Community */}
      <section>
        <h2 className="font-mono text-xs text-neon uppercase tracking-widest mb-6 flex items-center gap-3">
          <span className="text-muted-foreground">//</span>
          Leadership & Community
        </h2>
        <div className="space-y-4">
          {leadership.map((item, i) => (
            <div
              key={i}
              className="border border-border bg-card p-6 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1"
            >
              <div>
                <h3 className="font-semibold tracking-tight">{item.role}</h3>
                <p className="text-sm text-muted-foreground">{item.org}</p>
              </div>
              <span className="font-mono text-[0.65rem] text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                {item.period}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
