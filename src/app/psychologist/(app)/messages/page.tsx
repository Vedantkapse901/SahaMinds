import { MessageSquare } from "lucide-react";
import { EmptyPanel } from "@/components/dashboard/empty-panel";

export default function PsychologistMessagesPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-3xl tracking-tight text-charcoal">Messages</h1>
      <p className="mt-1 text-foreground-muted">Secure messaging with your clients.</p>
      <div className="mt-8">
        <EmptyPanel
          icon={MessageSquare}
          title="No conversations yet"
          body="Secure messaging threads with your clients will appear here."
        />
      </div>
    </div>
  );
}
