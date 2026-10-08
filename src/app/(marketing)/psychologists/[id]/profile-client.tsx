"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Star,
  GraduationCap,
  Clock,
  Video,
  Mic,
  Languages,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatINR, parseLocalDate } from "@/lib/utils";
import { Psychologist } from "@/lib/types";
import { BookingFlow } from "@/components/booking/booking-flow";
import { usePlatformStore } from "@/lib/store";

export function ProfileClient({ psychologist }: { psychologist: Psychologist }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const { isSlotBlocked } = usePlatformStore();

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div
              className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl font-display text-3xl text-white"
              style={{ backgroundColor: psychologist.avatarColor }}
            >
              {psychologist.name.split(" ").slice(-1)[0][0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl text-charcoal sm:text-3xl">{psychologist.name}</h1>
              </div>
              <p className="mt-1 text-foreground-muted">{psychologist.designation}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                {psychologist.verified ? (
                  <Badge variant="success"><ShieldCheck className="h-3.5 w-3.5" /> Verified Professional</Badge>
                ) : (
                  <Badge variant="warning">Verification in progress</Badge>
                )}
                <span className="flex items-center gap-1 text-sm text-charcoal">
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" /> {psychologist.rating}
                  <span className="text-foreground-muted">({psychologist.reviewCount} reviews)</span>
                </span>
                <span className="text-sm text-foreground-muted">{psychologist.experienceYears}+ years experience</span>
              </div>
            </div>
          </div>

          <Section title="About">
            <p className="text-foreground-muted">{psychologist.about}</p>
          </Section>

          <Section title="Specialises in">
            <div className="flex flex-wrap gap-2">
              {psychologist.specialisations.map((s) => (
                <Badge key={s} variant="accent">{s}</Badge>
              ))}
            </div>
          </Section>

          <Section title="Qualifications">
            <ul className="space-y-2">
              {psychologist.qualifications.map((q) => (
                <li key={q} className="flex items-start gap-2 text-sm text-foreground-muted">
                  <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {q}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Languages">
            <div className="flex items-center gap-2 text-sm text-foreground-muted">
              <Languages className="h-4 w-4 text-accent" /> {psychologist.languages.join(" · ")}
            </div>
          </Section>

          <Section title="Reviews">
            {psychologist.reviews.length === 0 ? (
              <p className="text-sm text-foreground-muted">No reviews yet.</p>
            ) : (
              <div className="space-y-4">
                {psychologist.reviews.map((r) => (
                  <div key={r.id} className="rounded-xl border border-border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-sm font-medium text-charcoal">
                          {r.authorInitial}
                        </span>
                        <span className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${i < r.rating ? "fill-accent text-accent" : "text-border-strong"}`}
                            />
                          ))}
                        </span>
                      </div>
                      <span className="text-xs text-foreground-muted">{r.date}</span>
                    </div>
                    <p className="mt-3 text-sm text-foreground-muted">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </Section>

          <Section title="Availability this week">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {psychologist.availability.map((day) => {
                const openCount = day.slots.filter(
                  (s) => s.available && !isSlotBlocked(psychologist.id, day.date, s.time)
                ).length;
                return (
                  <div key={day.date} className="rounded-xl border border-border p-3 text-center">
                    <p className="text-sm font-medium text-charcoal">{day.weekday.slice(0, 3)}</p>
                    <p className="text-xs text-foreground-muted">
                      {parseLocalDate(day.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </p>
                    <p className={`mt-1 text-xs ${openCount ? "text-success" : "text-foreground-muted"}`}>
                      {openCount ? `${openCount} slots open` : "Fully booked"}
                    </p>
                  </div>
                );
              })}
            </div>
          </Section>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <p className="font-display text-2xl text-charcoal">
              {formatINR(psychologist.fee)}
              <span className="text-sm font-normal text-foreground-muted"> / session</span>
            </p>
            <div className="mt-4 space-y-2.5 text-sm text-foreground-muted">
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-accent" /> {psychologist.sessionDuration} minute sessions</div>
              <div className="flex items-center gap-2">
                {psychologist.consultationTypes.includes("video") && <Video className="h-4 w-4 text-accent" />}
                {psychologist.consultationTypes.includes("audio") && <Mic className="h-4 w-4 text-accent" />}
                {psychologist.consultationTypes.map((t) => t).join(" & ")} consultation
              </div>
            </div>
            <Button variant="accent" size="lg" className="mt-6 w-full" onClick={() => setBookingOpen(true)}>
              Book Consultation
            </Button>
            <p className="mt-3 text-center text-xs text-foreground-muted">
              Next available: {psychologist.nextAvailable}
            </p>
          </div>
        </div>
      </div>

      <BookingFlow psychologist={psychologist} open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8 border-t border-border pt-8 first:mt-8 first:border-t-0">
      <h2 className="font-display text-lg text-charcoal">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}
