"use client";

import Link from "next/link";
import { ShieldCheck, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PSYCHOLOGISTS } from "@/lib/mock-data";
import { formatINR } from "@/lib/utils";

export default function AdminPsychologistsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-3xl tracking-tight text-charcoal">Psychologists</h1>
      <p className="mt-1 text-foreground-muted">All professionals registered on the platform.</p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead className="bg-surface-muted text-left text-xs uppercase tracking-wider text-foreground-muted">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Specialisation</th>
              <th className="px-5 py-3">Fee</th>
              <th className="px-5 py-3">Rating</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {PSYCHOLOGISTS.map((p) => (
              <tr key={p.id} className="hover:bg-surface-muted/50">
                <td className="px-5 py-4">
                  <p className="font-medium text-charcoal">{p.name}</p>
                  <p className="text-xs text-foreground-muted">{p.designation}</p>
                </td>
                <td className="px-5 py-4 text-foreground-muted">{p.specialisations[0]}</td>
                <td className="px-5 py-4 text-foreground-muted">{formatINR(p.fee)}</td>
                <td className="px-5 py-4 text-foreground-muted">★ {p.rating}</td>
                <td className="px-5 py-4">
                  {p.verified ? (
                    <Badge variant="success"><ShieldCheck className="h-3 w-3" /> Verified</Badge>
                  ) : (
                    <Badge variant="warning"><ShieldAlert className="h-3 w-3" /> Pending</Badge>
                  )}
                </td>
                <td className="px-5 py-4 text-right">
                  <Link href={`/psychologists/${p.id}`} target="_blank">
                    <Button variant="outline" size="sm">View profile</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
