"use client";

import { FileCheck2, ShieldCheck, ShieldX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePlatformStore } from "@/lib/store";

export default function AdminVerificationPage() {
  const { verifications, setVerificationStatus } = usePlatformStore();
  const pending = verifications.filter((v) => v.status === "pending");
  const resolved = verifications.filter((v) => v.status !== "pending");

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-3xl tracking-tight text-charcoal">Psychologist verification</h1>
      <p className="mt-1 text-foreground-muted">Review submitted documents before granting verified status.</p>

      <h2 className="mt-8 text-sm font-medium uppercase tracking-wider text-foreground-muted">
        Pending verification ({pending.length})
      </h2>
      <div className="mt-3 space-y-4">
        {pending.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border-strong p-8 text-center text-foreground-muted">
            No pending verifications.
          </div>
        )}
        {pending.map((v) => (
          <div key={v.id} className="rounded-2xl border border-border bg-surface p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium text-charcoal">{v.psychologistName}</p>
                <p className="text-xs text-foreground-muted">Submitted {v.submittedAt}</p>
              </div>
              <Badge variant="warning">Pending</Badge>
            </div>

            <div className="mt-4 space-y-2">
              {v.documents.map((d) => (
                <div key={d.label} className="flex items-center justify-between rounded-lg bg-surface-muted px-4 py-2.5 text-sm">
                  <span className="flex items-center gap-2 text-charcoal">
                    <FileCheck2 className="h-4 w-4 text-accent" /> {d.label}
                  </span>
                  <span className="text-xs capitalize text-foreground-muted">{d.status}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex gap-2">
              <Button variant="primary" size="sm" onClick={() => setVerificationStatus(v.id, "approved")}>
                <ShieldCheck className="h-4 w-4" /> Approve
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-danger hover:bg-danger-soft"
                onClick={() => setVerificationStatus(v.id, "rejected")}
              >
                <ShieldX className="h-4 w-4" /> Reject
              </Button>
              <Button variant="ghost" size="sm">Review documents</Button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-sm font-medium uppercase tracking-wider text-foreground-muted">Resolved</h2>
      <div className="mt-3 divide-y divide-border rounded-2xl border border-border bg-surface">
        {resolved.map((v) => (
          <div key={v.id} className="flex items-center justify-between px-5 py-4">
            <span className="text-sm text-charcoal">{v.psychologistName}</span>
            <Badge variant={v.status === "approved" ? "success" : "danger"}>{v.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
