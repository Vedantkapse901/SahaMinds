import { LucideIcon } from "lucide-react";

export function EmptyPanel({
  icon: Icon,
  title,
  body,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border-strong bg-surface p-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-foreground-muted">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 font-display text-lg text-charcoal">{title}</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-foreground-muted">{body}</p>
      <p className="mt-4 text-xs font-medium uppercase tracking-wider text-accent">Prototype preview</p>
    </div>
  );
}
