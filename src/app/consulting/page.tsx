import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Consulting",
  description:
    "Custom software consulting — web apps, mobile, cloud infrastructure, and business automation through Mastodon Nrgy.",
};

export default function ConsultingPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12">
        <h1 className="font-mono text-xs uppercase tracking-[0.2em] text-neon flex items-center gap-3 mb-4">
          <span className="text-muted-foreground">//</span>
          Consulting
        </h1>
        <p className="text-sm text-muted-foreground font-mono">
          <span className="text-neon">$</span> cat ./services
        </p>
      </div>

      <div className="space-y-4 max-w-3xl">
        <div className="border border-border bg-card p-6">
          <h2 className="font-mono text-xs text-neon uppercase tracking-widest mb-3">
            {/* what I build */}
            {"// what I build"}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            I help businesses turn ideas into working software — whether
            that&apos;s a customer-facing web app, a mobile experience, or
            the internal tools that keep a team running smoothly. From
            greenfield builds to modernizing legacy systems, I work across
            the full stack to deliver solutions that actually ship.
          </p>
        </div>

        <div className="border border-border bg-card p-6">
          <h2 className="font-mono text-xs text-neon uppercase tracking-widest mb-3">
            {/* how I work */}
            {"// how I work"}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Every engagement starts with understanding the problem — not
            just the technical requirements, but the business goals behind
            them. I embed with your team, move fast, and focus on outcomes
            over output. Whether you need architecture guidance, hands-on
            development, or help getting a product across the finish line,
            I scale to fit.
          </p>
        </div>

        <div className="border border-border bg-card p-6">
          <h2 className="font-mono text-xs text-neon uppercase tracking-widest mb-3">
            {/* areas of focus */}
            {"// areas of focus"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Web Applications",
              "Mobile Apps (React Native)",
              "Cloud Infrastructure & AWS",
              "Serverless Architecture",
              "CI/CD & DevOps",
              "Business Process Automation",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="text-neon font-mono text-xs">&gt;</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <a
          href="https://mastodonnrgy.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group block border border-neon/40 bg-card p-8 text-center transition-all duration-300 hover:border-neon hover:neon-box-glow"
        >
          <Image
            src="/images/mastodon-nrgy-logo.png"
            alt="Mastodon Nrgy Consulting"
            width={280}
            height={160}
            className="mx-auto mb-4"
          />
          <p className="text-sm text-muted-foreground mt-2 mb-4">
            Let&apos;s build something together.
          </p>
          <span className="inline-flex items-center gap-2 font-mono text-xs text-neon uppercase tracking-widest">
            Visit mastodonnrgy.com
            <ExternalLink className="h-3 w-3" />
          </span>
        </a>
      </div>
    </div>
  );
}
