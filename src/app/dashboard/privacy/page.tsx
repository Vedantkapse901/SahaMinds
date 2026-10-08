import { ShieldCheck, Smartphone, History } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClientPrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-3xl tracking-tight text-charcoal">Privacy & Security</h1>
      <p className="mt-1 text-foreground-muted">Manage how your data and account are protected.</p>

      <div className="mt-8 space-y-4">
        <Row icon={ShieldCheck} title="Two-factor authentication" body="Add an extra layer of security to your account." action="Enable" />
        <Row icon={Smartphone} title="Active sessions" body="You're signed in on 1 device." action="Manage" />
        <Row icon={History} title="Data & activity log" body="Review a history of actions taken on your account." action="View" />
      </div>
    </div>
  );
}

function Row({ icon: Icon, title, body, action }: { icon: React.ElementType; title: string; body: string; action: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-muted text-foreground-muted">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <p className="font-medium text-charcoal">{title}</p>
          <p className="text-sm text-foreground-muted">{body}</p>
        </div>
      </div>
      <Button variant="outline" size="sm">{action}</Button>
    </div>
  );
}
