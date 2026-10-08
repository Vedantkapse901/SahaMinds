"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export default function PsychologistLoginPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-1 bg-charcoal p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <span className="font-display text-xl">
          SAHA<span className="text-accent">MINDS</span>
        </span>
        <div>
          <h1 className="font-display max-w-md text-3xl leading-tight">
            Your practice. Your patients. One professional workspace.
          </h1>
          <p className="mt-4 max-w-sm text-white/60">
            Manage your availability, appointments, clients and earnings from
            a single, premium dashboard built for psychologists.
          </p>
        </div>
        <p className="text-xs text-white/30">© 2026 SahaMinds · Prototype environment</p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <Link href="/" className="font-display text-xl text-charcoal lg:hidden">
            SAHA<span className="text-accent">MINDS</span>
          </Link>
          <h2 className="font-display mt-6 text-2xl text-charcoal lg:mt-0">Sign in to your workspace</h2>
          <p className="mt-2 text-sm text-foreground-muted">
            This is a prototype — any email and password will sign you in.
          </p>

          <form
            className="mt-7 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              router.push("/psychologist/dashboard");
            }}
          >
            <div>
              <Label>Email</Label>
              <Input type="email" defaultValue="ananya.mehta@sahaminds.com" required />
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" defaultValue="demo1234" required />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-foreground-muted">
                <input type="checkbox" className="rounded border-border-strong" defaultChecked /> Remember me
              </label>
              <Link href="#" className="text-accent hover:underline">Forgot password</Link>
            </div>
            <Button type="submit" variant="accent" size="lg" className="w-full">Sign In</Button>
          </form>

          <p className="mt-6 text-center text-sm text-foreground-muted">
            New to SahaMinds?{" "}
            <Link href="/psychologist/register" className="text-accent hover:underline">
              Apply to join as a psychologist
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
