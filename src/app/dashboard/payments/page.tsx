"use client";

import { CreditCard } from "lucide-react";
import { usePlatformStore } from "@/lib/store";
import { CURRENT_CLIENT } from "@/lib/mock-data";
import { formatINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function ClientPaymentsPage() {
  const allAppointments = usePlatformStore((s) => s.appointments);
  const appointments = allAppointments.filter((a) => a.clientId === CURRENT_CLIENT.id);

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-3xl tracking-tight text-charcoal">Payments</h1>
      <p className="mt-1 text-foreground-muted">A record of your consultation payments.</p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead className="bg-surface-muted text-left text-xs uppercase tracking-wider text-foreground-muted">
            <tr>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Psychologist</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {appointments.map((a) => (
              <tr key={a.id}>
                <td className="px-5 py-4 text-foreground-muted">{a.createdAt}</td>
                <td className="px-5 py-4 text-charcoal">{a.psychologistId.replace("-", " ")}</td>
                <td className="px-5 py-4 text-charcoal">{formatINR(a.fee + a.platformFee)}</td>
                <td className="px-5 py-4">
                  <Badge variant={a.paymentStatus === "paid" ? "success" : a.paymentStatus === "refunded" ? "warning" : "neutral"}>
                    <CreditCard className="h-3 w-3" /> {a.paymentStatus}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
