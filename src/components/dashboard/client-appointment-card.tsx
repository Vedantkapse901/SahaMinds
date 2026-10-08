"use client";

import { useRouter } from "next/navigation";
import { Video, Mic, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/lib/types";
import { getPsychologist } from "@/lib/mock-data";
import { usePlatformStore } from "@/lib/store";
import { formatINR } from "@/lib/utils";

const STATUS_VARIANT = {
  upcoming: "accent",
  completed: "success",
  cancelled: "danger",
  "pending-verification": "warning",
} as const;

export function ClientAppointmentCard({ appointment, highlight }: { appointment: Appointment; highlight?: boolean }) {
  const router = useRouter();
  const { updateAppointmentStatus } = usePlatformStore();
  const psychologist = getPsychologist(appointment.psychologistId);
  if (!psychologist) return null;

  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight ? "border-accent bg-accent-soft/40" : "border-border bg-surface"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-white"
            style={{ backgroundColor: psychologist.avatarColor }}
          >
            {psychologist.name.split(" ").slice(-1)[0][0]}
          </div>
          <div>
            <p className="font-medium text-charcoal">{psychologist.name}</p>
            <p className="text-sm text-foreground-muted">{psychologist.designation}</p>
          </div>
        </div>
        <Badge variant={STATUS_VARIANT[appointment.status]}>{appointment.status.replace("-", " ")}</Badge>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-foreground-muted">
        <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {appointment.weekday}, {appointment.time}</span>
        <span className="flex items-center gap-1.5">
          {appointment.type === "video" ? <Video className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          {appointment.duration} min · {appointment.type}
        </span>
        <span>{formatINR(appointment.fee)} · {appointment.paymentStatus}</span>
      </div>

      {appointment.status === "upcoming" && (
        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" onClick={() => router.push(`/consultation/${appointment.id}`)}>
            Join Consultation
          </Button>
          <Button size="sm" variant="outline">Reschedule</Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-danger hover:bg-danger-soft"
            onClick={() => updateAppointmentStatus(appointment.id, "cancelled")}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
