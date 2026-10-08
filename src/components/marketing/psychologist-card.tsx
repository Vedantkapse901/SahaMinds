import Link from "next/link";
import { Star, Video, Mic, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";
import { Psychologist } from "@/lib/types";

export function PsychologistCard({ p }: { p: Psychologist }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full font-display text-xl text-white"
          style={{ backgroundColor: p.avatarColor }}
        >
          {p.name.split(" ").slice(-1)[0][0]}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="truncate font-medium text-charcoal">{p.name}</p>
            {p.verified && <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-success" />}
          </div>
          <p className="text-sm text-foreground-muted">{p.designation}</p>
          <p className="mt-1 text-xs text-foreground-muted">{p.experienceYears}+ years experience</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-foreground-muted">{p.languages.join(" • ")}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {p.specialisations.slice(0, 3).map((s) => (
          <Badge key={s} variant="accent">
            {s}
          </Badge>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="font-display text-lg text-charcoal">{formatINR(p.fee)}<span className="text-xs text-foreground-muted"> / session</span></span>
        <span className="flex items-center gap-1 text-sm text-charcoal">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" /> {p.rating}
          <span className="text-foreground-muted">({p.reviewCount})</span>
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-foreground-muted">
        {p.consultationTypes.includes("video") && (
          <span className="inline-flex items-center gap-1"><Video className="h-3.5 w-3.5" /> Video</span>
        )}
        {p.consultationTypes.includes("audio") && (
          <span className="inline-flex items-center gap-1"><Mic className="h-3.5 w-3.5" /> Audio</span>
        )}
      </div>

      <div className="mt-auto pt-5">
        <p className="text-xs text-foreground-muted">
          Next available: <span className="font-medium text-charcoal">{p.nextAvailable}</span>
        </p>
        <Link href={`/psychologists/${p.id}`} className="mt-3 block">
          <Button variant="primary" className="w-full">
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}
