import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CURRENT_CLIENT } from "@/lib/mock-data";
import { initials } from "@/lib/utils";

export default function ClientProfilePage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-3xl tracking-tight text-charcoal">Profile</h1>
      <p className="mt-1 text-foreground-muted">Your personal details.</p>

      <div className="mt-8 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-charcoal font-display text-xl text-white">
          {initials(CURRENT_CLIENT.name)}
        </div>
        <Button variant="outline" size="sm">Change photo</Button>
      </div>

      <div className="mt-8 space-y-4">
        <div>
          <Label>Full name</Label>
          <Input defaultValue={CURRENT_CLIENT.name} />
        </div>
        <div>
          <Label>Email</Label>
          <Input defaultValue={CURRENT_CLIENT.email} />
        </div>
        <div>
          <Label>Phone</Label>
          <Input defaultValue={CURRENT_CLIENT.phone} />
        </div>
        <Button variant="primary" className="mt-2">Save changes</Button>
      </div>
    </div>
  );
}
