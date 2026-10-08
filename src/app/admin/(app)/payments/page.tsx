"use client";

import { Badge } from "@/components/ui/badge";
import { usePlatformStore } from "@/lib/store";
import { formatINR } from "@/lib/utils";

export default function AdminPaymentsPage() {
  const appointments = usePlatformStore((s) => s.appointments);
  const totalGMV = appointments.reduce((sum, a) => sum + a.fee + a.platformFee, 0);
  const totalRevenue = appointments.reduce((sum, a) => sum + a.platformFee, 0);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-3xl tracking-tight text-charcoal">Payments</h1>
      <p className="mt-1 text-foreground-muted">Platform-wide transaction activity.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="font-display text-2xl text-charcoal">{formatINR(totalGMV)}</p>
          <p className="text-sm text-foreground-muted">Gross transaction value</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="font-display text-2xl text-charcoal">{formatINR(totalRevenue)}</p>
          <p className="text-sm text-foreground-muted">Platform revenue</p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead className="bg-surface-muted text-left text-xs uppercase tracking-wider text-foreground-muted">
            <tr>
              <th className="px-5 py-3">Transaction</th>
              <th className="px-5 py-3">Client</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {appointments.map((a) => (
              <tr key={a.id}>
                <td className="px-5 py-4 text-foreground-muted">{a.id}</td>
                <td className="px-5 py-4 text-charcoal">{a.clientName}</td>
                <td className="px-5 py-4 text-foreground-muted">{formatINR(a.fee + a.platformFee)}</td>
                <td className="px-5 py-4">
                  <Badge variant={a.paymentStatus === "paid" ? "success" : a.paymentStatus === "refunded" ? "warning" : "neutral"}>
                    {a.paymentStatus}
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
