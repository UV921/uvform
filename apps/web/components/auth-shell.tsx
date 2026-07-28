import { Quote } from "lucide-react";

import { Brand } from "~/components/brand";
import { ThemeToggle } from "~/components/theme-toggle";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative grid min-h-screen overflow-hidden bg-[#f8fbf9] dark:bg-[#0a0a0b] lg:grid-cols-[0.92fr_1.08fr]">
      <aside className="relative hidden overflow-hidden border-r border-emerald-950/10 bg-gradient-to-br from-emerald-950 via-[#0b2a1d] to-[#07110c] p-12 text-white dark:border-white/8 dark:from-[#19191b] dark:via-[#121214] dark:to-[#0a0a0b] lg:flex lg:flex-col">
        <Brand className="[&_span:first-child]:border-white/15 [&_span:first-child]:bg-white/10 [&_span:first-child]:text-white [&_span:last-child]:!text-white" />
        <div className="my-auto max-w-md">
          <div className="mb-8 flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07]">
            <Quote className="size-5 text-white/65" />
          </div>
          <blockquote className="text-3xl font-medium leading-snug tracking-[-0.035em] text-white">
            The best forms don&apos;t feel like forms. They feel like a thoughtful conversation.
          </blockquote>
          <p className="mt-6 text-sm text-white/55">Build less. Ask better.</p>
        </div>
        <p className="text-xs text-white/40">© {new Date().getFullYear()} UvForm</p>
        <div className="pointer-events-none absolute -right-36 -top-36 size-96 rounded-full bg-white/[0.06] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 -left-40 size-120 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 size-88 rounded-full border border-white/10" />
      </aside>
      <section className="relative flex min-h-screen flex-col px-5 py-6 sm:px-8 lg:px-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_5%,rgba(16,185,129,0.10),transparent_28rem)] dark:bg-[radial-gradient(circle_at_90%_5%,rgba(255,255,255,0.04),transparent_26rem)]"
        />
        <div className="relative flex items-center justify-between">
          <Brand />
          <ThemeToggle />
        </div>
        <div className="relative my-auto mx-auto w-full max-w-sm py-12">{children}</div>
      </section>
    </main>
  );
}
