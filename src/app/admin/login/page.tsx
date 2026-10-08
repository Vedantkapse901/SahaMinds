"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <Link href="/" className="font-display text-xl text-charcoal">
        SAHA<span className="text-accent">MINDS</span>
      </Link>
      <p className="mt-6 text-xs font-medium uppercase tracking-wider text-accent">Admin console</p>
      <h1 className="font-display mt-2 text-2xl text-charcoal">Sign in to the platform console</h1>
      <p className="mt-2 text-sm text-foreground-muted">
        This is a prototype — any email and password will sign you in.
      </p>

      <form
        className="mt-7 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/admin");
        }}
      >
        <div>
          <Label>Email</Label>
          <Input type="email" defaultValue="admin@sahaminds.com" required />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" defaultValue="demo1234" required />
        </div>
        <Button type="submit" variant="primary" size="lg" className="w-full">Sign In</Button>
      </form>
    </div>
  );
}
