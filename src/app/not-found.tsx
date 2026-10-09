import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-5 text-center">
      <p className="font-display text-7xl text-charcoal">404</p>
      <h1 className="font-display mt-4 text-2xl text-charcoal">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-2 max-w-sm text-sm text-foreground-muted">
        The page you&apos;re looking for may have moved or never existed.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/">
          <Button variant="primary">Back to home</Button>
        </Link>
        <Link href="/psychologists">
          <Button variant="outline">Find a psychologist</Button>
        </Link>
      </div>
    </div>
  );
}
