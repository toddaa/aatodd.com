import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: "About Aaron Todd — software developer from Lansing, Michigan.",
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aaron Todd",
    url: siteConfig.url,
    jobTitle: "Software Engineer",
    sameAs: Object.values(siteConfig.social),
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <script
        type="application/ld+json"
        // Static site config values, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-12">
        <h1 className="font-mono text-xs uppercase tracking-[0.2em] text-neon flex items-center gap-3 mb-4">
          <span className="text-muted-foreground">//</span>
          About
        </h1>
        <p className="text-sm text-muted-foreground font-mono">
          <span className="text-neon">$</span> whoami
        </p>
      </div>

      <div className="grid sm:grid-cols-[200px_1fr] gap-10 items-start">
        <div className="relative mx-auto sm:mx-0">
          <div className="w-48 h-48 sm:w-full sm:h-auto sm:aspect-square border border-border overflow-hidden relative">
            <Image
              src="/images/profile.png"
              alt="Aaron Todd"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute -inset-2 border border-neon/20 pointer-events-none" />
        </div>

        <div className="space-y-6">
          <div className="border border-border bg-card p-6">
            <h2 className="font-mono text-xs text-neon uppercase tracking-widest mb-3">
              // who I am
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              I&apos;m <strong className="text-foreground">Aaron Todd</strong>,
              a software developer from the Lansing, Michigan area. I consider
              myself a generalist — I&apos;ve spent a lot of time learning and
              getting to know many different technologies. Primarily, my career
              has revolved around web development, from single pages to extremely
              large SaaS platforms.
            </p>
          </div>

          <div className="border border-border bg-card p-6">
            <h2 className="font-mono text-xs text-neon uppercase tracking-widest mb-3">
              // what I do
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Some projects have required me to get very hands-on with
              underlying infrastructure — IP networking and routing, server
              hardware, and OS layer software. I&apos;ve even ported and
              customized open source software to architectures they
              weren&apos;t initially intended for. No need to reinvent the wheel
              if you can just adapt it, right?
            </p>
          </div>

          <div className="border border-border bg-card p-6">
            <h2 className="font-mono text-xs text-neon uppercase tracking-widest mb-3">
              // what excites me
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              These days I&apos;ve been focusing more on serverless technologies
              and running code on cloud platforms. I&apos;ve developed a real
              love for single page web apps using frameworks like React. Combined
              with CI/CD build automation, I&apos;ve learned that you can create
              a robust product that people get excited to be a part of.
            </p>
          </div>

          <div className="border border-border bg-card p-6">
            <h2 className="font-mono text-xs text-neon uppercase tracking-widest mb-3">
              // beyond code
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              I love sharing knowledge with others — collaborating not just on
              how to do things but also why. In my spare time, I love spending
              time with my wife Alison and our three children Samantha, Connor,
              and Emma. I&apos;m a unit leader to a Cub Scout group of almost 50
              kids. Being an Eagle Scout, jumping back into scouting for the next
              generation is a welcome opportunity.
            </p>
          </div>
        </div>
      </div>

      {/* Skills grid */}
      <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border">
        {[
          { label: "Frontend", items: "React, React Native, Next.js, TypeScript" },
          { label: "Backend", items: "Node.js, PHP, Laravel" },
          { label: "Infra", items: "AWS, Docker, CI/CD" },
          { label: "Other", items: "Networking, Linux, OSS" },
        ].map(({ label, items }) => (
          <div key={label} className="bg-background p-5">
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-neon mb-2">
              {label}
            </div>
            <div className="text-xs text-muted-foreground">{items}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
