"use client";

import Link from "next/link";
import { ArrowRight, Check, Circle } from "lucide-react";

import { useHealth } from "~/hooks/api/use-health";
import { useUser } from "~/hooks/api/use-getUser";
import { Button } from "~/components/ui/button";
import { Brand } from "~/components/brand";
import { ThemeToggle } from "~/components/theme-toggle";

export default function Home() {
  const { data } = useHealth();
  const { user } = useUser();

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#f8fbf9] text-stone-950 dark:bg-[#0a0a0b] dark:text-stone-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_8%_8%,rgba(16,185,129,0.16),transparent_32rem),radial-gradient(circle_at_92%_75%,rgba(74,222,128,0.10),transparent_34rem)] dark:bg-[radial-gradient(circle_at_8%_8%,rgba(255,255,255,0.055),transparent_28rem),radial-gradient(circle_at_90%_80%,rgba(148,163,184,0.04),transparent_30rem)]"
      />

      <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Brand />
        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          {user?.id ? (
            <Button
              asChild
              className="rounded-full bg-emerald-700 px-5 text-white shadow-lg shadow-emerald-900/15 hover:bg-emerald-600 dark:bg-stone-100 dark:text-stone-950 dark:shadow-none dark:hover:bg-white"
            >
              <Link href="/dashboard/forms">Open dashboard</Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                className="hidden rounded-full px-4 text-stone-600 hover:bg-emerald-950/5 hover:text-stone-950 dark:text-stone-400 dark:hover:bg-white/5 dark:hover:text-white sm:inline-flex"
              >
                <Link href="/signin">Sign in</Link>
              </Button>
              <Button
                asChild
                className="rounded-full bg-emerald-700 px-5 text-white shadow-lg shadow-emerald-900/15 hover:bg-emerald-600 dark:bg-stone-100 dark:text-stone-950 dark:shadow-none dark:hover:bg-white"
              >
                <Link href="/signup">Get started</Link>
              </Button>
            </>
          )}
        </div>
      </nav>

      <section className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center gap-14 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-[1.03fr_0.97fr] lg:py-16">
        <div className="max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-700/20 bg-emerald-600/10 px-3 py-1.5 text-xs font-semibold text-emerald-900 dark:border-white/10 dark:bg-white/[0.06] dark:text-stone-300">
            <Circle className="size-1.5 fill-emerald-600 text-emerald-600 dark:fill-stone-300 dark:text-stone-300" />
            Simple by design
          </div>
          <h1 className="text-balance text-5xl font-semibold leading-[1.01] tracking-[-0.06em] text-stone-950 sm:text-6xl lg:text-7xl dark:text-white">
            Better questions.
            <span className="block bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text font-normal italic text-transparent dark:from-white dark:to-stone-400">
              Clearer answers.
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-pretty text-base leading-7 text-stone-700 sm:text-lg dark:text-stone-400">
            Create thoughtful forms without the clutter. A calm, focused workspace for collecting
            exactly what you need.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-emerald-700 px-6 text-white shadow-xl shadow-emerald-900/15 hover:bg-emerald-600 dark:bg-stone-100 dark:text-stone-950 dark:shadow-none dark:hover:bg-white"
            >
              <Link href={user?.id ? "/dashboard/forms" : "/signup"}>
                {user?.id ? "Go to dashboard" : "Create your first form"}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            {!user?.id ? (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-stone-300 bg-white px-6 text-stone-800 shadow-sm hover:border-stone-400 hover:bg-stone-50 hover:text-stone-950 dark:border-white/12 dark:bg-white/[0.035] dark:text-stone-300 dark:shadow-none dark:hover:bg-white/[0.08] dark:hover:text-white"
              >
                <Link href="/signin">I already have an account</Link>
              </Button>
            ) : null}
          </div>
          <div className="mt-8 flex items-center gap-2 text-xs font-medium text-stone-600 dark:text-stone-500">
            <span
              className={`size-1.5 rounded-full ${
                data?.status ? "bg-emerald-600 dark:bg-sky-400" : "bg-stone-400 dark:bg-stone-600"
              }`}
            />
            {data?.status ? "All systems operational" : "Connecting to workspace…"}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:mx-0">
          <div className="absolute -inset-10 rounded-full bg-emerald-400/10 blur-3xl dark:bg-white/[0.025]" />
          <div className="relative rotate-[1.25deg] rounded-[2rem] border border-stone-300 bg-white p-3 shadow-2xl shadow-emerald-950/10 dark:border-white/10 dark:bg-white/[0.035] dark:shadow-black/30">
            <div className="rounded-[1.4rem] border border-stone-200 bg-white p-6 dark:border-white/[0.07] dark:bg-[#131315] sm:p-8">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800 dark:text-stone-400">
                    Event RSVP
                  </p>
                  <h2 className="mt-2 text-xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
                    An evening over chai
                  </h2>
                </div>
                <span className="rounded-full border border-stone-300 bg-stone-50 px-2.5 py-1 text-[10px] font-medium text-stone-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-stone-400">
                  3 questions
                </span>
              </div>
              <div className="space-y-6">
                {["What should we call you?", "Your email address", "Will you be joining us?"].map(
                  (label, index) => (
                    <div key={label}>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-xs font-medium text-emerald-800/70 dark:text-stone-500">
                          0{index + 1}
                        </span>
                        <p className="text-sm text-stone-700 dark:text-stone-300">{label}</p>
                      </div>
                      <div className="h-11 rounded-xl border border-stone-300 bg-stone-50/80 dark:border-white/[0.08] dark:bg-white/[0.03]" />
                    </div>
                  ),
                )}
              </div>
              <div className="mt-7 flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-medium text-white dark:bg-stone-100 dark:text-stone-950">
                <Check className="size-4" />
                Submit response
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
