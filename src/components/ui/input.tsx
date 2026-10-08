import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-xl border border-border-strong bg-surface px-4 text-sm text-foreground placeholder:text-foreground-muted/60 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent-soft disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-24 w-full rounded-xl border border-border-strong bg-surface px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted/60 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent-soft disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-sm font-medium text-foreground mb-1.5 block", className)}
      {...props}
    />
  );
}
