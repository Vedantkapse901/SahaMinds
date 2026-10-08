import { Building2, HeartHandshake, Presentation, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export default function ForOrganisationsPage() {
  return (
    <div>
      <section className="bg-charcoal text-white">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70">
            For organisations
          </span>
          <h1 className="font-display mt-6 text-4xl tracking-tight sm:text-5xl">
            Employee mental wellbeing, structured and confidential.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-white/65">
            Give your team access to confidential consultations, mental-health
            resources and workshops through SahaMinds&apos; professional network.
          </p>
          <Button variant="accent" size="lg" className="mt-8">Talk to SahaMinds</Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: HeartHandshake, title: "Confidential consultations", body: "Employees can book private sessions with verified psychologists, independent of HR visibility." },
            { icon: Presentation, title: "Workshops", body: "Organise wellbeing workshops led by SahaMinds professionals, tailored to your team." },
            { icon: Building2, title: "Wellbeing programs", body: "Structured, ongoing programs designed around your organisation's needs." },
            { icon: ShieldCheck, title: "Privacy-conscious design", body: "Employee usage data is handled with privacy-first product architecture." },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="mt-4 font-display text-lg text-charcoal">{item.title}</p>
                <p className="mt-2 text-sm text-foreground-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 rounded-2xl border border-border bg-surface-muted p-8 text-center">
          <p className="text-sm text-foreground-muted">
            SahaMinds does not make claims about guaranteed outcomes from
            corporate wellbeing programs. Impact varies by organisation and
            engagement level.
          </p>
        </Reveal>
      </section>
    </div>
  );
}
