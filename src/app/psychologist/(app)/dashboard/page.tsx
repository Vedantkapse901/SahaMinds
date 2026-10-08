"use client";

import { CalendarClock, Users, Wallet, Sparkles } from "lucide-react";
import { getPsychologist, CURRENT_PSYCHOLOGIST_ID } from "@/lib/mock-data";
import { usePlatformStore } from "@/lib/store";
import { formatINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function PsychologistOverviewPage() {
  const psychologist = getPsychologist(CURRENT_PSYCHOLOGIST_ID)!;
  const allAppointments = usePlatformStore((s) => s.appointments);
  const appointments = allAppointments.filter((a) => a.psychologistId === CURRENT_PSYCHOLOGIST_ID);

  const today = psychologist.availability[0];
  const upcoming = appointments.filter((a) => a.status === "upcoming");
  const todaysAppointments = appointments.filter(
    (a) => a.date === today.date && a.status === "upcoming"
  );

  const kpis = [
    { icon: CalendarClock, label: "Today's Sessions", value: String(todaysAppointments.length || 4) },
    { icon: Sparkles, label: "Upcoming", value: String(upcoming.length) },
    { icon: Wallet, label: "This Month", value: formatINR(psychologist.monthlyEarnings) },
    { icon: Users, label: "Active Clients", value: "67" },
  ];

  const scheduleDemo = [
    { time: "09:00 AM", client: "Client A" },
    { time: "11:30 AM", client: "Client B" },
    { time: "04:00 PM", client: "Client C" },
    { time: "06:30 PM", client: "Client D" },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-3xl tracking-tight text-charcoal">
        Good morning, {psychologist.name.replace("Dr. ", "Dr. ")}.
      </h1>
      <p className="mt-1 text-foreground-muted">Here&apos;s what today looks like.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-border bg-surface p-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
              <k.icon className="h-4 w-4" />
            </span>
            <p className="mt-4 font-display text-2xl text-charcoal">{k.value}</p>
            <p className="text-sm text-foreground-muted">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-sm font-medium uppercase tracking-wider text-foreground-muted">Today&apos;s schedule</h2>
        <div className="mt-3 divide-y divide-border rounded-2xl border border-border bg-surface">
          {todaysAppointments.length > 0 ? (
            todaysAppointments.map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="flex items-center gap-4">
                  <span className="w-20 shrink-0 text-sm font-medium text-charcoal">{a.time}</span>
                  <span className="text-sm text-foreground-muted">{a.clientName}</span>
                </div>
                <Badge variant="accent">{a.type}</Badge>
              </div>
            ))
          ) : (
            scheduleDemo.map((s) => (
              <div key={s.time} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="flex items-center gap-4">
                  <span className="w-20 shrink-0 text-sm font-medium text-charcoal">{s.time}</span>
                  <span className="text-sm text-foreground-muted">{s.client}</span>
                </div>
                <Badge variant="neutral">video</Badge>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
