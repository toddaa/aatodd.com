import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-32 text-center">
      <div className="font-mono text-xs text-muted-foreground mb-4">
        <span className="text-neon">$</span> curl -I /this-page
      </div>
      <h1 className="text-7xl sm:text-8xl font-bold tracking-tight text-neon neon-glow-strong">
        404
      </h1>
      <p className="mt-4 font-mono text-sm text-muted-foreground">
        HTTP/1.1 404 Not Found. The page you&apos;re looking for doesn&apos;t
        exist.
      </p>
      <Button
        className="mt-8 font-mono text-xs uppercase tracking-widest"
        nativeButton={false}
        render={<Link href="/" />}
      >
        cd ~
      </Button>
    </div>
  );
}
