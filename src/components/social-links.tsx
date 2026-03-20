import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { siteConfig } from "@/lib/constants";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export function SocialLinks({ className }: { className?: string }) {
  const links = [
    { href: siteConfig.social.twitter, icon: Twitter, label: "Twitter" },
    { href: siteConfig.social.github, icon: Github, label: "GitHub" },
    { href: siteConfig.social.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: siteConfig.social.facebook, icon: Facebook, label: "Facebook" },
    { href: siteConfig.social.tiktok, icon: TikTokIcon, label: "TikTok" },
    { href: siteConfig.social.instagram, icon: Instagram, label: "Instagram" },
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
