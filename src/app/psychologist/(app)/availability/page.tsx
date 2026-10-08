"use client";

import { useState } from "react";
import { Plus, X, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, parseLocalDate } from "@/lib/utils";
import { getPsychologist, CURRENT_PSYCHOLOGIST_ID } from "@/lib/mock-data";
import { usePlatformStore } from "@/lib/store";
import { WeeklyAvailabilityBlock } from "@/lib/types";

export default function AvailabilityPage() {
  const psychologist = getPsychologist(CURRENT_PSYCHOLOGIST_ID)!;
  const { isSlotBlocked, blockSlot, unblockSlot, blockedDates, blockDate, unblockDate } = usePlatformStore();
  const [weekly, setWeekly] = useState<WeeklyAvailabilityBlock[]>(psychologist.weeklyAvailability);
  const [vacationMode, setVacationMode] = useState(false);

  function removeRange(dayIdx: number, rangeIdx: number) {
    setWeekly((w) =>
      w.map((d, i) => (i === dayIdx ? { ...d, ranges: d.ranges.filter((_, ri) => ri !== rangeIdx) } : d))
    );
  }

  function addRange(dayIdx: number) {
    setWeekly((w) =>
      w.map((d, i) => (i === dayIdx ? { ...d, ranges: [...d.ranges, { start: "10:00 AM", end: "1:00 PM" }] } : d))
    );
  }

  const isDateBlocked = (date: string) =>
    blockedDates.some((b) => b.psychologistId === psychologist.id && b.date === date);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight text-charcoal">Availability</h1>
          <p className="mt-1 text-foreground-muted">
            Changes here affect what clients can book on your public profile.
          </p>
        </div>
        <Button
          variant={vacationMode ? "accent" : "outline"}
          onClick={() => setVacationMode((v) => !v)}
        >
          <Plane className="h-4 w-4" /> {vacationMode ? "Vacation mode on" : "Enable vacation mode"}
        </Button>
      </div>

      {vacationMode && (
        <div className="mt-6 rounded-xl border border-warning/30 bg-warning-soft px-5 py-3 text-sm text-warning">
          Vacation mode is on. Clients will see you as fully unavailable until you turn this off.
        </div>
      )}

      <section className="mt-8">
        <h2 className="text-sm font-medium uppercase tracking-wider text-foreground-muted">Weekly hours</h2>
        <div className="mt-3 divide-y divide-border rounded-2xl border border-border bg-surface">
          {weekly.map((day, dayIdx) => (
            <div key={day.day} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <span className="w-28 shrink-0 text-sm font-medium text-charcoal">{day.day}</span>
              <div className="flex flex-1 flex-wrap items-center gap-2">
                {day.ranges.length === 0 && <span className="text-sm text-foreground-muted">Unavailable</span>}
                {day.ranges.map((r, rangeIdx) => (
                  <span key={rangeIdx} className="flex items-center gap-2 rounded-full bg-surface-muted px-3 py-1.5 text-xs text-charcoal">
                    {r.start} — {r.end}
                    <button onClick={() => removeRange(dayIdx, rangeIdx)} aria-label="Remove">
                      <X className="h-3 w-3 text-foreground-muted hover:text-danger" />
                    </button>
                  </span>
                ))}
              </div>
              <Button variant="ghost" size="sm" onClick={() => addRange(dayIdx)}>
                <Plus className="h-3.5 w-3.5" /> Add
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-medium uppercase tracking-wider text-foreground-muted">
          Block specific slots
        </h2>
        <p className="mt-1 text-sm text-foreground-muted">
          Blocking a slot here removes it from your public booking page immediately — try it, then check the same slot on{" "}
          <a href={`/psychologists/${psychologist.id}`} target="_blank" className="text-accent hover:underline">
            your public profile
          </a>.
        </p>

        <div className="mt-4 space-y-4">
          {psychologist.availability.slice(0, 4).map((day) => (
            <div key={day.date} className="rounded-2xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-charcoal">
                  {day.weekday}, {parseLocalDate(day.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </p>
                <Button
                  variant={isDateBlocked(day.date) ? "accent" : "outline"}
                  size="sm"
                  onClick={() => (isDateBlocked(day.date) ? unblockDate(psychologist.id, day.date) : blockDate(psychologist.id, day.date))}
                >
                  {isDateBlocked(day.date) ? "Unblock date" : "Block entire date"}
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {day.slots.map((s) => {
                  const blocked = isSlotBlocked(psychologist.id, day.date, s.time) || isDateBlocked(day.date);
                  return (
                    <button
                      key={s.time}
                      disabled={!s.available}
                      onClick={() =>
                        blocked
                          ? unblockSlot(psychologist.id, day.date, s.time)
                          : blockSlot(psychologist.id, day.date, s.time)
                      }
                      className={cn(
                        "rounded-lg border px-3 py-1.5 text-xs transition-colors",
                        !s.available && "cursor-not-allowed opacity-40",
                        blocked ? "border-danger/40 bg-danger-soft text-danger" : "border-border text-foreground-muted hover:border-border-strong"
                      )}
                    >
                      {s.time}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
