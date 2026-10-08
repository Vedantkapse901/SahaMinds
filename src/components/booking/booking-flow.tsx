"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  Mic,
  Video,
  CalendarPlus,
  PartyPopper,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { cn, formatINR, parseLocalDate } from "@/lib/utils";
import { Psychologist, ConsultationType, Appointment } from "@/lib/types";
import { usePlatformStore } from "@/lib/store";
import { CURRENT_CLIENT, PLATFORM_FEE_RATE } from "@/lib/mock-data";

const STEP_LABELS = ["Date", "Time", "Details", "Your Info", "Payment", "Done"];

export function BookingFlow({
  psychologist,
  open,
  onOpenChange,
}: {
  psychologist: Psychologist;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { isSlotBlocked, bookAppointment } = usePlatformStore();

  const [step, setStep] = useState(0);
  const [dateIdx, setDateIdx] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [type, setType] = useState<ConsultationType>(psychologist.consultationTypes[0]);
  const [name, setName] = useState(CURRENT_CLIENT.name);
  const [email, setEmail] = useState(CURRENT_CLIENT.email);
  const [phone, setPhone] = useState(CURRENT_CLIENT.phone);
  const [reason, setReason] = useState("");
  const [paying, setPaying] = useState(false);
  const [bookedId, setBookedId] = useState<string | null>(null);

  const selectedDay = dateIdx !== null ? psychologist.availability[dateIdx] : null;
  const platformFee = Math.round(psychologist.fee * PLATFORM_FEE_RATE);
  const total = psychologist.fee + platformFee;

  function reset() {
    setStep(0);
    setDateIdx(null);
    setTime(null);
    setReason("");
    setPaying(false);
    setBookedId(null);
  }

  function handleClose(next: boolean) {
    if (!next) reset();
    onOpenChange(next);
  }

  function confirmAndPay() {
    setPaying(true);
    setTimeout(() => {
      if (!selectedDay || !time) return;
      const id = `appt-${Date.now()}`;
      const appointment: Appointment = {
        id,
        clientId: CURRENT_CLIENT.id,
        clientName: name,
        clientEmail: email,
        clientPhone: phone,
        reason: reason || undefined,
        psychologistId: psychologist.id,
        date: selectedDay.date,
        weekday: selectedDay.weekday,
        time,
        duration: psychologist.sessionDuration,
        type,
        status: "upcoming",
        paymentStatus: "paid",
        fee: psychologist.fee,
        platformFee,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      bookAppointment(appointment);
      setBookedId(id);
      setPaying(false);
      setStep(5);
    }, 1100);
  }

  const canContinue = useMemo(() => {
    if (step === 0) return dateIdx !== null;
    if (step === 1) return !!time;
    if (step === 3) return name.trim() && email.trim() && phone.trim();
    return true;
  }, [step, dateIdx, time, name, email, phone]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl p-0">
        <DialogTitle className="sr-only">Book a consultation</DialogTitle>

        {step < 5 && (
          <div className="flex items-center gap-3 border-b border-border px-6 py-5">
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="rounded-full p-1 text-foreground-muted hover:bg-surface-muted"
                aria-label="Back"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
            <div className="flex-1">
              <p className="text-xs font-medium uppercase tracking-wider text-accent">
                Step {step + 1} of 5 · {STEP_LABELS[step]}
              </p>
              <div className="mt-2 flex gap-1">
                {STEP_LABELS.slice(0, 5).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-full",
                      i <= step ? "bg-accent" : "bg-border"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="px-6 py-6">
          {step === 0 && (
            <div>
              <h3 className="font-display text-xl text-charcoal">Select a date</h3>
              <p className="mt-1 text-sm text-foreground-muted">
                Choose from {psychologist.name.split(" ").slice(-1)[0]}&apos;s available dates.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {psychologist.availability.map((day, idx) => {
                  const hasOpenSlot = day.slots.some(
                    (s) => s.available && !isSlotBlocked(psychologist.id, day.date, s.time)
                  );
                  return (
                    <button
                      key={day.date}
                      disabled={!hasOpenSlot}
                      onClick={() => {
                        setDateIdx(idx);
                        setTime(null);
                      }}
                      className={cn(
                        "flex flex-col items-start gap-1 rounded-xl border px-4 py-3 text-left transition-colors",
                        !hasOpenSlot && "cursor-not-allowed opacity-40",
                        dateIdx === idx
                          ? "border-accent bg-accent-soft"
                          : "border-border hover:border-border-strong"
                      )}
                    >
                      <CalendarDays className="h-4 w-4 text-foreground-muted" />
                      <span className="text-sm font-medium text-charcoal">{day.weekday}</span>
                      <span className="text-xs text-foreground-muted">
                        {parseLocalDate(day.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 1 && selectedDay && (
            <div>
              <h3 className="font-display text-xl text-charcoal">Select a time</h3>
              <p className="mt-1 text-sm text-foreground-muted">
                {selectedDay.weekday}, {parseLocalDate(selectedDay.date).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}
              </p>
              {(["morning", "afternoon", "evening"] as const).map((period) => {
                const slots = selectedDay.slots.filter((s) => s.period === period);
                if (!slots.length) return null;
                return (
                  <div key={period} className="mt-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-foreground-muted">{period}</p>
                    <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {slots.map((s) => {
                        const blocked = isSlotBlocked(psychologist.id, selectedDay.date, s.time);
                        const disabled = !s.available || blocked;
                        return (
                          <button
                            key={s.time}
                            disabled={disabled}
                            onClick={() => setTime(s.time)}
                            className={cn(
                              "rounded-lg border px-3 py-2 text-sm transition-colors",
                              disabled && "cursor-not-allowed border-border bg-surface-muted text-foreground-muted/50 line-through",
                              !disabled && time === s.time && "border-accent bg-accent-soft text-charcoal",
                              !disabled && time !== s.time && "border-border hover:border-border-strong"
                            )}
                          >
                            {s.time}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {step === 2 && selectedDay && (
            <div>
              <h3 className="font-display text-xl text-charcoal">Consultation details</h3>
              <div className="mt-5 space-y-3 rounded-xl border border-border bg-surface-muted p-4 text-sm">
                <Row label="Psychologist" value={psychologist.name} />
                <Row label="Date" value={`${selectedDay.weekday}, ${parseLocalDate(selectedDay.date).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}`} />
                <Row label="Time" value={time ?? ""} />
                <Row label="Session duration" value={`${psychologist.sessionDuration} minutes`} />
                <Row label="Consultation fee" value={formatINR(psychologist.fee)} />
              </div>

              <p className="mt-5 text-sm font-medium text-charcoal">Consultation type</p>
              <div className="mt-2 flex gap-3">
                {psychologist.consultationTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={cn(
                      "flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors",
                      type === t ? "border-accent bg-accent-soft text-charcoal" : "border-border text-foreground-muted hover:border-border-strong"
                    )}
                  >
                    {t === "video" ? <Video className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    {t === "video" ? "Video" : "Audio"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="font-display text-xl text-charcoal">Your details</h3>
              <p className="mt-1 text-sm text-foreground-muted">
                Used only to confirm and manage your appointment.
              </p>
              <div className="mt-5 space-y-4">
                <div>
                  <Label>Full name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                  <Label>Reason for consultation (optional)</Label>
                  <Textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Briefly share what's on your mind — this stays private."
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && selectedDay && (
            <div>
              <h3 className="font-display text-xl text-charcoal">Payment</h3>
              <div className="mt-5 space-y-3 rounded-xl border border-border bg-surface-muted p-4 text-sm">
                <Row label="Consultation fee" value={formatINR(psychologist.fee)} />
                <Row label="Platform / service fee" value={formatINR(platformFee)} />
                <div className="border-t border-border pt-3">
                  <Row label="Total" value={formatINR(total)} bold />
                </div>
              </div>
              <p className="mt-4 text-xs text-foreground-muted">
                This is a simulated payment for prototype purposes. No real transaction will occur.
              </p>
              <Button
                variant="accent"
                size="lg"
                className="mt-5 w-full"
                onClick={confirmAndPay}
                disabled={paying}
              >
                {paying ? "Processing payment…" : `Confirm & Pay ${formatINR(total)}`}
              </Button>
            </div>
          )}

          {step === 5 && selectedDay && (
            <div className="py-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success-soft text-success">
                <Check className="h-7 w-7" />
              </div>
              <h3 className="font-display mt-5 text-2xl text-charcoal">Appointment confirmed</h3>
              <p className="mt-3 text-foreground-muted">{psychologist.name}</p>
              <p className="text-foreground-muted">
                {selectedDay.weekday}, {time}
              </p>
              <p className="text-foreground-muted">
                {psychologist.sessionDuration}-minute {type} consultation
              </p>

              <div className="mt-7 flex flex-col gap-2 sm:flex-row">
                <Button variant="outline" className="flex-1">
                  <CalendarPlus className="h-4 w-4" /> Add to Calendar
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => {
                    handleClose(false);
                    router.push("/dashboard/appointments");
                  }}
                >
                  View Appointment
                </Button>
              </div>
              <p className="mt-5 inline-flex items-center gap-1.5 text-xs text-foreground-muted">
                <PartyPopper className="h-3.5 w-3.5" /> A confirmation has been added to your dashboard.
              </p>
            </div>
          )}
        </div>

        {step < 4 && (
          <div className="flex justify-end border-t border-border px-6 py-4">
            <Button disabled={!canContinue} onClick={() => setStep((s) => s + 1)}>
              Continue
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-foreground-muted">{label}</span>
      <span className={cn("text-charcoal", bold && "font-display text-lg")}>{value}</span>
    </div>
  );
}
