"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, LoaderCircle } from "lucide-react";

import { useSignin } from "~/hooks/api/use-signin";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { AuthShell } from "~/components/auth-shell";

export default function SigninPage() {
  const router = useRouter();
  const { signInUserWithEmailAndPasswordAsync, isPending, isSuccess, error } = useSignin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await signInUserWithEmailAndPasswordAsync({
      email,
      password,
    });

    router.push("/dashboard/forms");
  };

  return (
    <AuthShell>
      <div className="mb-9">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800 dark:text-stone-400">
          Welcome back
        </p>
        <h1 className="text-3xl font-semibold tracking-[-0.04em] text-stone-950 dark:text-stone-50">
          Sign in
        </h1>
        <p className="mt-3 text-sm leading-6 text-stone-700 dark:text-stone-400">
          Pick up where you left off and keep building.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-stone-700 dark:text-stone-300">
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="h-11 rounded-xl border-stone-300 bg-white px-4 text-stone-950 shadow-sm placeholder:text-stone-400 focus-visible:border-emerald-600 focus-visible:ring-emerald-600/15 dark:border-white/12 dark:bg-white/[0.045] dark:text-stone-100 dark:shadow-none dark:placeholder:text-stone-600 dark:focus-visible:border-white/30 dark:focus-visible:ring-white/10"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-stone-700 dark:text-stone-300"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            className="h-11 rounded-xl border-stone-300 bg-white px-4 text-stone-950 shadow-sm placeholder:text-stone-400 focus-visible:border-emerald-600 focus-visible:ring-emerald-600/15 dark:border-white/12 dark:bg-white/[0.045] dark:text-stone-100 dark:shadow-none dark:placeholder:text-stone-600 dark:focus-visible:border-white/30 dark:focus-visible:ring-white/10"
          />
        </div>

        {error ? (
          <p
            role="alert"
            className="rounded-xl border border-red-500/15 bg-red-500/[0.06] px-3 py-2.5 text-sm text-red-700 dark:text-red-300"
          >
            {error.message}
          </p>
        ) : null}
        {isSuccess ? (
          <p className="rounded-xl border border-emerald-600/20 bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-800 dark:border-sky-300/15 dark:bg-sky-300/[0.06] dark:text-sky-200">
            Signed in. Taking you to your workspace…
          </p>
        ) : null}

        <Button
          type="submit"
          className="h-11 w-full rounded-xl bg-emerald-700 text-white shadow-lg shadow-emerald-900/15 hover:bg-emerald-600 dark:bg-stone-100 dark:text-stone-950 dark:shadow-none dark:hover:bg-white"
          disabled={isPending}
        >
          {isPending ? <LoaderCircle className="size-4 animate-spin" /> : null}
          {isPending ? "Signing in…" : "Sign in"}
          {!isPending ? <ArrowRight className="size-4" /> : null}
        </Button>
      </form>

      <p className="mt-7 text-center text-sm text-stone-700 dark:text-stone-400">
        New to ChaiForms?{" "}
        <Link
          href="/signup"
          className="font-semibold text-emerald-800 hover:text-emerald-700 dark:text-stone-100 dark:hover:text-white"
        >
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
