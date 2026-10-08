"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PSYCHOLOGISTS } from "@/lib/mock-data";
import { PsychologistCard } from "@/components/marketing/psychologist-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const SPECIALISATIONS = Array.from(
  new Set(PSYCHOLOGISTS.flatMap((p) => p.specialisations))
).sort();
const LANGUAGES = Array.from(new Set(PSYCHOLOGISTS.flatMap((p) => p.languages))).sort();

export default function PsychologistsPage() {
  const [query, setQuery] = useState("");
  const [specialisation, setSpecialisation] = useState("all");
  const [language, setLanguage] = useState("all");
  const [sessionType, setSessionType] = useState("all");
  const [sort, setSort] = useState("recommended");

  const results = useMemo(() => {
    let list = PSYCHOLOGISTS.filter((p) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.specialisations.some((s) => s.toLowerCase().includes(q)) ||
        p.designation.toLowerCase().includes(q);
      const matchesSpecialisation =
        specialisation === "all" || p.specialisations.includes(specialisation);
      const matchesLanguage = language === "all" || p.languages.includes(language);
      const matchesType =
        sessionType === "all" || p.consultationTypes.includes(sessionType as "video" | "audio");
      return matchesQuery && matchesSpecialisation && matchesLanguage && matchesType;
    });

    if (sort === "fee-low") list = [...list].sort((a, b) => a.fee - b.fee);
    if (sort === "fee-high") list = [...list].sort((a, b) => b.fee - a.fee);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "experience") list = [...list].sort((a, b) => b.experienceYears - a.experienceYears);

    return list;
  }, [query, specialisation, language, sessionType, sort]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wider text-accent">
          Find a psychologist
        </p>
        <h1 className="font-display mt-2 text-3xl tracking-tight text-charcoal sm:text-4xl">
          A professional marketplace, built on choice.
        </h1>
        <p className="mt-3 text-foreground-muted">
          Search by concern, filter by language and availability, and review
          professional profiles before you book.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-4 sm:p-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, expertise or concern…"
            className="pl-11"
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Select value={specialisation} onValueChange={setSpecialisation}>
            <SelectTrigger><SelectValue placeholder="Specialisation" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All specialisations</SelectItem>
              {SPECIALISATIONS.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger><SelectValue placeholder="Language" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All languages</SelectItem>
              {LANGUAGES.map((l) => (
                <SelectItem key={l} value={l}>{l}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sessionType} onValueChange={setSessionType}>
            <SelectTrigger><SelectValue placeholder="Session type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Video & Audio</SelectItem>
              <SelectItem value="video">Video only</SelectItem>
              <SelectItem value="audio">Audio only</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger><SelectValue placeholder="Sort" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="rating">Highest rated</SelectItem>
              <SelectItem value="fee-low">Fee: low to high</SelectItem>
              <SelectItem value="fee-high">Fee: high to low</SelectItem>
              <SelectItem value="experience">Most experienced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(specialisation !== "all" || language !== "all" || sessionType !== "all" || query) && (
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-foreground-muted">{results.length} psychologists found</p>
            <Button
              variant="link"
              onClick={() => {
                setQuery("");
                setSpecialisation("all");
                setLanguage("all");
                setSessionType("all");
                setSort("recommended");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((p) => (
          <PsychologistCard key={p.id} p={p} />
        ))}
      </div>

      {results.length === 0 && (
        <div className="mt-16 rounded-2xl border border-dashed border-border-strong py-16 text-center">
          <p className="font-display text-xl text-charcoal">No psychologists match your filters</p>
          <p className="mt-2 text-sm text-foreground-muted">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
