"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn, parseLocalDate } from "@/lib/utils";
import { getPsychologist, CURRENT_PSYCHOLOGIST_ID } from "@/lib/mock-data";
import { usePlatformStore } from "@/lib/store";

export default function PsychologistCalendarPage() {
  const psychologist = getPsychologist(CURRENT_PSYCHOLOGIST_ID)!;
  const { appointments, isSlotBlocked } = usePlatformStore();
  const mine = appointments.filter((a) => a.psychologistId === CURRENT_PSYCHOLOGIST_ID && a.status === "upcoming");
  const [dayIdx, setDayIdx] = useState(0);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight text-charcoal">Calendar</h1>
          <p className="mt-1 text-foreground-muted">Your sessions and availability at a glance.</p>
        </div>
      </div>

      <Tabs defaultValue="week" className="mt-8">
        <TabsList>
          <TabsTrigger value="day">Day</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
        </TabsList>

        <TabsContent value="day" className="mt-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {psychologist.availability.map((d, i) => (
              <button
                key={d.date}
                onClick={() => setDayIdx(i)}
                className={cn(
                  "shrink-0 rounded-xl border px-4 py-2 text-sm",
                  i === dayIdx ? "border-accent bg-accent-soft text-charcoal" : "border-border text-foreground-muted"
                )}
              >
                {d.weekday.slice(0, 3)} {parseLocalDate(d.date).getDate()}
              </button>
            ))}
          </div>
          <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-surface">
            {psychologist.availability[dayIdx].slots.map((s) => {
              const blocked = isSlotBlocked(psychologist.id, psychologist.availability[dayIdx].date, s.time);
              const appt = mine.find((a) => a.date === psychologist.availability[dayIdx].date && a.time === s.time);
              return (
                <div key={s.time} className="flex items-center justify-between px-5 py-3">
                  <span className="text-sm text-charcoal">{s.time}</span>
                  {appt ? (
                    <Badge variant="accent">{appt.clientName}</Badge>
                  ) : blocked || !s.available ? (
                    <Badge variant="neutral">Blocked</Badge>
                  ) : (
                    <Badge variant="success">Open</Badge>
                  )}
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="week" className="mt-6 overflow-x-auto">
          <div className="grid min-w-[800px] grid-cols-7 gap-3">
            {psychologist.availability.map((d) => (
              <div key={d.date} className="rounded-xl border border-border bg-surface p-3">
                <p className="text-xs font-medium text-charcoal">{d.weekday.slice(0, 3)}</p>
                <p className="text-xs text-foreground-muted">{parseLocalDate(d.date).getDate()}</p>
                <div className="mt-2 space-y-1.5">
                  {d.slots.map((s) => {
                    const blocked = isSlotBlocked(psychologist.id, d.date, s.time);
                    const appt = mine.find((a) => a.date === d.date && a.time === s.time);
                    return (
                      <div
                        key={s.time}
                        className={cn(
                          "truncate rounded-md px-1.5 py-1 text-[11px]",
                          appt
                            ? "bg-accent-soft text-charcoal"
                            : blocked || !s.available
                            ? "bg-surface-muted text-foreground-muted/50 line-through"
                            : "bg-success-soft text-success"
                        )}
                      >
                        {s.time} {appt ? `· ${appt.clientName}` : ""}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="month" className="mt-6">
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 30 }).map((_, i) => {
              const hasSession = mine.some((a) => parseLocalDate(a.date).getDate() === i + 1);
              return (
                <div key={i} className="flex aspect-square flex-col items-center justify-center rounded-lg border border-border bg-surface text-sm text-foreground-muted">
                  {i + 1}
                  {hasSession && <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />}
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
