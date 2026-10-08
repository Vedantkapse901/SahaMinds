"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientAppointmentCard } from "@/components/dashboard/client-appointment-card";
import { usePlatformStore } from "@/lib/store";
import { CURRENT_CLIENT } from "@/lib/mock-data";
import { Appointment } from "@/lib/types";

export default function ClientAppointmentsPage() {
  const allAppointments = usePlatformStore((s) => s.appointments);
  const appointments = allAppointments.filter((a) => a.clientId === CURRENT_CLIENT.id);

  const upcoming = appointments.filter((a) => a.status === "upcoming");
  const past = appointments.filter((a) => a.status === "completed");
  const cancelled = appointments.filter((a) => a.status === "cancelled");

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-3xl tracking-tight text-charcoal">Appointments</h1>
      <p className="mt-1 text-foreground-muted">Manage your upcoming and past consultations.</p>

      <Tabs defaultValue="upcoming" className="mt-8">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({cancelled.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6 space-y-4">
          <AppointmentList items={upcoming} empty="No upcoming appointments." />
        </TabsContent>
        <TabsContent value="past" className="mt-6 space-y-4">
          <AppointmentList items={past} empty="No past consultations yet." />
        </TabsContent>
        <TabsContent value="cancelled" className="mt-6 space-y-4">
          <AppointmentList items={cancelled} empty="No cancelled appointments." />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AppointmentList({
  items,
  empty,
}: {
  items: Appointment[];
  empty: string;
}) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border-strong p-10 text-center text-foreground-muted">
        {empty}
      </div>
    );
  }
  return (
    <>
      {items.map((a) => (
        <ClientAppointmentCard key={a.id} appointment={a} />
      ))}
    </>
  );
}
