import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--border)] bg-[var(--card)]/90 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,0,0,0.5)]",
        className,
      )}
      {...props}
    />
  );
}

export function GradientStrokeCard({
  className,
  innerClassName,
  children,
}: {
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-gradient-to-br from-[var(--accent)] via-[var(--accent-secondary)] to-[var(--accent)] p-[2px] shadow-accent",
        className,
      )}
    >
      <div className={cn("h-full rounded-[calc(1rem-2px)] bg-[var(--card)]", innerClassName)}>
        {children}
      </div>
    </div>
  );
}
