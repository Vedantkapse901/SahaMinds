import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  MapPin,
  SlidersHorizontal,
  LayoutDashboard,
  Search,
  CalendarCheck2,
  Video,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { PSYCHOLOGISTS } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal text-white">
        <div className="noise-overlay" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1fr_1.3fr] lg:items-stretch">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70">
              Private. Accessible. Professional.
            </span>
            <h1 className="font-display mt-6 text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Psychological support, without unnecessary barriers.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/65">
              Connect with verified psychologists through a private, accessible
              and professional digital experience.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/psychologists">
                <Button variant="accent" size="lg" className="w-full sm:w-auto">
                  Find a Psychologist
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/psychologist/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-white/20 text-white hover:bg-white/10 sm:w-auto"
                >
                  For Psychologists
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative min-w-0 w-full">
            <div className="absolute -inset-10 -z-10 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative aspect-[4/3] min-h-[320px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[480px]">
              <Image
                src="/images/hero.png"
                alt="A psychologist's view over her shoulder of a private video consultation with a client"
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/10 bg-charcoal/90 px-4 py-2 text-xs font-medium text-white/80 shadow-lg backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-success" />
              Private · Encrypted session
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            The problem
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl tracking-tight text-charcoal sm:text-4xl">
            Finding the right support shouldn&apos;t be this hard.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Cost", body: "Consultation fees and logistics add up quickly, often without transparency." },
            { title: "Privacy concerns", body: "Many people hesitate to seek support due to confidentiality worries." },
            { title: "Geographic limitations", body: "Access to qualified professionals is uneven across cities and towns." },
            { title: "Scheduling friction", body: "Coordinating a convenient time with the right professional is tedious." },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6">
                <p className="font-display text-lg text-charcoal">{item.title}</p>
                <p className="mt-2 text-sm text-foreground-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The SahaMinds Difference */}
      <section className="bg-surface-muted py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wider text-accent">
              The SahaMinds difference
            </p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl tracking-tight text-charcoal sm:text-4xl">
              Four pillars behind every consultation.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, title: "Privacy", body: "Privacy-first digital experience, designed around data minimisation." },
              { icon: MapPin, title: "Accessibility", body: "Professional support without unnecessary geographic friction." },
              { icon: SlidersHorizontal, title: "Choice", body: "Choose professionals by expertise, availability, language and preference." },
              { icon: LayoutDashboard, title: "Professional Infrastructure", body: "Digital tools that help psychologists manage their practice." },
            ].map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl bg-surface p-6 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <pillar.icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 font-display text-lg text-charcoal">{pillar.title}</p>
                  <p className="mt-2 text-sm text-foreground-muted">{pillar.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            How it works
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl tracking-tight text-charcoal sm:text-4xl">
            Discover, choose, book, consult.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-4">
          {[
            { num: "01", icon: Search, title: "Discover", body: "Find a psychologist based on your needs." },
            { num: "02", icon: SlidersHorizontal, title: "Choose", body: "Review profiles, expertise, language, availability and fees." },
            { num: "03", icon: CalendarCheck2, title: "Book", body: "Select a convenient time and complete payment." },
            { num: "04", icon: Video, title: "Consult", body: "Join the online consultation and manage follow-ups." },
          ].map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08}>
              <div className="relative">
                <span className="font-display text-5xl text-border-strong">{step.num}</span>
                <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-charcoal text-white">
                  <step.icon className="h-4 w-4" />
                </div>
                <p className="mt-4 font-display text-xl text-charcoal">{step.title}</p>
                <p className="mt-2 text-sm text-foreground-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured psychologists */}
      <section className="bg-surface-muted py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-accent">
                Meet the professionals
              </p>
              <h2 className="font-display mt-3 text-3xl tracking-tight text-charcoal sm:text-4xl">
                Verified psychologists, ready to help.
              </h2>
            </div>
            <Link href="/psychologists" className="text-sm font-medium text-accent hover:underline">
              View all psychologists →
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PSYCHOLOGISTS.slice(0, 3).map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <Link
                  href={`/psychologists/${p.id}`}
                  className="block rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-lg text-white"
                      style={{ backgroundColor: p.avatarColor }}
                    >
                      {p.name.split(" ").slice(-1)[0][0]}
                    </div>
                    <div>
                      <p className="font-medium text-charcoal">{p.name}</p>
                      <p className="text-sm text-foreground-muted">{p.designation}</p>
                      <p className="mt-1 text-xs text-foreground-muted">
                        {p.experienceYears}+ years · ★ {p.rating}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-foreground-muted">
                    Next available: <span className="text-charcoal">{p.nextAvailable}</span>
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Organisations CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal className="relative overflow-hidden rounded-3xl bg-charcoal px-8 py-14 text-white sm:px-14">
          <div className="noise-overlay" />
          <div className="relative max-w-xl">
            <p className="text-sm font-medium uppercase tracking-wider text-white/50">
              For organisations
            </p>
            <h2 className="font-display mt-3 text-3xl tracking-tight sm:text-4xl">
              Structured wellbeing access for your team.
            </h2>
            <p className="mt-4 text-white/65">
              Give employees confidential access to professional psychological
              support, resources and workshops.
            </p>
            <Link href="/for-organisations" className="mt-7 inline-block">
              <Button variant="accent" size="lg">
                Talk to SahaMinds
              </Button>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
