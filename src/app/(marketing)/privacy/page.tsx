import { Lock, Database, KeyRound, FileCheck2 } from "lucide-react";

const PRINCIPLES = [
  { icon: Database, title: "Data minimisation", body: "We collect only the information required to deliver a consultation safely and effectively." },
  { icon: Lock, title: "Secure access", body: "Access to personal information is restricted through authentication and session controls." },
  { icon: KeyRound, title: "Encryption", body: "Data in transit is encrypted, and sensitive fields are handled with additional care in storage." },
  { icon: FileCheck2, title: "Role-based access", body: "Clients, psychologists and administrators see only the information relevant to their role." },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <p className="text-sm font-medium uppercase tracking-wider text-accent">Privacy</p>
      <h1 className="font-display mt-3 text-3xl tracking-tight text-charcoal sm:text-4xl">
        Privacy-conscious by design.
      </h1>
      <p className="mt-4 text-foreground-muted">
        SahaMinds is designed around privacy-conscious product architecture.
        Below are the principles that guide how we handle information across
        the platform.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {PRINCIPLES.map((p) => (
          <div key={p.title} className="rounded-2xl border border-border bg-surface p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <p.icon className="h-5 w-5" />
            </div>
            <p className="mt-4 font-display text-lg text-charcoal">{p.title}</p>
            <p className="mt-2 text-sm text-foreground-muted">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-surface-muted p-6">
        <h2 className="font-display text-lg text-charcoal">Responsible healthcare positioning</h2>
        <p className="mt-2 text-sm text-foreground-muted">
          SahaMinds facilitates access to qualified psychological professionals.
          It is not a replacement for emergency medical care. If you are
          experiencing a mental health emergency, please contact your local
          emergency services or a crisis helpline immediately.
        </p>
      </div>

      <p className="mt-8 text-xs text-foreground-muted">
        This page describes product-level principles for this prototype and
        does not constitute a legal privacy policy or security guarantee.
      </p>
    </div>
  );
}
