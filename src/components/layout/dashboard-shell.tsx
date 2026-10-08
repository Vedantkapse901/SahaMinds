"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface SidebarNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export function DashboardShell({
  navItems,
  brandLabel,
  exitHref,
  children,
}: {
  navItems: SidebarNavItem[];
  brandLabel: string;
  exitHref: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <>
      <div className="flex items-center gap-2 px-6 py-6">
        <span className="font-display text-lg tracking-tight text-white">
          SAHA<span className="text-accent">MINDS</span>
        </span>
      </div>
      <p className="px-6 pb-4 text-xs font-medium uppercase tracking-wider text-white/40">
        {brandLabel}
      </p>
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 pb-6 pt-4">
        <Link
          href={exitHref}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Exit
        </Link>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/5 bg-charcoal lg:flex">
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="flex w-64 flex-col bg-charcoal">{sidebarContent}</div>
          <button
            className="flex-1 bg-charcoal/60"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          />
        </div>
      )}

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border bg-surface px-5 py-4 lg:hidden">
          <span className="font-display text-lg text-charcoal">
            SAHA<span className="text-accent">MINDS</span>
          </span>
          <button onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>
        <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
