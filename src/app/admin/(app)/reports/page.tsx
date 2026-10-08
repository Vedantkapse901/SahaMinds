import { BarChart3 } from "lucide-react";
import { EmptyPanel } from "@/components/dashboard/empty-panel";

export default function AdminReportsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-3xl tracking-tight text-charcoal">Reports</h1>
      <p className="mt-1 text-foreground-muted">Platform-wide analytics and exports.</p>
      <div className="mt-8">
        <EmptyPanel
          icon={BarChart3}
          title="Reporting suite coming soon"
          body="Detailed cohort, retention and revenue reports will be available here in a production build."
        />
      </div>
    </div>
  );
}
