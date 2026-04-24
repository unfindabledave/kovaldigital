import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060b17] disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-[var(--accent-foreground)] shadow-accent hover:-translate-y-0.5 hover:brightness-110 hover:shadow-accent-lg active:scale-[0.98]",
        outline:
          "border border-[var(--border)] bg-[color:rgb(255_255_255_/_0.01)] text-[var(--foreground)] hover:-translate-y-0.5 hover:border-[color:rgb(99_179_255_/_0.45)] hover:bg-[var(--muted)]",
        ghost:
          "text-[var(--muted-foreground)] hover:bg-[color:rgb(255_255_255_/_0.04)] hover:text-[var(--foreground)]",
      },
      size: {
        default: "h-12 px-6",
        lg: "h-14 px-7 text-base",
        sm: "h-10 px-4 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
