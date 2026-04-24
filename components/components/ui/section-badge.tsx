import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionBadge({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full border border-[color:rgb(99_179_255_/_0.45)] bg-[color:rgb(47_107_255_/_0.12)] px-5 py-2",
        className,
      )}
    >
      <motion.span
        className="h-2 w-2 rounded-full bg-[var(--accent)]"
        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-blue-200">
        {label}
      </span>
    </div>
  );
}
