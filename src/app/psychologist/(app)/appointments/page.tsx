"use client";

import { useRouter } from "next/navigation";
import { Video, Mic } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePlatformStore } from "@/lib/store";
import { CURRENT_PSYCHOLOGIST_ID } from "@/lib/mock-data";
import { Appointment } from "@/lib/types";

export default function PsychologistAppointmentsPage() {
  const router = useRouter();
  const { appointments, updateAppointmentStatus } = usePlatformStore();
  const mine = appointments.filter((a) => a.psychologistId === CURRENT_PSYCHOLOGIST_ID);

  const today = mine[0]?.date;
  const todayList = mine.filter((a) => a.status === "upcoming" && a.date === today);
  const upcoming = mine.filter((a) => a.status === "upcoming");
  const completed = mine.filter((a) => a.status === "completed");
  const cancelled = mine.filter((a) => a.status === "cancelled");

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-3xl tracking-tight text-charcoal">Appointments</h1>
      <p className="mt-1 text-foreground-muted">Manage your client sessions.</p>

      <Tabs defaultValue="today" className="mt-8">
        <TabsList>
          <TabsTrigger value="today">Today ({todayList.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({cancelled.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-6 space-y-3">
          <List items={todayList} onJoin={(id) => router.push(`/consultation/${id}`)} onCancel={(id) => updateAppointmentStatus(id, "cancelled")} />
        </TabsContent>
        <TabsContent value="upcoming" className="mt-6 space-y-3">
          <List items={upcoming} onJoin={(id) => router.push(`/consultation/${id}`)} onCancel={(id) => updateAppointmentStatus(id, "cancelled")} />
        </TabsContent>
        <TabsContent value="completed" className="mt-6 space-y-3">
          <List items={completed} />
        </TabsContent>
        <TabsContent value="cancelled" className="mt-6 space-y-3">
          <List items={cancelled} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function List({
  items,
  onJoin,
  onCancel,
}: {
  items: Appointment[];
  onJoin?: (id: string) => void;
  onCancel?: (id: string) => void;
}) {
  if (!items.length) {
    return <div className="rounded-2xl border border-dashed border-border-strong p-10 text-center text-foreground-muted">Nothing here yet.</div>;
  }
  return (
    <>
      {items.map((a) => (
        <div key={a.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-5">
          <div>
            <p className="font-medium text-charcoal">{a.clientName}</p>
            <p className="text-sm text-foreground-muted">
              {a.weekday}, {a.time} · {a.duration} min
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="neutral">
              {a.type === "video" ? <Video className="h-3 w-3" /> : <Mic className="h-3 w-3" />} {a.type}
            </Badge>
            {onJoin && (
              <>
                <Button size="sm" variant="outline">View</Button>
                <Button size="sm" onClick={() => onJoin(a.id)}>Join</Button>
                <Button size="sm" variant="outline">Reschedule</Button>
                {onCancel && (
                  <Button size="sm" variant="ghost" className="text-danger hover:bg-danger-soft" onClick={() => onCancel(a.id)}>
                    Cancel
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
