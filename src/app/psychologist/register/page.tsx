"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, FileUp, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { usePlatformStore } from "@/lib/store";
import { VerificationRequest } from "@/lib/types";
import { todayLocalISODate } from "@/lib/utils";

const DOCS = [
  { key: "qualification", label: "Qualification documents" },
  { key: "registration", label: "Professional registration" },
  { key: "identity", label: "Identity verification" },
];

export default function PsychologistRegisterPage() {
  const submitVerification = usePlatformStore((s) => s.submitVerification);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [uploaded, setUploaded] = useState<Record<string, boolean>>({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const allDocsAttached = DOCS.every((d) => uploaded[d.key]);
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allDocsAttached || password !== confirmPassword) return;
    setSubmitting(true);
    setTimeout(() => {
      const req: VerificationRequest = {
        id: `ver-${Date.now()}`,
        psychologistId: `pending-${Date.now()}`,
        psychologistName: name || "New Applicant",
        submittedAt: todayLocalISODate(),
        status: "pending",
        documents: DOCS.map((d) => ({
          label: d.label,
          status: "submitted",
        })),
      };
      submitVerification(req);
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  }

  if (submitted) {
    return (
      <div className="mx-auto flex min-h-[80vh] max-w-md flex-col items-center justify-center px-5 py-16 text-center sm:px-8">
        <Link href="/" className="font-display text-xl text-charcoal">
          SAHA<span className="text-accent">MINDS</span>
        </Link>
        <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-success-soft text-success">
          <Check className="h-7 w-7" />
        </div>
        <h1 className="font-display mt-6 text-2xl text-charcoal">Application submitted</h1>
        <p className="mt-3 text-sm text-foreground-muted">
          Thank you, {name || "there"}. Our team will review your documents and
          credentials. You&apos;ll be notified once your profile is verified
          and live on SahaMinds.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/psychologist/login">
            <Button variant="outline">Back to sign in</Button>
          </Link>
          <Link href="/">
            <Button variant="primary">Return home</Button>
          </Link>
        </div>
        <p className="mt-6 text-xs text-foreground-muted">
          Prototype note: this application now appears under{" "}
          <Link href="/admin/verification" className="text-accent hover:underline">
            Admin → Verification
          </Link>{" "}
          as pending.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
      <Link href="/" className="font-display text-xl text-charcoal">
        SAHA<span className="text-accent">MINDS</span>
      </Link>
      <p className="mt-8 text-sm font-medium uppercase tracking-wider text-accent">For psychologists</p>
      <h1 className="font-display mt-2 text-3xl tracking-tight text-charcoal">Apply to join SahaMinds</h1>
      <p className="mt-2 text-sm text-foreground-muted">
        Tell us about your practice. Your profile goes live once our team
        verifies your credentials.
      </p>

      <form className="mt-8 space-y-10" onSubmit={handleSubmit}>
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted">Personal details</h2>
          <div className="mt-4 space-y-4">
            <div>
              <Label>Full name</Label>
              <Input placeholder="Dr. Jane Doe" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="you@example.com" required />
              </div>
              <div>
                <Label>Phone</Label>
                <Input type="tel" placeholder="+91 98765 43210" required />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <Label>Confirm password</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  aria-invalid={passwordsMismatch}
                />
              </div>
            </div>
            {passwordsMismatch && (
              <p className="text-xs text-danger">Passwords don&apos;t match.</p>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted">Professional details</h2>
          <div className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Designation</Label>
                <Input placeholder="Clinical Psychologist" required />
              </div>
              <div>
                <Label>Years of experience</Label>
                <Input type="number" min={0} placeholder="5" required />
              </div>
            </div>
            <div>
              <Label>Specialisations</Label>
              <Input placeholder="Anxiety, Stress, Relationships" required />
            </div>
            <div>
              <Label>Languages</Label>
              <Input placeholder="English, Hindi" required />
            </div>
            <div>
              <Label>Qualifications</Label>
              <Textarea placeholder="M.Phil Clinical Psychology, TISS Mumbai&#10;RCI Licensed Psychologist" required />
            </div>
            <div>
              <Label>Short bio</Label>
              <Textarea placeholder="A brief introduction clients will see on your profile." />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted">Practice details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Consultation fee (₹)</Label>
              <Input type="number" min={0} placeholder="800" required />
            </div>
            <div>
              <Label>Session duration (min)</Label>
              <Input type="number" min={15} placeholder="45" required />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted">Verification documents</h2>
          <p className="mt-1 text-xs text-foreground-muted">
            Prototype note: these are simulated uploads — no files are stored.
          </p>
          <div className="mt-4 space-y-3">
            {DOCS.map((d) => (
              <button
                type="button"
                key={d.key}
                onClick={() => setUploaded((u) => ({ ...u, [d.key]: true }))}
                className="flex w-full items-center justify-between rounded-xl border border-dashed border-border-strong px-4 py-3 text-left text-sm transition-colors hover:border-accent"
              >
                <span className="flex items-center gap-2 text-charcoal">
                  <FileUp className="h-4 w-4 text-foreground-muted" /> {d.label}
                </span>
                {uploaded[d.key] ? (
                  <span className="flex items-center gap-1 text-xs text-success"><Check className="h-3.5 w-3.5" /> Attached</span>
                ) : (
                  <span className="text-xs text-foreground-muted">Click to attach</span>
                )}
              </button>
            ))}
          </div>
        </section>

        <div className="flex items-center gap-2 rounded-xl bg-surface-muted px-4 py-3 text-xs text-foreground-muted">
          <ShieldCheck className="h-4 w-4 shrink-0 text-accent" />
          Your profile stays private and unlisted until verification is complete.
        </div>

        <Button type="submit" variant="accent" size="lg" className="w-full" disabled={submitting || !allDocsAttached || passwordsMismatch}>
          {submitting ? "Submitting application…" : "Submit Application"}
        </Button>
        {!allDocsAttached && (
          <p className="text-center text-xs text-foreground-muted">
            Attach all three documents above to submit your application.
          </p>
        )}
      </form>

      <p className="mt-6 text-center text-sm text-foreground-muted">
        Already have an account?{" "}
        <Link href="/psychologist/login" className="text-accent hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
