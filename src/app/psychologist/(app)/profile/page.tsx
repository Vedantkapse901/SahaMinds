"use client";

import { ShieldCheck } from "lucide-react";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPsychologist, CURRENT_PSYCHOLOGIST_ID } from "@/lib/mock-data";

export default function PsychologistProfilePage() {
  const psychologist = getPsychologist(CURRENT_PSYCHOLOGIST_ID)!;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl tracking-tight text-charcoal">Profile</h1>
        {psychologist.verified && (
          <Badge variant="success"><ShieldCheck className="h-3.5 w-3.5" /> Verified Professional</Badge>
        )}
      </div>
      <p className="mt-1 text-foreground-muted">This is what clients see on your public profile.</p>

      <div className="mt-8 flex items-center gap-4">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full font-display text-xl text-white"
          style={{ backgroundColor: psychologist.avatarColor }}
        >
          {psychologist.name.split(" ").slice(-1)[0][0]}
        </div>
        <Button variant="outline" size="sm">Change photo</Button>
      </div>

      <div className="mt-8 space-y-4">
        <div>
          <Label>Full name</Label>
          <Input defaultValue={psychologist.name} />
        </div>
        <div>
          <Label>Designation</Label>
          <Input defaultValue={psychologist.designation} />
        </div>
        <div>
          <Label>Bio</Label>
          <Textarea defaultValue={psychologist.about} className="min-h-32" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Years of experience</Label>
            <Input type="number" defaultValue={psychologist.experienceYears} />
          </div>
          <div>
            <Label>Session duration (min)</Label>
            <Input type="number" defaultValue={psychologist.sessionDuration} />
          </div>
        </div>
        <div>
          <Label>Consultation fee (₹)</Label>
          <Input type="number" defaultValue={psychologist.fee} />
        </div>
        <div>
          <Label>Specialisations</Label>
          <Input defaultValue={psychologist.specialisations.join(", ")} />
        </div>
        <div>
          <Label>Languages</Label>
          <Input defaultValue={psychologist.languages.join(", ")} />
        </div>
        <div>
          <Label>Qualifications</Label>
          <Textarea defaultValue={psychologist.qualifications.join("\n")} />
        </div>
        <Button variant="primary" className="mt-2">Save changes</Button>
      </div>
    </div>
  );
}
