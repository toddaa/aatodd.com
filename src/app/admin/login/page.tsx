"use client";

import { useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/admin/callback`,
          shouldCreateUser: false,
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-sm px-4 py-32">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Admin Login</h1>
        <p className="text-sm text-muted-foreground mt-2 font-mono">
          <span className="text-neon">$</span> authenticate --method=magic-link
        </p>
      </div>

      {sent ? (
        <div className="rounded-lg border border-neon/50 bg-neon/5 p-6 text-center">
          <p className="text-sm text-foreground">
            Check your email for the magic link.
          </p>
          <p className="text-xs text-muted-foreground mt-2 font-mono">
            Sent to {email}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoFocus
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading || !email}>
            {loading ? "Sending..." : "Send Magic Link"}
          </Button>
        </form>
      )}
    </div>
  );
}
