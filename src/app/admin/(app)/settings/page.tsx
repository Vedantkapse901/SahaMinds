"use client";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { usePlatformStore } from "@/lib/store";

export default function AdminSettingsPage() {
  const reset = usePlatformStore((s) => s.reset);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-3xl tracking-tight text-charcoal">Settings</h1>
      <p className="mt-1 text-foreground-muted">Platform configuration.</p>

      <div className="mt-8 space-y-4">
        <div>
          <Label>Platform fee rate (%)</Label>
          <Input type="number" defaultValue={7.5} step={0.1} />
        </div>
        <div>
          <Label>Support email</Label>
          <Input defaultValue="support@sahaminds.com" />
        </div>
        <Button variant="primary">Save settings</Button>
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-surface-muted p-5">
        <p className="text-sm font-medium text-charcoal">Reset prototype data</p>
        <p className="mt-1 text-sm text-foreground-muted">
          Clears any bookings or changes made during this demo session and restores the seed data.
        </p>
        <Button variant="outline" className="mt-3" onClick={reset}>
          Reset demo data
        </Button>
      </div>
    </div>
  );
}
