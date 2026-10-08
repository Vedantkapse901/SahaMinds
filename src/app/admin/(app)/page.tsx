"use client";

import { Users, Stethoscope, CalendarClock, Wallet, Percent, ShieldAlert } from "lucide-react";
import { usePlatformStore } from "@/lib/store";
import { PSYCHOLOGISTS, TODAY_ISO } from "@/lib/mock-data";
import { formatINR } from "@/lib/utils";

export default function AdminOverviewPage() {
  const { appointments, verifications } = usePlatformStore();
  const pendingVerifications = verifications.filter((v) => v.status === "pending").length;
  const gmv = appointments.reduce((sum, a) => sum + a.fee + a.platformFee, 0);
  const revenue = appointments.reduce((sum, a) => sum + a.platformFee, 0);
  const todaysConsultations = appointments.filter((a) => a.date === TODAY_ISO).length;

  const metrics = [
    { icon: Users, label: "Registered Users", value: "1,284" },
    { icon: Stethoscope, label: "Active Psychologists", value: String(PSYCHOLOGISTS.filter((p) => p.verified).length) },
    { icon: CalendarClock, label: "Today's Consultations", value: String(todaysConsultations || 12) },
    { icon: Wallet, label: "Monthly GMV", value: formatINR(gmv * 8) },
    { icon: Percent, label: "Platform Revenue", value: formatINR(revenue * 8) },
    { icon: ShieldAlert, label: "Pending Verifications", value: String(pendingVerifications) },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-3xl tracking-tight text-charcoal">Platform overview</h1>
      <p className="mt-1 text-foreground-muted">A snapshot of activity across SahaMinds.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-2xl border border-border bg-surface p-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
              <m.icon className="h-4 w-4" />
            </span>
            <p className="mt-4 font-display text-2xl text-charcoal">{m.value}</p>
            <p className="text-sm text-foreground-muted">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-sm font-medium uppercase tracking-wider text-foreground-muted">Recent appointment activity</h2>
        <div className="mt-3 divide-y divide-border rounded-2xl border border-border bg-surface">
          {appointments.slice(0, 6).map((a) => (
            <div key={a.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-sm font-medium text-charcoal">{a.clientName} → {a.psychologistId.replace(/-/g, " ")}</p>
                <p className="text-xs text-foreground-muted">{a.weekday}, {a.time} · {a.status}</p>
              </div>
              <span className="text-sm text-foreground-muted">{formatINR(a.fee + a.platformFee)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
