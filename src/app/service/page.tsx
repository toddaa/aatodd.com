import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Service",
  description:
    "Aaron Todd's Scouting America service: Eagle Scout (Class of 1999), Commissioner, Scoutmaster, and lifelong volunteer.",
};

type RoleEntry = {
  role: string;
  org: string;
  period?: string;
};

const currentRoles: RoleEntry[] = [
  {
    role: "President Ford Division Commissioner",
    org: "Michigan Crossroads Council",
    period: "May 2023 - Present",
  },
  {
    role: "Troop 45 Scoutmaster",
    org: "Scouts BSA",
    period: "Aug 2020 - Present",
  },
  {
    role: "Pack 45 Committee Chair",
    org: "Cub Scouts",
    period: "Aug 2019 - Present",
  },
];

const pastRoles: RoleEntry[] = [
  {
    role: "Wood Badge Troop Guide",
    org: "Training Staff",
    period: "2022",
  },
  {
    role: "Pack 45 Cubmaster",
    org: "Cub Scouts",
    period: "2016-2019",
  },
  {
    role: "Assistant Scoutmaster",
    org: "Scouts BSA",
    period: "2000",
  },
];

const youthRoles: RoleEntry[] = [
  {
    role: "Eagle Scout",
    org: "Boy Scouts of America",
    period: "May 1999",
  },
  {
    role: "Vice Chief of Administration",
    org: "Order of the Arrow",
    period: "1998-2000",
  },
  {
    role: "Camp Staff",
    org: "Northwoods Scout Reservation",
    period: "1996-1998",
  },
];

export default function ServicePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* Page header */}
      <div className="mb-12">
        <h1 className="font-mono text-xs uppercase tracking-[0.2em] text-neon flex items-center gap-3 mb-4">
          <span className="text-muted-foreground">//</span>
          Service
        </h1>
        <p className="text-sm text-muted-foreground font-mono">
          <span className="text-neon">$</span> sudo duty --on-my-honor
        </p>
      </div>

      {/* Eagle Scout hero */}
      <section className="mb-16">
        <div className="grid sm:grid-cols-[240px_1fr] gap-8 items-start">
          <div className="relative mx-auto sm:mx-0 w-48 sm:w-full">
            <div className="relative aspect-[1023/1000] border border-border bg-card overflow-hidden">
              <Image
                src="/images/eagle-badge.jpg"
                alt="Aaron Todd's Eagle Scout badge"
                fill
                sizes="(min-width: 640px) 240px, 192px"
                className="object-contain p-4"
                priority
              />
            </div>
            <div className="absolute -inset-2 border border-neon/20 pointer-events-none" />
          </div>

          <div className="space-y-4">
            <div className="border border-border bg-card p-6">
              <h2 className="font-mono text-xs text-neon uppercase tracking-widest mb-3">
                {"// eagle scout"}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                I earned the rank of Eagle Scout in 1999, the culmination
                of years of camping, service, and learning to lead.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">My Eagle project</strong>{" "}
                was installing playground equipment at a local school and
                church. Most of it is still there. Not all of it, but what
                remains is still getting used to this day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="mb-16">
        <h2 className="font-mono text-xs text-neon uppercase tracking-widest mb-6 flex items-center gap-3">
          <span className="text-muted-foreground">//</span>
          Why it matters
        </h2>
        <div className="border border-border bg-card p-6">
          <p className="text-muted-foreground leading-relaxed">
            Scouting shaped who I am. The habits I carry into software engineering
            (preparation, duty, patience with process, leadership under
            pressure) started in a patrol and a campfire ring, taught to me
            by leaders who took the time to mentor a kid. That&apos;s why
            mentoring keeps showing up in everything I do now, with the
            Scouts coming up behind me, and with the engineers on the teams I've
            led. It&apos;s the most durable work I know how to do. Watching
            a Scout figure out a problem on his own for the first time, or
            seeing an engineer I&apos;ve coached grow into the lead on a
            project they once felt stuck on, never stops being the most
            rewarding part of any of it.
          </p>
        </div>
      </section>

      {/* Roles: current */}
      <section className="mb-16">
        <h2 className="font-mono text-xs text-neon uppercase tracking-widest mb-6 flex items-center gap-3">
          <span className="text-muted-foreground">//</span>
          Currently serving
        </h2>
        <div className="space-y-4">
          {currentRoles.map((r, i) => (
            <RoleCard key={i} role={r} />
          ))}
        </div>
      </section>

      {/* Roles: past */}
      <section className="mb-16">
        <h2 className="font-mono text-xs text-neon uppercase tracking-widest mb-6 flex items-center gap-3">
          <span className="text-muted-foreground">//</span>
          Past volunteer roles
        </h2>
        <div className="space-y-4">
          {pastRoles.map((r, i) => (
            <RoleCard key={i} role={r} />
          ))}
        </div>
      </section>

      {/* Youth */}
      <section className="mb-16">
        <h2 className="font-mono text-xs text-neon uppercase tracking-widest mb-6 flex items-center gap-3">
          <span className="text-muted-foreground">//</span>
          As a youth
        </h2>
        <div className="space-y-4">
          {youthRoles.map((r, i) => (
            <RoleCard key={i} role={r} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section>
        <h2 className="font-mono text-xs text-neon uppercase tracking-widest mb-6 flex items-center gap-3">
          <span className="text-muted-foreground">//</span>
          Get involved
        </h2>
        <a
          href="https://michiganscouting.org/annual-giving/"
          target="_blank"
          rel="noopener noreferrer"
          className="group block border border-neon/40 bg-card p-8 text-center transition-all duration-300 hover:border-neon hover:neon-box-glow"
        >
          <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-neon/60 mb-2">
            // Michigan Crossroads Council
          </div>
          <h3 className="text-2xl font-bold tracking-tight mb-3">
            Support Scouting in Michigan
          </h3>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-4 leading-relaxed">
            Your donation to the Michigan Crossroads Council funds camps,
            training, and scholarships for the Scouts coming up behind us:
            the next generation of leaders, adventurers, and servants.
          </p>
          <span className="inline-flex items-center gap-2 font-mono text-xs text-neon uppercase tracking-widest">
            michiganscouting.org/annual-giving
            <ExternalLink className="h-3 w-3" />
          </span>
        </a>
      </section>
    </div>
  );
}

function RoleCard({ role }: { role: RoleEntry }) {
  return (
    <div className="border border-border bg-card p-6 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
      <div>
        <h3 className="font-semibold tracking-tight">{role.role}</h3>
        <p className="text-sm text-muted-foreground">{role.org}</p>
      </div>
      {role.period && (
        <span className="font-mono text-[0.65rem] text-muted-foreground uppercase tracking-widest whitespace-nowrap">
          {role.period}
        </span>
      )}
    </div>
  );
}
