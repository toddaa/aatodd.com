import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: "About Aaron Todd — software engineer from Michigan.",
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

        <div className="space-y-4">
          <div className="border border-border bg-card p-6">
            <h2 className="font-mono text-xs text-neon uppercase tracking-widest mb-3">
              // who I am
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              I&apos;m <strong className="text-foreground">Aaron Todd</strong>,
              a full-stack software engineer from Michigan. I&apos;m a
              generalist by nature — I&apos;ve spent my career learning
              across the stack, from single-page apps to large-scale SaaS
              platforms.
            </p>
          </div>

          <div className="border border-border bg-card p-6">
            <h2 className="font-mono text-xs text-neon uppercase tracking-widest mb-3">
              // what I do
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              I&apos;ve gotten deep into the layers beneath the code —
              IP networking, server hardware, and OS-level tooling. I&apos;ve
              ported and customized open source software to architectures it
              was never designed for. No need to reinvent the wheel if you
              can adapt it, right?
            </p>
          </div>

          <div className="border border-border bg-card p-6">
            <h2 className="font-mono text-xs text-neon uppercase tracking-widest mb-3">
              // what excites me
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              These days I&apos;m deep in the cloud-native stack — serverless
              functions, containers, and infrastructure-as-code on AWS. I build
              web apps with React and Next.js, ship native mobile experiences
              with React Native, and tie it all together with automated CI/CD
              pipelines. I obsess over the developer experience that makes
              engineering teams want to move fast — and just as much about
              building tools that help non-technical teams streamline their
              workflows and get more done without writing a line of code.
            </p>
          </div>

          <div className="border border-border bg-card p-6">
            <h2 className="font-mono text-xs text-neon uppercase tracking-widest mb-3">
              // beyond code
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Outside of work, everything revolves around family — my wife
              Alison and our three kids Samantha, Connor, and Emma. As an Eagle
              Scout, I&apos;ve stayed deeply involved in scouting, serving as
              both a Scoutmaster and a Commissioner. Mentoring the next
              generation is one of the most rewarding things I do —
              it&apos;s an investment in the future of our world, one Scout
              at a time.
            </p>
          </div>
        </div>
      </div>

      {/* Skills grid */}
      <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border">
        {[
          { label: "Frontend", items: "React, React Native, Next.js, TypeScript" },
          { label: "Backend", items: "Node.js, PHP, Laravel" },
          { label: "Infra", items: "AWS, Serverless, Docker, CI/CD" },
          { label: "Other", items: "Networking, Linux, IaC" },
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
