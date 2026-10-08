"use client";

import {
  LayoutGrid,
  Stethoscope,
  Users,
  CalendarClock,
  CreditCard,
  ShieldCheck,
  BarChart3,
  Settings,
} from "lucide-react";
import { DashboardShell, SidebarNavItem } from "@/components/layout/dashboard-shell";

const NAV: SidebarNavItem[] = [
  { href: "/admin", label: "Overview", icon: LayoutGrid },
  { href: "/admin/psychologists", label: "Psychologists", icon: Stethoscope },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/appointments", label: "Appointments", icon: CalendarClock },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/verification", label: "Verification", icon: ShieldCheck },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell navItems={NAV} brandLabel="Admin Console" exitHref="/">
      {children}
    </DashboardShell>
  );
}
