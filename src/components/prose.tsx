import "./prose.css";

export function Prose({ html }: { html: string }) {
  // Content comes from admin-authored blog posts stored in Supabase,
  // not from user input. Trusted source.
  return (
    <div
      className="prose max-w-none prose-pre:bg-[#0e0e11] prose-pre:border prose-pre:border-border prose-pre:text-[#abb2bf] prose-code:before:content-none prose-code:after:content-none prose-a:text-neon prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-headings:text-foreground prose-headings:tracking-tight"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
