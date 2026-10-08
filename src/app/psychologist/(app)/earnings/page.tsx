"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { getPsychologist, CURRENT_PSYCHOLOGIST_ID } from "@/lib/mock-data";
import { formatINR } from "@/lib/utils";

const MONTHLY_TREND = [
  { month: "May", amount: 28400 },
  { month: "Jun", amount: 31200 },
  { month: "Jul", amount: 35600 },
  { month: "Aug", amount: 38900 },
  { month: "Sep", amount: 40100 },
  { month: "Oct", amount: 42800 },
];

export default function EarningsPage() {
  const psychologist = getPsychologist(CURRENT_PSYCHOLOGIST_ID)!;

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-3xl tracking-tight text-charcoal">Earnings</h1>
      <p className="mt-1 text-foreground-muted">A summary of your consultation income.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="This month" value={formatINR(psychologist.monthlyEarnings)} />
        <StatCard label="Completed sessions" value={String(psychologist.completedSessions)} />
        <StatCard label="Pending payout" value={formatINR(psychologist.pendingPayout)} />
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-display text-lg text-charcoal">Monthly trend</h2>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MONTHLY_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e6e1d7" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="#5c584f" />
              <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="#5c584f" tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip
                formatter={(v) => formatINR(Number(v))}
                contentStyle={{ borderRadius: 12, border: "1px solid #e6e1d7" }}
              />
              <Bar dataKey="amount" fill="#b8673a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface-muted p-5 text-sm text-foreground-muted">
        SahaMinds platform fees are deducted according to the applicable professional agreement.
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className="font-display text-2xl text-charcoal">{value}</p>
      <p className="text-sm text-foreground-muted">{label}</p>
    </div>
  );
}
