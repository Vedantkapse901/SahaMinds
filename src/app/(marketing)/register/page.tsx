"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export default function ClientRegisterPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 700);
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-5 py-16 sm:px-8">
      <p className="text-sm font-medium uppercase tracking-wider text-accent">Get started</p>
      <h1 className="font-display mt-2 text-3xl tracking-tight text-charcoal">Create your account</h1>
      <p className="mt-2 text-sm text-foreground-muted">
        Book your first consultation in a few minutes. This is a prototype —
        no verification email will be sent.
      </p>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label>Full name</Label>
          <Input placeholder="Aarav Sharma" required />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" placeholder="you@example.com" required />
        </div>
        <div>
          <Label>Phone</Label>
          <Input type="tel" placeholder="+91 98765 43210" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="••••••••" required minLength={8} />
          </div>
          <div>
            <Label>Confirm password</Label>
            <Input type="password" placeholder="••••••••" required minLength={8} />
          </div>
        </div>

        <label className="flex items-start gap-2 pt-1 text-sm text-foreground-muted">
          <input type="checkbox" className="mt-0.5 rounded border-border-strong" required />
          I agree to the Terms of Use and Privacy principles.
        </label>

        <Button type="submit" variant="accent" size="lg" className="w-full" disabled={submitting}>
          {submitting ? "Creating account…" : "Create Account"}
        </Button>
      </form>

      <ul className="mt-6 space-y-1.5 text-xs text-foreground-muted">
        <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> Private, encrypted consultation history</li>
        <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> Choose psychologists by language, fee and availability</li>
      </ul>

      <p className="mt-6 text-center text-sm text-foreground-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-accent hover:underline">Log in</Link>
      </p>
    </div>
  );
}
