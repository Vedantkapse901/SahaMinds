"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Video, Camera, ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlatformStore } from "@/lib/store";
import { getPsychologist } from "@/lib/mock-data";

export default function WaitingRoomClient() {
  const params = useParams<{ appointmentId: string }>();
  const router = useRouter();
  const appointment = usePlatformStore((s) =>
    s.appointments.find((a) => a.id === params.appointmentId)
  );
  const [secondsLeft, setSecondsLeft] = useState(342);
  const [joined, setJoined] = useState(false);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  if (!appointment) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-charcoal text-white">
        <div className="text-center">
          <p className="font-display text-xl">Appointment not found</p>
          <Button variant="outline" className="mt-4 border-white/20 text-white" onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const psychologist = getPsychologist(appointment.psychologistId);
  const mins = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
  const secs = (secondsLeft % 60).toString().padStart(2, "0");

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-charcoal px-5 py-16 text-white">
      <div className="noise-overlay" />
      <button
        onClick={() => router.back()}
        className="absolute left-6 top-6 flex items-center gap-2 text-sm text-white/60 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      {!joined ? (
        <div className="relative z-10 w-full max-w-md text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70">
            Consultation waiting room
          </span>
          <h1 className="font-display mt-6 text-2xl sm:text-3xl">Your session is ready</h1>
          <p className="mt-2 text-white/65">{psychologist?.name}</p>

          <div className="mt-8 font-display text-5xl tracking-tight">
            {mins}:{secs}
          </div>
          <p className="mt-1 text-sm text-white/50">Session begins in</p>

          <div className="mt-10 flex flex-col gap-3">
            <Button variant="accent" size="lg" onClick={() => setJoined(true)}>
              <Video className="h-4 w-4" /> Join Session
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => setTesting((v) => !v)}
            >
              <Camera className="h-4 w-4" /> Test Camera & Microphone
            </Button>
          </div>

          {testing && (
            <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4 text-left text-sm text-white/70">
              <p>Camera: <span className="text-success">Working</span></p>
              <p className="mt-1">Microphone: <span className="text-success">Working</span></p>
              <p className="mt-2 text-xs text-white/40">This is a simulated device check for the prototype.</p>
            </div>
          )}

          <p className="mt-8 inline-flex items-center gap-1.5 text-xs text-white/40">
            <ShieldCheck className="h-3.5 w-3.5" /> Privacy & Safety — this session is private to you and your psychologist.
          </p>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-lg text-center">
          <div className="aspect-video w-full rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
            <p className="text-white/40 text-sm">Video consultation interface — not implemented in this prototype.</p>
          </div>
          <p className="mt-4 text-white/70">You are now connected with {psychologist?.name}.</p>
          <Button variant="outline" className="mt-6 border-white/20 text-white hover:bg-white/10" onClick={() => router.push("/dashboard/appointments")}>
            End & Return to Dashboard
          </Button>
        </div>
      )}
    </div>
  );
}
