"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { usePlatformStore } from "@/lib/store";
import { CURRENT_PSYCHOLOGIST_ID } from "@/lib/mock-data";

const EXTRA_CLIENTS = [
  { name: "Sanya Kapoor", lastSession: "2026-09-29", nextSession: "2026-10-14", sessions: 6, status: "active" },
  { name: "Vikram Rao", lastSession: "2026-09-25", nextSession: "—", sessions: 3, status: "inactive" },
  { name: "Neha Joshi", lastSession: "2026-10-01", nextSession: "2026-10-11", sessions: 9, status: "active" },
  { name: "Imran Siddiqui", lastSession: "2026-08-30", nextSession: "—", sessions: 2, status: "inactive" },
];

export default function PsychologistClientsPage() {
  const [query, setQuery] = useState("");
  const allAppointments = usePlatformStore((s) => s.appointments);
  const appointments = allAppointments.filter((a) => a.psychologistId === CURRENT_PSYCHOLOGIST_ID);

  const fromAppointments = useMemo(() => {
    const byClient = new Map<string, { name: string; sessions: number; last: string; next: string }>();
    appointments.forEach((a) => {
      const entry = byClient.get(a.clientId) ?? { name: a.clientName, sessions: 0, last: "—", next: "—" };
      entry.sessions += 1;
      if (a.status === "completed") entry.last = a.date;
      if (a.status === "upcoming") entry.next = a.date;
      byClient.set(a.clientId, entry);
    });
    return Array.from(byClient.values());
  }, [appointments]);

  const rows = [
    ...fromAppointments.map((c) => ({ name: c.name, lastSession: c.last, nextSession: c.next, sessions: c.sessions, status: "active" as const })),
    ...EXTRA_CLIENTS,
  ].filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-3xl tracking-tight text-charcoal">Clients</h1>
      <p className="mt-1 text-foreground-muted">An overview of everyone you&apos;ve worked with.</p>

      <div className="relative mt-6 max-w-sm">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search clients…" className="pl-11" />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface-muted text-left text-xs uppercase tracking-wider text-foreground-muted">
            <tr>
              <th className="px-5 py-3">Client</th>
              <th className="px-5 py-3">Last session</th>
              <th className="px-5 py-3">Next appointment</th>
              <th className="px-5 py-3">Total sessions</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((c) => (
              <tr key={c.name} className="hover:bg-surface-muted/50">
                <td className="px-5 py-4 font-medium text-charcoal">{c.name}</td>
                <td className="px-5 py-4 text-foreground-muted">{c.lastSession}</td>
                <td className="px-5 py-4 text-foreground-muted">{c.nextSession}</td>
                <td className="px-5 py-4 text-foreground-muted">{c.sessions}</td>
                <td className="px-5 py-4">
                  <Badge variant={c.status === "active" ? "success" : "neutral"}>{c.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
