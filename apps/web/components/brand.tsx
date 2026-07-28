import Link from "next/link";
import { Leaf } from "lucide-react";

import { cn } from "~/lib/utils";

type BrandProps = {
  className?: string;
  compact?: boolean;
};

export function Brand({ className, compact = false }: BrandProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <span className="flex size-9 items-center justify-center rounded-xl border border-emerald-700/20 bg-emerald-600/10 text-emerald-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:border-white/10 dark:bg-white/[0.06] dark:text-stone-200 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <Leaf className="size-4 transition-transform duration-300 group-hover:-rotate-12" />
      </span>
      {!compact ? (
        <span className="text-[15px] font-semibold tracking-[-0.02em] text-stone-950 dark:text-stone-100">
          UvForm
        </span>
      ) : null}
    </Link>
  );
}
