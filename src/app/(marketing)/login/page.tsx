"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export default function ClientLoginPage() {
  const router = useRouter();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16 sm:px-8">
      <p className="text-sm font-medium uppercase tracking-wider text-accent">Welcome back</p>
      <h1 className="font-display mt-2 text-3xl tracking-tight text-charcoal">Log in to SahaMinds</h1>
      <p className="mt-2 text-sm text-foreground-muted">
        This is a prototype — any email and password will sign you in.
      </p>

      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/dashboard");
        }}
      >
        <div>
          <Label>Email</Label>
          <Input type="email" placeholder="you@example.com" defaultValue="aarav.sharma@example.com" required />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" placeholder="••••••••" defaultValue="demo1234" required />
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-foreground-muted">
            <input type="checkbox" className="rounded border-border-strong" defaultChecked /> Remember me
          </label>
          <Link href="#" className="text-accent hover:underline">Forgot password</Link>
        </div>
        <Button type="submit" variant="accent" size="lg" className="w-full">
          Sign In
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-foreground-muted">
        New here?{" "}
        <Link href="/register" className="text-accent hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
