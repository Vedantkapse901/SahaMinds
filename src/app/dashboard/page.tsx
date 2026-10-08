"use client";

import Link from "next/link";
import { CalendarCheck2, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlatformStore } from "@/lib/store";
import { CURRENT_CLIENT } from "@/lib/mock-data";
import { ClientAppointmentCard } from "@/components/dashboard/client-appointment-card";

export default function ClientOverviewPage() {
  const allAppointments = usePlatformStore((s) => s.appointments);
  const appointments = allAppointments.filter((a) => a.clientId === CURRENT_CLIENT.id);
  const upcoming = appointments
    .filter((a) => a.status === "upcoming")
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  const activity = [...appointments]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-3xl tracking-tight text-charcoal">
        Good morning, {CURRENT_CLIENT.name.split(" ")[0]}.
      </h1>
      <p className="mt-1 text-foreground-muted">Your wellbeing deserves time.</p>

      <div className="mt-8">
        <h2 className="text-sm font-medium uppercase tracking-wider text-foreground-muted">Upcoming appointment</h2>
        {upcoming ? (
          <div className="mt-3">
            <ClientAppointmentCard appointment={upcoming} highlight />
          </div>
        ) : (
          <div className="mt-3 rounded-2xl border border-dashed border-border-strong p-8 text-center">
            <p className="text-foreground-muted">No upcoming appointments yet.</p>
            <Link href="/psychologists">
              <Button variant="accent" className="mt-4">Find a Psychologist</Button>
            </Link>
          </div>
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-sm font-medium uppercase tracking-wider text-foreground-muted">Recent activity</h2>
        <div className="mt-3 divide-y divide-border rounded-2xl border border-border bg-surface">
          {activity.map((a) => {
            const Icon = a.status === "completed" ? CalendarCheck2 : a.status === "cancelled" ? CalendarCheck2 : CalendarPlus;
            return (
              <div key={a.id} className="flex items-center gap-4 px-5 py-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-muted text-foreground-muted">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-charcoal">
                    {a.status === "upcoming" ? "Appointment booked" : a.status === "completed" ? "Consultation completed" : "Appointment cancelled"}
                  </p>
                  <p className="text-xs text-foreground-muted">
                    {a.weekday}, {a.time} · {a.createdAt}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
