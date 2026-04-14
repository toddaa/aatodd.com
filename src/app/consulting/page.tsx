import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Consulting with Aaron Todd",
  description:
    "Aaron Todd's custom software consulting. Web apps, React Native mobile, AWS cloud infrastructure, and business automation through Mastodon Nrgy.",
  alternates: { canonical: "/consulting" },
};

export default function ConsultingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://aatodd.com" },
          { "@type": "ListItem", position: 2, name: "Consulting", item: "https://aatodd.com/consulting" },
        ],
      },
      {
        "@type": "WebPage",
        url: "https://aatodd.com/consulting",
        name: "Consulting with Aaron Todd",
        description:
          "Aaron Todd custom software consulting: web apps, React Native mobile, AWS cloud infrastructure, and business automation through Mastodon Nrgy.",
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
            I help businesses turn ideas into working software, whether
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
            Every engagement starts with understanding the problem, not
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
              "Containerization & CI/CD",
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
            Have a project in mind? Get in touch through my consultancy,
            Mastodon Nrgy, to talk scope, timeline, and next steps.
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
