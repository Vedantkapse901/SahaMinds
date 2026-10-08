import { MessageSquare } from "lucide-react";
import { EmptyPanel } from "@/components/dashboard/empty-panel";

export default function ClientMessagesPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-3xl tracking-tight text-charcoal">Messages</h1>
      <p className="mt-1 text-foreground-muted">Secure messaging with your psychologist.</p>
      <div className="mt-8">
        <EmptyPanel
          icon={MessageSquare}
          title="No messages yet"
          body="Secure, encrypted messaging with your psychologist will appear here once your first consultation is scheduled."
        />
      </div>
    </div>
  );
}
