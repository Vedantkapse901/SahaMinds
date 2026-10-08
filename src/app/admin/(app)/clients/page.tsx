import { Users } from "lucide-react";
import { EmptyPanel } from "@/components/dashboard/empty-panel";
import { CURRENT_CLIENT } from "@/lib/mock-data";

export default function AdminClientsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-3xl tracking-tight text-charcoal">Clients</h1>
      <p className="mt-1 text-foreground-muted">Registered users of the platform.</p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead className="bg-surface-muted text-left text-xs uppercase tracking-wider text-foreground-muted">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Phone</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="px-5 py-4 font-medium text-charcoal">{CURRENT_CLIENT.name}</td>
              <td className="px-5 py-4 text-foreground-muted">{CURRENT_CLIENT.email}</td>
              <td className="px-5 py-4 text-foreground-muted">{CURRENT_CLIENT.phone}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <EmptyPanel
          icon={Users}
          title="Full user directory coming soon"
          body="This prototype shows the signed-in demo client. A production build would list all registered users here."
        />
      </div>
    </div>
  );
}
