"use client";

import { Badge } from "@/components/ui/badge";
import { usePlatformStore } from "@/lib/store";
import { formatINR } from "@/lib/utils";

const STATUS_VARIANT = {
  upcoming: "accent",
  completed: "success",
  cancelled: "danger",
  "pending-verification": "warning",
} as const;

export default function AdminAppointmentsPage() {
  const appointments = usePlatformStore((s) => s.appointments);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-3xl tracking-tight text-charcoal">Platform appointments</h1>
      <p className="mt-1 text-foreground-muted">Every consultation booked across SahaMinds.</p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface-muted text-left text-xs uppercase tracking-wider text-foreground-muted">
            <tr>
              <th className="px-5 py-3">Client</th>
              <th className="px-5 py-3">Psychologist</th>
              <th className="px-5 py-3">Date & Time</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {appointments.map((a) => (
              <tr key={a.id} className="hover:bg-surface-muted/50">
                <td className="px-5 py-4 text-charcoal">{a.clientName}</td>
                <td className="px-5 py-4 text-foreground-muted">{a.psychologistId.replace(/-/g, " ")}</td>
                <td className="px-5 py-4 text-foreground-muted">{a.weekday}, {a.time}</td>
                <td className="px-5 py-4 text-foreground-muted">{formatINR(a.fee + a.platformFee)}</td>
                <td className="px-5 py-4">
                  <Badge variant={STATUS_VARIANT[a.status]}>{a.status.replace("-", " ")}</Badge>
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
