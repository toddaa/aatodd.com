import Link from "next/link";
import { SocialLinks } from "@/components/social-links";

export function Footer() {
  return (
    <footer className="border-t relative z-[1]">
      <div className="container mx-auto max-w-5xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground tracking-wide">
            &copy; {new Date().getFullYear()} Aaron Todd
          </span>
          <span className="text-border">|</span>
          <Link
            href="/service"
            className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-neon/70 hover:text-neon transition-colors"
          >
            Eagle Scout
          </Link>
        </div>
        <SocialLinks className="flex items-center gap-4" />
      </div>
    </footer>
  );
}
