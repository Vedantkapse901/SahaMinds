import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <span className="font-display text-xl tracking-tight text-charcoal">
              SAHA<span className="text-accent">MINDS</span>
            </span>
            <p className="mt-3 max-w-xs text-sm text-foreground-muted">
              Private. Accessible. Professional. A digital platform connecting
              people with verified psychologists.
            </p>
          </div>

          <FooterColumn
            title="Platform"
            links={[
              { href: "/psychologists", label: "Find a Psychologist" },
              { href: "/#how-it-works", label: "How It Works" },
              { href: "/for-organisations", label: "For Organisations" },
            ]}
          />
          <FooterColumn
            title="Professionals"
            links={[
              { href: "/psychologist/login", label: "Psychologist Login" },
              { href: "/psychologist/dashboard", label: "Practice Dashboard" },
            ]}
          />
          <FooterColumn
            title="Company"
            links={[
              { href: "/privacy", label: "Privacy" },
              { href: "/admin", label: "Admin" },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-xs text-foreground-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SahaMinds. All demo data is fictional and for prototype purposes only.</p>
          <p>
            SahaMinds facilitates access to qualified psychological professionals.
            It is not a replacement for emergency medical care. In an emergency,
            please contact your local emergency services.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-sm text-foreground-muted hover:text-foreground"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
