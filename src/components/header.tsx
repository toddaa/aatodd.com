"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/social-links";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "home" },
  { href: "/blog", label: "blog" },
  { href: "/experience", label: "experience" },
  { href: "/consulting", label: "consulting" },
  { href: "/service", label: "service" },
  { href: "/about", label: "about" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-xl">
      <div className="container mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label="Aaron Todd – home"
          className="font-mono text-sm text-neon neon-glow tracking-wide"
        >
          <span className="sr-only">Aaron Todd – </span>
          <span aria-hidden="true">&gt; aatodd.com</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "font-mono text-xs px-3 py-1.5 border border-transparent transition-all duration-300",
                pathname === href
                  ? "text-neon border-neon bg-neon-dim"
                  : "text-muted-foreground hover:text-neon hover:border-neon hover:bg-neon-dim"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <SocialLinks className="flex items-center gap-3" />
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden" />
            }
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 bg-card border-border">
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "font-mono text-sm px-3 py-2 border border-transparent transition-all",
                    pathname === href
                      ? "text-neon border-neon bg-neon-dim"
                      : "text-muted-foreground hover:text-neon"
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <SocialLinks className="flex items-center gap-4 mt-8 px-3" />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
