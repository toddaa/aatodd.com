import { Github, Linkedin, Twitter } from "lucide-react";
import { siteConfig } from "@/lib/constants";

export function SocialLinks({ className }: { className?: string }) {
  const links = [
    { href: siteConfig.social.twitter, icon: Twitter, label: "Twitter" },
    { href: siteConfig.social.github, icon: Github, label: "GitHub" },
    { href: siteConfig.social.linkedin, icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <div className={className}>
      {links.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-muted-foreground hover:text-neon transition-all duration-300 hover:drop-shadow-[0_0_8px_var(--neon-dim)]"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
